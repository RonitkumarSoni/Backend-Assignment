const express = require("express");
const {
  createNote,
  createNotesBulk,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", replaceNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/bulk", createNotesBulk);
router.post("/", createNote);

module.exports = router;
