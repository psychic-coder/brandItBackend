import Course from "../models/course.schema.js";
import Question from "../models/question.schema.js";
import Quiz from "../models/quiz.schema.js";

// 1. Get quizzes by subject
export const getQuizzesBySubject = async (req, res) => {
  try {
    const { subject } = req.params;

    // Use case-insensitive regex to match subject
    const quizzes = await Quiz.find({
      subject: { $regex: new RegExp(`^${subject}$`, "i") },
    });

    return res.json(quizzes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 2. Get quiz metadata by ID
export const getQuizMetadata = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).select("-questions");
  res.json(quiz);
};

// 3. Get all questions for a quiz
export const getAllQuizQuestions = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).populate("questions");
  res.json(quiz.questions);
};

// 4. Get specific question by index
export const getQuestionByIndex = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).populate("questions");
  const index = parseInt(req.params.index);
  if (index < 0 || index >= quiz.questions.length) {
    return res.status(400).json({ error: "Invalid question index" });
  }
  res.json(quiz.questions[index]);
};

// 5. Submit answer to a specific question (placeholder logic)
export const submitAnswer = async (req, res) => {
  const { selectedOptionIndex } = req.body;
  const { quizId, index } = req.params;
  const quiz = await Quiz.findById(quizId).populate("questions");
  const question = quiz.questions[parseInt(index)];

  const correct = question.correctAnswerIndex === selectedOptionIndex;
  res.json({ correct });
};

// 6. Submit all answers and evaluate
export const submitQuiz = async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.quizId).populate("questions");

  let correctCount = 0;
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswerIndex) correctCount++;
  });

  res.json({
    total: quiz.questions.length,
    correct: correctCount,
    scorePercent: (correctCount / quiz.questions.length) * 100,
  });
};

// 7. Get result for a user (dummy placeholder)
export const getUserResult = async (req, res) => {
  const { quizId, userId } = req.params;
  // Normally you'd fetch this from a Results collection
  res.json({ message: `Results for user ${userId} in quiz ${quizId}` });
};

// Create a new quiz along with its questions
export const createQuizWithQuestions = async (req, res) => {
  try {
    const { name, description, subject, totalDuration, questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Questions are required" });
    }

    // Create Question documents
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const newQuestion = await Question.create({
          questionText: q.questionText,
          difficulty: q.difficulty,
          options: q.options.map((text) => ({ text })),
          correctAnswerIndex: q.correctAnswerIndex,
          subject,
        });
        return newQuestion._id;
      })
    );

    // Create the Quiz with reference to question IDs
    const quiz = await Quiz.create({
      name,
      description,
      subject,
      totalDuration,
      numberOfQuestions: questionDocs.length,
      questions: questionDocs,
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCoursesByUniqueSubject = async (req, res) => {
  try {
    const courses = await Course.find()
      .select("subject name description duration numberOfLessons")
      .lean();

    const uniqueSubjectsMap = new Map();

    for (const course of courses) {
      const subjectKey = course.subject.toLowerCase();
      if (!uniqueSubjectsMap.has(subjectKey)) {
        uniqueSubjectsMap.set(subjectKey, course);
      }
    }

    const uniqueCourses = Array.from(uniqueSubjectsMap.values());

    res.status(200).json({
      success: true,
      data: uniqueCourses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve unique subjects from courses",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};




// 2. Get all lessons (titles) for a specific course by course name (case-insensitive)
export const getCoursesSubject = async (req, res) => {
  try {
    const { subject } = req.params;

    // Case-insensitive search for courses by subject
    const filteredCourses = await Course.find({
      subject: { $regex: new RegExp(`^${subject}$`, "i") }, // Exact match (case-insensitive)
    }).select("name description duration numberOfLessons titles"); // Only fetch required fields

    if (filteredCourses.length === 0) {
      return res
        .status(404)
        .json({ error: `No courses found for subject: ${subject}` });
    }

    // Format the response
    const result = filteredCourses.map((course) => ({
      courseName: course.name,
      description: course.description,
      duration: course.duration,
      numberOfLessons: course.numberOfLessons,
      lessons: course.titles, // Already structured as per titleSchema
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Create sample data
// export const seedCourses = async (req, res) => {
//   try {
//     await Course.deleteMany(); // optional: clears old data
//     const created = await Course.insertMany(sampleCourses);
//     console.log("done");
//     res
//       .status(201)
//       .json({ message: `${created.length} courses created`, data: created });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };











export const getCoursesBySubject = async (req, res) => {
  try {
    const { subject } = req.params;

    // Case-insensitive search for courses by subject
    const filteredCourses = await Course.find({
      subject: { $regex: new RegExp(`^${subject}$`, "i") }, // Exact match (case-insensitive)
    }).select("name description duration numberOfLessons titles"); // Only fetch required fields

    if (filteredCourses.length === 0) {
      return res
        .status(404)
        .json({ error: `No courses found for subject: ${subject}` });
    }

    // Format the response
    const result = filteredCourses.map((course) => ({
      courseName: course.name,
      description: course.description,
      duration: course.duration,
      numberOfLessons: course.numberOfLessons,
      lessons: course.titles, // Already structured as per titleSchema
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};