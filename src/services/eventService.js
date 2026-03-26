export const getEvents = () =>
  fetch("http://localhost:5000/events")
    .then((res) => res.json());

export const createEvent = (event) =>
  fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((res) => res.json());

export const deleteEvent = (id) =>
  fetch(`http://localhost:5000/events/${id}`, {
    method: "DELETE",
  });

export const updateEvent = (id, data) => {
  return fetch(`http://localhost:5000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

