const express = require("express");
const cors = require("cors");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();
app.use(cors());

app.get("/transcript", async (req, res) => {
  try {
    const videoId = req.query.videoId;

    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    res.json(transcript);

  } catch (err) {
    res.status(200).json({ error: "Transcript not available" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
