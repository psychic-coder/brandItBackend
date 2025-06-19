import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  try {
    const { userId, guardianId, ngoId, disabilityType, gradeLevel } = req.body;

    if (!userId || (!guardianId && !ngoId)) {
      return res
        .status(400)
        .json({ error: "Student must have either a guardian or an NGO" });
    }

    if (guardianId && ngoId) {
      return res
        .status(400)
        .json({ error: "Student cannot have both a guardian and an NGO" });
    }

    const student = await Student.create({
      userId,
      guardianId: guardianId || null,
      ngoId: ngoId || null,
      disabilityType,
      gradeLevel,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("progress");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentsByNGO = async (req, res) => {
  try {
    const students = await Student.find({ ngoId: req.params.ngoId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
