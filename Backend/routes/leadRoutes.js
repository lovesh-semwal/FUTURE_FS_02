const express = require("express");

const {
  createLead,
  getLeads,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public route — website visitors can submit a lead
router.post("/", createLead);

// Protected routes — admin only
router.get("/", protect, getLeads);
router.put("/:id/status", protect, updateLeadStatus);
router.post("/:id/notes", protect, addLeadNote);
router.delete("/:id", protect, deleteLead);

module.exports = router;