const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend running with MySQL");
});

// GET events
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD event
app.post("/events", (req, res) => {
  const { title, date } = req.body;

  db.query(
    "INSERT INTO events (title, date) VALUES (?, ?)",
    [title, date],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, date });
    }
  );
});

// DELETE event
app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM events WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

// UPDATE event
app.put("/events/:id", (req, res) => {
  const id = req.params.id;
  const { title, date } = req.body;

  db.query(
    "UPDATE events SET title = ?, date = ? WHERE id = ?",
    [title, date, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, title, date });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
