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

module.exports = {
  createNote,
};
