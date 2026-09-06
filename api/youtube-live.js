// Mission Lakshya NEET 2027
// YouTube Live Classes API

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Only GET requests are allowed."
    });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "YouTube API key is not configured."
      });
    }

    const channelId = process.env.YOUTUBE_CHANNEL_ID || "";

    const params = new URLSearchParams({
      part: "snippet",
      type: "video",
      eventType: "live",
      maxResults: "10",
      order: "date",
      key: apiKey
    });

    // अगर channel ID Vercel में दी गई है तो उसी channel की live classes खोजें
    if (channelId) {
      params.set("channelId", channelId);
    } else {
      // Channel ID नहीं है तो NEET related live classes खोजें
      params.set(
        "q",
        "NEET Physics Chemistry Biology live class"
      );
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("YouTube API error:", data);

      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          "YouTube से live videos नहीं मिल पाए।"
      });
    }

    const videos = (data.items || []).map((item) => ({
      videoId: item.id?.videoId || "",
      title: item.snippet?.title || "Untitled Live Class",
      channelTitle: item.snippet?.channelTitle || "",
      description: item.snippet?.description || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        ""
    }));

    return res.status(200).json({
      success: true,
      count: videos.length,
      videos
    });

  } catch (error) {
    console.error("YouTube server error:", error);

    return res.status(500).json({
      success: false,
      error:
        "YouTube Live service में समस्या आ गई।"
    });
  }
}
