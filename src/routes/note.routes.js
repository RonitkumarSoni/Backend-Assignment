const express = require("express");
const {
  createNote,
  createNotesBulk,
  getAllNotes,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAllNotes);
router.post("/bulk", createNotesBulk);
router.post("/", createNote);

module.exports = router;
