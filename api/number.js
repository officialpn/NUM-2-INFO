export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { number, key } = req.query;

  if (!number) {
    return res.status(400).json({
      status: "error",
      MESSAGE: "number parameter required",
      DEVELOPER: "OFFICIAL PN",
      TELEGRAM: "https://t.me/ONLY1_PN"
    });
  }

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
      developer: "PN",
      telegram: "https://t.me/ONLY1_PN"
    });
  }

  try {
    const upstream = await fetch(
      `https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)}`
    );

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        status: "error",
        message: `upstream returned ${upstream.status}`,
        developer: "PN",
        tg: "t.me/ONLY1_PN"
      });
    }

    const data = await upstream.json();

    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || null,
      developer: "PN",
      youtube: "https://t.me/ONLY1_PN"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      error: err.message,
      developer: "PN",
      tg: "t.me/ONLY1_PN"
    });
  }
}
