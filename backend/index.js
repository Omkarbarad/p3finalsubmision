const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const app = express();
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/url', express.static(path.join(__dirname, 'upload/song')));
app.use('/image', express.static(path.join(__dirname, 'upload/songaudio')));



mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use('/', authRoutes);
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

