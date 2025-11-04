import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: initialEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { user, course } }) => {
      // prevent duplicate
      const exists = state.enrollments.some(
        (e: any) => e.user === user && e.course === course
      );
      if (!exists) {
        state.enrollments = [
          ...state.enrollments,
          { _id: uuidv4(), user, course },
        ];
      }
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
