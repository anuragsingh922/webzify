import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ImageState {
  _id: string;
  imageUrl: string;
  websiteType: string;
  designTone: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface InitialState {
  loading: boolean;
  updateIndex: number;
  deleteIndex: number;
  error: string | null;
  images: ImageState[];
}

const initialState: InitialState = {
  loading: false,
  updateIndex: -1,
  deleteIndex: -1,
  error: null,
  images: [],
};

export const fetchThemes = createAsyncThunk<ImageState[], any>(
  "theme/fetchThemes",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/get-approved",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching themes:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const postThemes = createAsyncThunk<any, any>(
  "theme/postTheme",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/get-approved/new-image",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching themes:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateTheme = createAsyncThunk<any, any>(
  "theme/updateTheme",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/v1/get-approved/new-image",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching themes:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deleteThemes = createAsyncThunk<ImageState, any>(
  "theme/deleteTheme",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/get-approved?themeId=${userData?.themeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching themes:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setUpdateindex: (state, action) => {
      state.updateIndex = action.payload;
    },
    setDeleteindex: (state, action) => {
      state.deleteIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchThemes.fulfilled,
        (state, action: PayloadAction<ImageState[]>) => {
          state.loading = false;
          state.images = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(postThemes.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        postThemes.fulfilled,
        (state, action: PayloadAction<ImageState>) => {
          state.loading = false;
          state.images.unshift(action.payload);
          state.error = null;
        }
      )
      .addCase(postThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateTheme.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTheme.fulfilled,
        (state, action: PayloadAction<ImageState>) => {
          state.loading = false;
          const index = state.images.findIndex(
            (item) => item._id === action.payload._id
          );
          if (index !== -1) {
            state.images[index] = action.payload; // Directly update the item
          }
          state.error = null;
        }
      )
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteThemes.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteThemes.fulfilled,
        (state, action: PayloadAction<ImageState>) => {
          state.loading = false;
          state.images = state.images.filter(
            (item) => item._id !== action.payload?._id
          );
          state.error = null;
        }
      )
      .addCase(deleteThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUpdateindex, setDeleteindex } = imageSlice.actions;
export default imageSlice.reducer;
