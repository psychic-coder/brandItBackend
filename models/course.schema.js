// models/Course.js
import mongoose from "mongoose";

const titleSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Lesson title
  description: { type: String, required: true }, // Lesson description
  video: { type: String }, // Video URL or path
});

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Course name (e.g., "Class 6 Science")
    description: { type: String, required: true }, // Course overview
    subject: { type: String, required: true }, // e.g., "Science", "English"
    duration: { type: Number, required: true }, // in minutes/hours
    numberOfLessons: { type: Number, required: true },
    titles: { type: [titleSchema], required: true }, // Array of lessons
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
