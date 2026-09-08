const STRIPE_API = "https://api.stripe.com/v1";

export async function stripeRequest(
    path: string,
    params: Record<string, string> = {},
    method: "GET" | "POST" | "DELETE" = "POST"
) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
        throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }

    const isGet = method === "GET";
    const query = isGet && Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : "";

    const res = await fetch(`${STRIPE_API}${path}${query}`, {
        method,
        headers: {
            Authorization: `Bearer ${apiKey}`,
            ...(isGet ? {} : { "Content-Type": "application/x-www-form-urlencoded" }),
        },
        body: isGet ? undefined : new URLSearchParams(params).toString(),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Stripe API error (${res.status}): ${text}`);
    }
    return res.json();
}
