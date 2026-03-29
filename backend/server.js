const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Use Render port or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data (temporary DB)
let events = [
  { id: 1, title: "Volunteer Day", date: "2026-04-01" },
  { id: 2, title: "Green Campaign", date: "2026-04-10" },
];

// ROOT (for testing server)
app.get("/", (req, res) => {
  res.send("🚀 Youth Union Backend is running!");
});

// =======================
// GET ALL EVENTS
// =======================
app.get("/events", (req, res) => {
  res.json(events);
});

// =======================
// CREATE EVENT
// =======================
app.post("/events", (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Missing title or date" });
  }

  const newEvent = {
    id: events.length ? events[events.length - 1].id + 1 : 1, // ✅ better ID
    title,
    date,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// =======================
// UPDATE EVENT
// =======================
app.put("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, date } = req.body;

  let found = false;

  events = events.map((event) => {
    if (event.id === id) {
      found = true;
      return { ...event, title, date };
    }
    return event;
  });

  if (!found) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json({ id, title, date });
});

// =======================
// DELETE EVENT
// =======================
app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const exists = events.some((event) => event.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Event not found" });
  }

  events = events.filter((event) => event.id !== id);

  res.json({ message: "Deleted successfully" });
});

// =======================
// START SERVER (LAST)
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
