const mongoose = require("mongoose");
const Note = require("../models/note.model");

function sendErrorResponse(res, statusCode, message, error) {
  if (error instanceof mongoose.Error.ValidationError) {
    const firstErrorMessage = Object.values(error.errors)[0]?.message || message;

    return res.status(400).json({
      success: false,
      message: firstErrorMessage,
      data: null,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
}

async function createNote(req, res) {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      isPinned,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to create note", error);
  }
}

async function createNotesBulk(req, res) {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required and cannot be empty",
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to create notes", error);
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to fetch notes", error);
  }
}

module.exports = {
  createNote,
  createNotesBulk,
  getAllNotes,
};
