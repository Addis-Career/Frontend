// store.ts
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobSlice"; // Ensure correct import

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

// Export the RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
