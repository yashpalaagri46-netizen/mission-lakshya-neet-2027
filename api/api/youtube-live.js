// ============================================================
// MISSION LAKSHYA – YouTube LIVE API
// NEET + JEE Live Classes
// API key is read ONLY from Vercel Environment Variables.
// ============================================================

export default async function handler(req, res) {
  // ---------------- CORS ----------------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ---------------- METHOD ----------------
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Only GET requests are allowed."
    });
  }

  // ---------------- API KEY ----------------
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return res.status(200).json({
      success: true,
      demo: true,
      liveClasses: [],
      upcomingClasses: [],
      recentClasses: [],
      message:
        "YouTube API अभी setup नहीं है। Vercel Environment Variables में YOUTUBE_API_KEY जोड़ें।"
    });
  }

  try {
    // ========================================================
    // SEARCH SETTINGS
    // ========================================================

    const subject =
      typeof req.query?.subject === "string"
        ? req.query.subject.toLowerCase()
        : "all";

    const exam =
      typeof req.query?.exam === "string"
        ? req.query.exam.toLowerCase()
        : "all";

    const type =
      typeof req.query?.type === "string"
        ? req.query.type.toLowerCase()
        : "all";

    // ========================================================
    // SEARCH QUERIES
    // ========================================================

    const queries = [];

    if (exam === "neet") {
      queries.push("NEET live class");
    } else if (exam === "jee") {
      queries.push("JEE live class");
    } else {
      queries.push("NEET JEE live class");
    }

    if (subject !== "all") {
      queries.push(subject);
    }

    const searchQuery = queries.join(" ");

    // ========================================================
    // GET CURRENT DATE
    // ========================================================

    const now = new Date();

    // ========================================================
    // YOUTUBE SEARCH FUNCTION
    // ========================================================

    async function youtubeSearch(eventType) {
      const params = new URLSearchParams({
        part: "snippet",
        q: searchQuery,
        type: "video",
        eventType,
        maxResults: "25",
        order: "date",
        relevanceLanguage: "en",
        key: API_KEY
      });

      const url =
        "https://www.googleapis.com/youtube/v3/search?" +
        params.toString();

      const response = await fetch(url);

      if (!response.ok) {
        let errorMessage = "YouTube API request failed.";

        try {
          const errorData = await response.json();

          errorMessage =
            errorData?.error?.message ||
            errorMessage;
        } catch {
          // Ignore JSON parsing errors
        }

        throw new Error(errorMessage);
      }

      return response.json();
    }

    // ========================================================
    // GET VIDEO DETAILS
    // ========================================================

    async function getVideoDetails(videoIds) {
      if (!videoIds.length) {
        return [];
      }

      const params = new URLSearchParams({
        part: "snippet,liveStreamingDetails,contentDetails",
        id: videoIds.join(","),
        key: API_KEY
      });

      const url =
        "https://www.googleapis.com/youtube/v3/videos?" +
        params.toString();

      const response = await fetch(url);

      if (!response.ok) {
        return [];
      }

      const data = await response.json();

      return Array.isArray(data.items)
        ? data.items
        : [];
    }

    // ========================================================
    // NORMALIZE VIDEO
    // ========================================================

    function normalizeVideo(video) {
      const snippet = video.snippet || {};
      const live = video.liveStreamingDetails || {};

      const title = snippet.title || "YouTube Class";

      const lowerTitle = title.toLowerCase();

      let detectedExam = "General";

      if (
        lowerTitle.includes("neet") ||
        lowerTitle.includes("biology")
      ) {
        detectedExam = "NEET";
      }

      if (
        lowerTitle.includes("jee") ||
        lowerTitle.includes("maths") ||
        lowerTitle.includes("mathematics")
      ) {
        detectedExam = "JEE";
      }

      let detectedSubject = "General";

      if (
        lowerTitle.includes("physics")
      ) {
        detectedSubject = "Physics";
      } else if (
        lowerTitle.includes("chemistry")
      ) {
        detectedSubject = "Chemistry";
      } else if (
        lowerTitle.includes("biology")
      ) {
        detectedSubject = "Biology";
      } else if (
        lowerTitle.includes("math") ||
        lowerTitle.includes("mathematics")
      ) {
        detectedSubject = "Mathematics";
      }

      const actualStart =
        live.actualStartTime || null;

      const scheduledStart =
        live.scheduledStartTime || null;

      const scheduledEnd =
        live.scheduledEndTime || null;

      const isLive =
        !!live.actualStartTime &&
        !live.actualEndTime;

      const isUpcoming =
        !live.actualStartTime &&
        !!live.scheduledStartTime;

      return {
        id:
          video.id?.videoId ||
          video.id ||
          "",

        videoId:
          video.id?.videoId ||
          video.id ||
          "",

        title,

        channelTitle:
          snippet.channelTitle ||
          "YouTube",

        channelId:
          snippet.channelId ||
          "",

        description:
          snippet.description ||
          "",

        thumbnail:
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          "",

        publishedAt:
          snippet.publishedAt ||
          null,

        scheduledStartTime:
          scheduledStart,

        scheduledEndTime:
          scheduledEnd,

        actualStartTime:
          actualStart,

        actualEndTime:
          live.actualEndTime ||
          null,

        concurrentViewers:
          live.concurrentViewers ||
          null,

        exam: detectedExam,

        subject: detectedSubject,

        isLive,

        isUpcoming,

        watchUrl:
          `https://www.youtube.com/watch?v=${
            video.id?.videoId || video.id || ""
          }`,

        embedUrl:
          `https://www.youtube.com/embed/${
            video.id?.videoId || video.id || ""
          }?autoplay=1&mute=1`
      };
    }

    // ========================================================
    // CURRENT LIVE
    // ========================================================

    let liveSearch = {
      items: []
    };

    // Search active live classes
    if (type === "all" || type === "live") {
      liveSearch = await youtubeSearch("live");
    }

    const liveIds = Array.isArray(liveSearch.items)
      ? liveSearch.items
          .map(item => item.id?.videoId)
          .filter(Boolean)
      : [];

    const liveDetails =
      await getVideoDetails(liveIds);

    let liveClasses =
      liveDetails.map(normalizeVideo);

    // ========================================================
    // UPCOMING
    // ========================================================

    let upcomingSearch = {
      items: []
    };

    if (
      type === "all" ||
      type === "upcoming"
    ) {
      upcomingSearch =
        await youtubeSearch("upcoming");
    }

    const upcomingIds =
      Array.isArray(upcomingSearch.items)
        ? upcomingSearch.items
            .map(item => item.id?.videoId)
            .filter(Boolean)
        : [];

    const upcomingDetails =
      await getVideoDetails(upcomingIds);

    let upcomingClasses =
      upcomingDetails.map(normalizeVideo);

    // ========================================================
    // FILTER FUNCTION
    // ========================================================

    function applyFilters(list) {
      return list.filter(item => {
        const examMatch =
          exam === "all" ||
          item.exam.toLowerCase() === exam;

        const subjectMatch =
          subject === "all" ||
          item.subject.toLowerCase() === subject;

        return examMatch && subjectMatch;
      });
    }

    liveClasses =
      applyFilters(liveClasses);

    upcomingClasses =
      applyFilters(upcomingClasses);

    // ========================================================
    // REMOVE ENDED LIVE STREAMS
    // ========================================================

    liveClasses =
      liveClasses.filter(item => {
        if (item.actualEndTime) {
          return false;
        }

        return item.isLive;
      });

    // ========================================================
    // SORT
    // ========================================================

    liveClasses.sort((a, b) => {
      const aTime =
        new Date(
          a.actualStartTime ||
          a.publishedAt ||
          now
        ).getTime();

      const bTime =
        new Date(
          b.actualStartTime ||
          b.publishedAt ||
          now
        ).getTime();

      return bTime - aTime;
    });

    upcomingClasses.sort((a, b) => {
      const aTime =
        new Date(
          a.scheduledStartTime ||
          now
        ).getTime();

      const bTime =
        new Date(
          b.scheduledStartTime ||
          now
        ).getTime();

      return aTime - bTime;
    });

    // ========================================================
    // RECENT LECTURES
    // ========================================================

    // Recent lectures are returned from live/upcoming
    // results when available. This keeps the endpoint
    // lightweight and avoids unnecessary API quota usage.

    const recentMap = new Map();

    [...liveClasses, ...upcomingClasses].forEach(item => {
      if (item.videoId) {
        recentMap.set(item.videoId, item);
      }
    });

    const recentClasses =
      Array.from(recentMap.values())
        .sort((a, b) => {
          const aTime =
            new Date(
              a.publishedAt ||
              a.scheduledStartTime ||
              now
            ).getTime();

          const bTime =
            new Date(
              b.publishedAt ||
              b.scheduledStartTime ||
              now
            ).getTime();

          return bTime - aTime;
        })
        .slice(0, 20);

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      demo: false,

      updatedAt:
        new Date().toISOString(),

      filters: {
        exam,
        subject,
        type
      },

      liveClasses,
      upcomingClasses,
      recentClasses,

      counts: {
        live: liveClasses.length,
        upcoming: upcomingClasses.length,
        recent: recentClasses.length
      }
    });

  } catch (error) {
    console.error(
      "YouTube Live API Error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "YouTube LIVE data load नहीं हो पाया। कृपया बाद में फिर कोशिश करें।"
    });
  }
                                         }
