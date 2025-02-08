
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MouseState {
  position: {
    x: number;
    y: number;
  };
}

const initialState: MouseState = {
  position: {
    x: 0,
    y: 0,
  },
};

export const mouseSlice = createSlice({
  name: 'mouse',
  initialState,
  reducers: {
    setMousePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.position = action.payload;
    },
  },
});

export const { setMousePosition } = mouseSlice.actions;
export default mouseSlice.reducer;
