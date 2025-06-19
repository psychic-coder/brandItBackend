import Quiz from "../models/quiz.model.js";

import Progress from "../models/progress.model.js";
import Student from "../models/student.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, subject, questions, duration, difficultyLevel } = req.body;

    if (!title || !subject || !questions || questions.length === 0) {
      return res
        .status(400)
        .json({ error: "Missing quiz title, subject, or questions" });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      duration,
      difficultyLevel,
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { studentId, quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    let correct = 0;
    let total = quiz.questions.length;
    const answerRecords = [];

    for (let q of quiz.questions) {
      const submitted = answers.find((a) => a.questionId === q._id.toString());
      const isCorrect =
        submitted && submitted.selectedOption === q.correctAnswer;
      if (isCorrect) correct++;

      answerRecords.push({
        questionId: q._id,
        questionText: q.questionText,
        selectedOption: submitted ? submitted.selectedOption : null,
        correctOption: q.correctAnswer,
        options: q.options,
        isCorrect,
        explanation: q.explanation,
      });
    }

    const progress = await Progress.create({
      studentId,
      quizId,
      score: Math.round((correct / total) * 100),
      totalQuestions: total,
      correctAnswers: correct,
      incorrectAnswers: total - correct,
      answers: answerRecords,
    });

    await Student.findByIdAndUpdate(studentId, {
      $push: { progress: progress._id },
    });

    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
