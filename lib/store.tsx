import { configureStore } from "@reduxjs/toolkit";
import slice from "./features";
const store = configureStore({
  reducer: {
    jobs: slice.jobsReducer,
    auth: slice.authReducer,
    profile: slice.profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
