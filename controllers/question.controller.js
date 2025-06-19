import Question from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      subject,
      options,
      correctAnswer,
      explanation,
      difficultyLevel,
      accessibilityOptions,
    } = req.body;

    if (
      !questionText ||
      !subject ||
      !options ||
      options.length !== 4 ||
      !correctAnswer
    ) {
      return res
        .status(400)
        .json({
          error: "Missing required fields or options must be exactly 4",
        });
    }

    const question = await Question.create({
      questionText,
      subject,
      options,
      correctAnswer,
      explanation,
      difficultyLevel,
      accessibilityOptions,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getQuestionsBySubject = async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
