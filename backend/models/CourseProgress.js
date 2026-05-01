const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        default: [],
      },
    ],
    lastAccessedSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },
    lastAccessedSubSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      default: null,
    },
    lastPlaybackTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
