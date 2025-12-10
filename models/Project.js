const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    // --- Basic Information ---
    title: {
      type: String,
      required: [true, "Please add a project title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    }, // A brief, punchy summary for the project card
    summary: {
      type: String,
      required: [true, "Please add a short summary"],
      maxlength: [200, "Summary cannot be more than 200 characters"],
    }, // Detailed description for the project detail page/modal
    description: {
      type: String,
      required: [true, "Please add a detailed description"],
    }, // --- Technology & Stack ---

    techStack: {
      // Example: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
      type: [String],
      required: true,
      default: [],
    }, // --- Links & Deployment ---

    githubLink: {
      type: String, // We can add basic URL validation here later if needed
    },
    liveLink: {
      type: String, // We can add basic URL validation here later if needed
    }, // --- Media & Display --- // The main image URL for the project card

    image: {
      type: String,
      default: "no-photo.jpg",
    }, // Used for sorting/ordering the projects on the main page
    order: {
      type: Number,
      default: 100, // Lower numbers appear first
    },
  },
  { timestamps: true }
);
const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
