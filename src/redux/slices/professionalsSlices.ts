import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiCliente";
import { formatProfessionals } from "../../utils/formatData";

export const getAllProfessionals = createAsyncThunk(`/professionals/getAllProfessionals`, async (arg: string, thunkAPI) => {
  return await apiClient()
                .get(`/professionals${arg}`)
                .then((res) => (
                  res.data.length ? formatProfessionals(res.data) : null
                ))
                .catch((err) => (
                  thunkAPI.rejectWithValue(err.message)
                ))
});

export const getCountAllProfessionals = createAsyncThunk(`/professionals/getCountAllProfessionals`, async (arg: string, thunkAPI) => {
  return await apiClient()
    .get(`/professionals${arg}`)
    .then((res) => (
      res.data
    ))
    .catch((err) => (
      thunkAPI.rejectWithValue(err.message)
    ))
});

export const getFeaturedProfessionals = createAsyncThunk(`/professionals/getFeaturedProfessionals`, async (_, thunkAPI) => {
  return await apiClient()
                .get(`/professionals?IsFeatured=true&_limit=6&_sort=id:DESC`)
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
    allProfessionals: {
      data: [],
      error: false,
      loading: true,
      count: 0,
      page: 1,
    },
    featuredProfessionals: {
      data: [],
      error: false,
      loading: true,
    },
  },
  reducers: {
    setProfessionalsPage: (state, action) => {
      state.allProfessionals.page = action.payload;
    }
  },
  extraReducers: {
    // All professionals
    [getAllProfessionals.pending.type]: (state, action) => {
      state.allProfessionals.loading = true;
    },
    [getAllProfessionals.fulfilled.type]: (state, action) => {
      console.log('professionals page', state.allProfessionals.page);
      if(state.allProfessionals.page == 1) {
        state.allProfessionals.data = action.payload;
      }
      else {
        state.allProfessionals.data = state.allProfessionals.data.concat(action.payload);
      }
      state.allProfessionals.loading = false;
    },
    [getAllProfessionals.rejected.type]: (state, action) => {
      state.allProfessionals.error = action.payload;
      state.allProfessionals.loading = false;
    },
    // Featured professionals
    [getFeaturedProfessionals.pending.type]: (state, action) => {
      state.featuredProfessionals.loading = true;
    },
    [getFeaturedProfessionals.fulfilled.type]: (state, action) => {
      state.featuredProfessionals.data = action.payload;
      state.featuredProfessionals.loading = false;
    },
    [getFeaturedProfessionals.rejected.type]: (state, action) => {
      state.featuredProfessionals.error = action.payload;
      state.featuredProfessionals.loading = false;
    },
    // Count all professionals
    [getCountAllProfessionals.fulfilled.type]: (state, action) => {
      state.allProfessionals.count = action.payload;
    },
  },
});

export const {
  setProfessionalsPage
} = professionalsSlices.actions;
export default professionalsSlices.reducer;
