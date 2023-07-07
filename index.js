// server.js
const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/event');

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update the origin to match your React app's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect('//mongodb-url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/events/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const events = await Event.find({ date });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// server.js
// ...existing code...

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
