const express = require("express");
const {
  createNote,
  createNotesBulk,
} = require("../controllers/note.controller");

const router = express.Router();

router.post("/bulk", createNotesBulk);
router.post("/", createNote);

module.exports = router;
