export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Only GET requests are allowed"
    });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "YOUTUBE_API_KEY अभी Vercel में सेट नहीं है।"
      });
    }

    const channels = [
      "PW",
      "PW Hindi",
      "PW JEE",
      "PW NEET",
      "Physics Wallah",
      "Vijay Education",
      "Ashish Singh Lectures",
      "Unacademy"
    ];

    const results = [];

    for (const channel of channels) {
      const url =
        "https://www.googleapis.com/youtube/v3/search" +
        "?part=snippet" +
        "&q=" +
        encodeURIComponent(channel) +
        "&type=video" +
        "&eventType=live" +
        "&maxResults=5" +
        "&key=" +
        encodeURIComponent(apiKey);

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error("YouTube API error:", data);
        continue;
      }

      if (data.items) {
        for (const item of data.items) {
          results.push({
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            videoId: item.id.videoId,
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url ||
              item.snippet.thumbnails?.default?.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      liveClasses: results
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "YouTube Live classes लाने में समस्या हुई।"
    });
  }
}
