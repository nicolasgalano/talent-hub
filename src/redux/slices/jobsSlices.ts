import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiCliente";
import { formatJobs } from "../../utils/formatData";

export const getAllJobs = createAsyncThunk(`/jobs/getAllJobs`, async (arg: string, thunkAPI) => {
  return await apiClient()
                .get(`/jobs${arg}`)
                .then((res) => (
                  res.data.length ? formatJobs(res.data) : null
                ))
                .catch((err) => (
                  thunkAPI.rejectWithValue(err.message)
                ))
});

export const getCountAllJobs = createAsyncThunk(`/jobs/getCountAllJobs`, async (arg: string, thunkAPI) => {
  return await apiClient()
                .get(`/jobs${arg}`)
                .then((res) => (
                  res.data
                ))
                .catch((err) => (
                  thunkAPI.rejectWithValue(err.message)
                ))
});

export const getFeaturedJobs = createAsyncThunk(`/jobs/getFeaturedJobs`, async (_, thunkAPI) => {
  return await apiClient()
                .get(`/jobs?IsFeatured=true&_limit=6&_sort=id:DESC`)
                .then((res) => (
                  res.data.length ? formatJobs(res.data) : null
                ))
                .catch((err) => (
                  thunkAPI.rejectWithValue(err.message)
                ))
});

export const jobsSlices = createSlice({
  name: "jobs",
  initialState: {
    allJobs: {
      data: [],
      error: false,
      loading: true,
      count: 0,
      page: 1,
    },
    featuredJobs: {
      data: [],
      error: false,
      loading: true,
    },
  },
  reducers: {
    setJobPage: (state, action) => {
      state.allJobs.page = action.payload;
    }
  },
  extraReducers: {
    // All jobs
    [getAllJobs.pending.type]: (state, action) => {
      state.allJobs.loading = true;
    },
    [getAllJobs.fulfilled.type]: (state, action) => {
      console.log('getAllJob fulfilled page: ', state.allJobs.page);
      if(state.allJobs.page == 1) {
        state.allJobs.data = action.payload;
      } else {
        state.allJobs.data = state.allJobs.data.concat(action.payload);
      }
      state.allJobs.loading = false;
    },
    [getAllJobs.rejected.type]: (state, action) => {
      state.allJobs.error = action.payload;
      state.allJobs.loading = false;
    },
    // Count all jobs
    [getCountAllJobs.fulfilled.type]: (state, action) => {
      state.allJobs.count = action.payload;
    },
    // Featured jobs
    [getFeaturedJobs.pending.type]: (state, action) => {
      state.featuredJobs.loading = true;
    },
    [getFeaturedJobs.fulfilled.type]: (state, action) => {
      state.featuredJobs.data = action.payload;
      state.featuredJobs.loading = false;
    },
    [getFeaturedJobs.rejected.type]: (state, action) => {
      state.featuredJobs.error = action.payload;
      state.featuredJobs.loading = false;
    },
  },
});

export const {
  setJobPage
} = jobsSlices.actions;
export default jobsSlices.reducer;
