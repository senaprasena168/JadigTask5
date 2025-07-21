import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  time: number; // time in centiseconds
  isActive: boolean;
}

const initialState: TimerState = {
  time: 120000, // 20 minutes in centiseconds
  isActive: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isActive = true;
    },
    stopTimer: (state) => {
      state.isActive = false;
    },
    decrementTime: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      } else {
        state.isActive = false;
      }
    },
    resetTimer: (state) => {
      state.time = 120000;
      state.isActive = false;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
});

export const { startTimer, stopTimer, decrementTime, resetTimer, setTime } = timerSlice.actions;
export default timerSlice.reducer;