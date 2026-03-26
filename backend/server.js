const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MUST be let (NOT const)
let events = [
  { id: 1, title: "Volunteer Day", date: "2026-04-01" },
  { id: 2, title: "Green Campaign", date: "2026-04-10" },
];

// GET
app.get("/events", (req, res) => {
  res.json(events);
});

// POST
app.post("/events", (req, res) => {
  const newEvent = req.body;
  newEvent.id = events.length + 1;
  events.push(newEvent);
  res.json(newEvent);
});

// ✅ DELETE (MUST be before listen)
app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);

  events = events.filter((event) => event.id !== id);

  res.json({ message: "Deleted successfully" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.put("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  events = events.map((event) =>
    event.id === id ? { ...event, ...updatedData } : event
  );

  res.json({ id, ...updatedData });
});