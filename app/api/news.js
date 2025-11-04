export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const r = await fetch(
      "http://news.pacesetterfrontier.com/wp-json/wp/v2/posts",
    );
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    console.error("Proxy fetch failed:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
