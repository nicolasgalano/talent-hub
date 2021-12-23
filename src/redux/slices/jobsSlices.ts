import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiCliente";
import { formatJobs } from "../../services/formatData";

export const getAllJobs = createAsyncThunk(`/jobs/getAllJobs`, async ({start = 0, limit = 6}: {start?: number, limit?: number}, thunkAPI) => {
  return await apiClient()
                .get(`/jobs?_start=${start}&_limit=${limit}`)
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
    data: [],
    error: false,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getAllJobs.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getAllJobs.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getAllJobs.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default jobsSlices.reducer;
