const express = require("express");
const {
  createNote,
  createNotesBulk,
  getAllNotes,
  getNoteById,
  replaceNote,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", replaceNote);
router.post("/bulk", createNotesBulk);
router.post("/", createNote);

module.exports = router;
