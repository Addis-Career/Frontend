// features/jobs/jobsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetch from "../api/api";
import { ResponseJob, JobsState } from "../../types/types";

export const fetchJobs = createAsyncThunk<
  ResponseJob,
  {
    nextUrl: string | null;
    job_title: string | null;
    work_arrangement: string | null;
    job_type: string | null;
  },
  { rejectValue: string }
>(
  "jobs/fetchJobs",
  async (
    { nextUrl, job_title, work_arrangement, job_type },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch({
        nextUrl,
        job_title,
        work_arrangement,
        job_type,
      });
      console.log("Fetched data:", response);
      return response;
    } catch (error: any) {
      console.log("Error fetching data");
      return rejectWithValue(error.response?.data || "Failed to fetch jobs");
    }
  }
);

const initialState: JobsState = {
  jobs: {
    results: [],
    count: 0,
    next: null,
    previous: null,
  },
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Loading set to true for pagination");
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<ResponseJob>) => {
          state.loading = false;
          state.jobs = action.payload;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});
export const { setLoading } = jobsSlice.actions;
export default jobsSlice.reducer;
