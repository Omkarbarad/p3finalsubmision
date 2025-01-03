const mongoose = require("mongoose");

// Define Song Schema separately for better readability
const SongSchema = new mongoose.Schema({
  songname: { type: String, required: true },
  singer: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  albumname: { type: String, required: true },
  releaseyear: { type: Number, required: true }, // Ensure releaseyear is required
});

// Model for Song
const Song = mongoose.model("Song", SongSchema);

// Endpoint for Adding Songs
const song = async (req, res) => {
  try {
    // Extract data from request body
    const { songname, singer, image, url, albumname, releaseyear } = req.body;

    // Validate fields
    if (!songname || !singer || !image || !url || !albumname || !releaseyear) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the new song
    const newSong = new Song({
      songname,
      singer,
      image,
      url,
      albumname,
      releaseyear,
    });

    await newSong.save();
    console.log("Song saved successfully");

    res.json({ success: true, message: "Song added successfully", song: newSong });
  } catch (error) {
    console.error("Error saving song:", error);
    res.status(500).json({ error: "Error saving song to database." });
  }
};

module.exports = { song };
