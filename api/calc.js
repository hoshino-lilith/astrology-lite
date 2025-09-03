export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  // 認証
  const auth = req.headers.authorization || "";
  if (process.env.API_KEY && auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const { date, time = "", timezone = "Asia/Tokyo", place } = req.body || {};
    if (!date || !place) return res.status(400).json({ error: "date and place required" });

    // ダミーデータ（後で計算ロジックに差し替え予定）
    const positions = {
      SunSign: "みずがめ座",
      MoonSign: "おうし座",
      MarsSign: "おうし座",
      VenusSign: "うお座",
      LilithMeanSign: "てんびん座",
      MoonCandidates: []
    };

    const uncertainty = [];
    if (!time || /頃|ごろ|前後|約|±/.test(time)) uncertainty.push("time_approx");

    return res.status(200).json({
      engine: "custom-lite",
      timezone_used: timezone,
      positions,
      assumed_time: time || null,
      assumed_time_range: null,
      uncertainty
    });
  } catch (e) {
    return res.status(500).json({ error: "internal_error" });
  }
}
