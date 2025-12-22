const express = require("express");
const router = express.Router();

// AI service import
const generateStudyPlanAI = require("../services/aiservices");

// MongoDB model
const StudyPlan = require("../models/StudyPlan");

// JWT middleware
const authMiddleware = require("../middleware/authMiddleware");

/**
 * POST /study-plan
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subject, examDate } = req.body;

    if (!subject || !examDate) {
      return res.status(400).json({
        success: false,
        message: "subject and examDate are required",
      });
    }

    // AI call
    const aiResult = await generateStudyPlanAI(subject, examDate);

    // Save in DB
    const savedPlan = await StudyPlan.create({
      user: req.userId,
      subject,
      examDate,
      plan: aiResult.plan,
    });

    res.status(201).json({
      success: true,
      message: "AI study plan generated",
      data: savedPlan,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
});

module.exports = router;
