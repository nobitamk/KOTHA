// const contacts = []; // In-memory array for contact messages

// // Add a new contact message
// app.post("/api/contact", (req, res) => {
//   const { name, email, message } = req.body;
//   const newContact = {
//     id: Date.now(),
//     name,
//     email,
//     message,
//     date: new Date()
//   };
//   contacts.push(newContact);
//   res.json({ message: "Contact message added", contact: newContact });
// });

// // Get all contact messages
// app.get("/api/contact", (req, res) => {
//   res.json(contacts);
// });