'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { startTimer, stopTimer, decrementTime, resetTimer } from '@/lib/features/timer/timerSlice';
import Image from 'next/image';

export default function Timer() {
  const { time, isActive } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 10);
    } else if (time === 0) {
      dispatch(stopTimer());
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time, dispatch]);

  const formatTime = (centiseconds: number) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centis = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    dispatch(isActive ? stopTimer() : startTimer());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <button onClick={handleToggle} className="mb-4">
        <Image src="/yellowapple.png" alt="Start Timer" width={400} height={400} />
      </button>
      <div onClick={handleToggle} className="text-5xl font-bold text-white cursor-pointer">
        {formatTime(time)}
      </div>
      <button
        onClick={() => dispatch(resetTimer())}
        className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
}