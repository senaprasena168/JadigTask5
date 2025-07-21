import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  time: number; // time in centiseconds
  isActive: boolean;
}

const initialState: TimerState = {
  time: 3000, // 30 seconds in centiseconds
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
      state.time = 3000;
      state.isActive = false;
    },
  },
});

export const { startTimer, stopTimer, decrementTime, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;