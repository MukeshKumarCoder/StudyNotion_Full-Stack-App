import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: null,
  completedLectures: [],
  totalNoOfLectures: 0,
  lastAccessedSection: null,
  lastAccessedSubSection: null,
  lastPlaybackTime: 0,
  lastVisitedAt: null,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
    setLastViewedLecture: (state, action) => {
      const {
        lastAccessedSection = null,
        lastAccessedSubSection = null,
        lastPlaybackTime = 0,
        lastVisitedAt = null,
      } = action.payload || {};

      state.lastAccessedSection = lastAccessedSection;
      state.lastAccessedSubSection = lastAccessedSubSection;
      state.lastPlaybackTime = lastPlaybackTime;
      state.lastVisitedAt = lastVisitedAt;
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  setLastViewedLecture,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
