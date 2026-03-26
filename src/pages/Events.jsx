import { getEvents, createEvent, deleteEvent, updateEvent } from "../services/eventService";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // DARK MODE FIX (WORKING)
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // LOAD EVENTS
  useEffect(() => {
    getEvents().then((data) => setEvents(Array.isArray(data) ? data : []));
  }, []);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    if (editingId) {
      updateEvent(editingId, { title, date }).then((updated) => {
        setEvents((prev) =>
          prev.map((e) => (e.id === editingId ? updated : e))
        );
        toast.success("Updated ✏️");
        resetForm();
      });
    } else {
      createEvent({ title, date }).then((newEvent) => {
        setEvents((prev) => [...prev, newEvent]);
        toast.success("Added 🎉");
        resetForm();
      });
    }
  };

  const handleDelete = (id) => {
    deleteEvent(id).then(() => {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success("Deleted 🗑️");
    });
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDate(event.date);
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setEditingId(null);
  };

  // SEARCH FILTER
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Toaster />

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>🎉 Events</h1>

        <button
          className="btn btn-primary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="input"
        placeholder="🔍 Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="btn btn-primary" style={{ width: "100%" }}>
            {editingId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>

      {/* EVENTS */}
      {filteredEvents.length === 0 ? (
        <p style={{ textAlign: "center" }}>No events found</p>
      ) : (
        filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>{event.title}</h3>
            <p>📅 {event.date}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn btn-warning"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}