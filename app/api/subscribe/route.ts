import { NextResponse } from "next/server";

// Klaviyo API revision this payload targets.
const KLAVIYO_REVISION = "2024-10-15";
const SUBSCRIBE_URL =
  "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  // Not configured yet → behave like the rest of the site's demo fallback so
  // the popup keeps working locally without credentials.
  if (!apiKey || !listId) {
    console.warn(
      "[subscribe] KLAVIYO_PRIVATE_API_KEY / KLAVIYO_LIST_ID not set — running in demo mode.",
    );
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const res = await fetch(SUBSCRIBE_URL, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        revision: KLAVIYO_REVISION,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: { data: { type: "list", id: listId } },
          },
        },
      }),
    });

    // Klaviyo returns 202 Accepted with an empty body on success.
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    const detail = await res.text();
    console.error("[subscribe] Klaviyo error", res.status, detail);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  } catch (err) {
    console.error("[subscribe] request failed", err);
    return NextResponse.json(
      { error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
