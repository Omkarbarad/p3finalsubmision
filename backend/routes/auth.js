const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { song } = require('../controllers/songcontroller');
const Song = require('../models/Songs');


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;





// Storage Engine for Image and Audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'songImage') {
      cb(null, path.join(__dirname, '../upload/song'));
    } else if (file.fieldname === 'songaudio') {
      cb(null, path.join(__dirname, '../upload/songaudio'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Serve Static Files
router.use('/images', express.static(path.join(__dirname, '../upload/song')));
router.use('/url', express.static(path.join(__dirname, '../upload/songaudio')));

// Upload Song (audio + image)
router.post('/upload', upload.fields([
  { name: 'songImage', maxCount: 1 },
  { name: 'songaudio', maxCount: 1 },
]), async (req, res) => {
  const { name, singer, albumname, releaseyear } = req.body;

  if (!req.files || !req.body) {
    return res.status(400).json({ error: 'Missing file or form data.' });
  }

  try {
    const newSong = new Song({
      songname: name,
      singer,
      albumname,
      releaseyear,
      image: req.files.songImage ? req.files.songImage[0].filename : null,
      url: req.files.songaudio ? req.files.songaudio[0].filename : null,
    });

    await newSong.save();
    res.json({ success: 1, message: 'Song uploaded successfully', song: newSong });
  } catch (error) {
    res.status(500).json({ error: 'Error saving song to database' });
  }
});
// Fetch Songs
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find({});
    const formattedSongs = songs.map(song => ({
      _id: song._id,
      songname: song.songname,
      singer: song.singer,
      albumname: song.albumname,
      releaseyear: song.releaseyear,
      image: `/images/${song.image.replace('/images/', '')}`,
      url: `/url/${song.url.replace('/url/', '')}`,
    }));
    res.json(formattedSongs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching songs' });
  }
});

// Routes for Authenticatio
router.post('/addsong', song);


// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token , email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Error signing in' });
  }
});

module.exports = router;
