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

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
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

async function getNoteById(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to fetch note", error);
  }
}

async function replaceNote(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const replacement = {
      title,
      content,
      category: hasOwnProperty(req.body, "category") ? category : "personal",
      isPinned: hasOwnProperty(req.body, "isPinned") ? isPinned : false,
    };

    const note = await Note.findByIdAndUpdate(id, replacement, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to replace note", error);
  }
}

async function updateNote(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to update note", error);
  }
}

async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to delete note", error);
  }
}

async function deleteNotesBulk(req, res) {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "IDs array is required and cannot be empty",
        data: null,
      });
    }

    const hasInvalidId = ids.some((id) => !isValidObjectId(id));

    if (hasInvalidId) {
      return res.status(400).json({
        success: false,
        message: "One or more note IDs are invalid",
        data: null,
      });
    }

    const result = await Note.deleteMany({
      _id: { $in: ids },
    });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to delete notes", error);
  }
}

module.exports = {
  createNote,
  createNotesBulk,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteNotesBulk,
};
