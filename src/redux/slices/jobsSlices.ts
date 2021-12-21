import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiCliente";
import { formatJobs } from "../../services/formatData";

export const getAllJobs = createAsyncThunk(`/jobs/getAllJobs`, async () => {
  const { data } = await apiClient().get(`/jobs`);
  return data.length ? formatJobs(data) : null;
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
