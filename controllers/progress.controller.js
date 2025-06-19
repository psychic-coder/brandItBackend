import Progress from "../models/progress.model.js";

export const recordProgress = async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProgressByStudent = async (req, res) => {
  try {
    const data = await Progress.find({ studentId: req.params.studentId })
      .populate("quizId")
      .populate("answers.questionId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
