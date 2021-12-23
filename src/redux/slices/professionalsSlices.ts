import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiCliente";
import { formatProfessionals } from "../../services/formatData";

export const getAllProfessionals = createAsyncThunk(`/professionals/getAllProfessionals`, async ({start = 0, limit = 6}: {start?: number, limit?: number}, thunkAPI) => {
  return await apiClient()
                .get(`/professionals?_start=${start}&_limit=${limit}`)
                .then((res) => (
                  res.data.length ? formatProfessionals(res.data) : null
                ))
                .catch((err) => (
                  thunkAPI.rejectWithValue(err.message)
                ))
});

export const professionalsSlices = createSlice({
  name: "professionals",
  initialState: {
    data: [],
    error: false,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getAllProfessionals.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getAllProfessionals.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getAllProfessionals.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default professionalsSlices.reducer;
