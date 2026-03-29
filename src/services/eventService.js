const API_URL = "https://youth-union-backend.onrender.com/events";

// GET
export const getEvents = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// CREATE
export const createEvent = async (event) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return await res.json();
};

// DELETE
export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

// UPDATE
export const updateEvent = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};
