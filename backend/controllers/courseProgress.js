const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const Section = require("../models/Section");
const User = require("../models/User");

const getOrCreateCourseProgress = async (courseId, userId) => {
  let courseProgress = await CourseProgress.findOne({
    courseId: courseId,
    userId: userId,
  });

  if (!courseProgress) {
    courseProgress = await CourseProgress.create({
      courseId,
      userId,
      completedVideos: [],
    });
  }

  return courseProgress;
};

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection",
      });
    }

    const courseProgress = await getOrCreateCourseProgress(courseId, userId);

    // Check if the subsection is already completed
    if (
      courseProgress.completedVideos.some(
        (id) => id.toString() === subsectionId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Subsection already completed",
      });
    }

    // Add subsection to completedVideos and keep resume metadata fresh
    courseProgress.completedVideos.push(subsectionId);
    courseProgress.lastAccessedSubSection = subsectionId;
    courseProgress.lastVisitedAt = new Date();
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture marked as complete",
      courseProgress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLastViewedLecture = async (req, res) => {
  const { courseId, sectionId, subSectionId, currentTime = 0 } = req.body;
  const userId = req.user.id;

  try {
    if (!courseId || !sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId, sectionId and subSectionId are required",
      });
    }

    const [course, section, subSection, enrolledUser] = await Promise.all([
      Course.findById(courseId).select("_id courseContent"),
      Section.findById(sectionId).select("_id subSection"),
      SubSection.findById(subSectionId).select("_id"),
      User.findOne({ _id: userId, courses: courseId }).select("_id"),
    ]);

    if (!course || !section || !subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid course, section, or lecture",
      });
    }

    if (!enrolledUser) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    const sectionExistsInCourse = course.courseContent.some(
      (id) => id.toString() === sectionId
    );
    if (!sectionExistsInCourse) {
      return res.status(400).json({
        success: false,
        message: "Section does not belong to this course",
      });
    }

    const subSectionExistsInSection = section.subSection.some(
      (id) => id.toString() === subSectionId
    );
    if (!subSectionExistsInSection) {
      return res.status(400).json({
        success: false,
        message: "Lecture does not belong to this section",
      });
    }

    const safeCurrentTime = Number(currentTime);
    const normalizedCurrentTime =
      Number.isFinite(safeCurrentTime) && safeCurrentTime > 0
        ? Math.floor(safeCurrentTime)
        : 0;

    const courseProgress = await getOrCreateCourseProgress(courseId, userId);
    courseProgress.lastAccessedSection = sectionId;
    courseProgress.lastAccessedSubSection = subSectionId;
    courseProgress.lastPlaybackTime = normalizedCurrentTime;
    courseProgress.lastVisitedAt = new Date();
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Last viewed lecture updated",
      data: {
        lastAccessedSection: courseProgress.lastAccessedSection,
        lastAccessedSubSection: courseProgress.lastAccessedSubSection,
        lastPlaybackTime: courseProgress.lastPlaybackTime,
        lastVisitedAt: courseProgress.lastVisitedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
