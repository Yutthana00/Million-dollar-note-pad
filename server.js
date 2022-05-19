const fs = require("fs");
const path = require("path");
const express = require("express");
const noteDatabase = require("./db/db.json");
const uuid = require("uuid");

const app = express();

var PORT = process.env.PORT || 3001;

// Middleware for data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC MIDDLEWARE
app.use(express.static("public"));

// Load index html landing page:
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

// Get notes page:
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET /api/notes read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  res.json(noteDatabase);
});

// POST /api/notes receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  // push the note to db.json
  noteDatabase.push(newNote);

  // write to the db.json file to update the database
  fs.writeFile("./db/db.json", JSON.stringify(noteDatabase), (err) => (err ? console.log(err) : console.log('success')));

  // returns the note to the client
  res.json(noteDatabase);
});

// DELETE /api/notes/:id receives a query parameter that contains the id of a note to delete
app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;
  let index = noteDatabase.findIndex((note) => note.id === noteId);
  let deletedNote = noteDatabase.splice(index, 1);
  res.send(deletedNote);

  // re-writes the file with updated database
  fs.writeFile("./db/db.json", JSON.stringify(noteDatabase), (err) => (err ? console.log(err) : console.log('success')));
});

app.listen(PORT, () => console.log(`App listening to ${PORT}`));