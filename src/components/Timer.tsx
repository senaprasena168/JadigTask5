'use client';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { startTimer, stopTimer, decrementTime, resetTimer, setTime } from '@/lib/features/timer/timerSlice';
import Image from 'next/image';

export default function Timer() {
  const { time, isActive } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [newTime, setNewTime] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const formatTime = (centiseconds: number) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centis = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
  };

  const handleAppleClick = () => {
    dispatch(isActive ? stopTimer() : startTimer());
  };

  const handleTimeClick = () => {
    if (!isActive) {
      setIsEditing(true);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    if (input.length <= 4) {
      if (input.length >= 3) {
        setNewTime(`${input.slice(0, 2)}:${input.slice(2)}`);
      } else {
        setNewTime(input);
      }
    }
  };

  const handleTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [minutes, seconds] = newTime.split(':').map(Number);
    if (!isNaN(minutes) && !isNaN(seconds)) {
      dispatch(setTime((minutes * 60 + seconds) * 100));
      setIsEditing(false);
      setNewTime('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="absolute top-10 left-10">
        <button>
          <Image src="/menu-ico-trans.png" alt="Menu" width={50} height={50} />
        </button>
      </div>
      {isActive && <h1 className="text-5xl font-bold text-white mb-4 animate-blink">FOCUS TIME!</h1>}
      <button onClick={handleAppleClick} className="mb-4">
        <Image src="/yellowapple.png" alt="Start Timer" width={400} height={400} />
      </button>
      {isEditing ? (
        <form onSubmit={handleTimeSubmit} ref={formRef}>
          <input
            type="text"
            value={newTime}
            onChange={handleTimeChange}
            className="text-5xl font-bold text-white bg-black text-center"
            placeholder="00:00"
            maxLength={5}
          />
        </form>
      ) : (
        <div onClick={handleTimeClick} className="text-5xl font-bold text-white cursor-pointer">
          {formatTime(time)}
        </div>
      )}
      <button
        onClick={() => dispatch(resetTimer())}
        className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
      >
        Reset
      </button>
      <p className="text-white mt-4 text-sm">
        click the clock to set time, click the apple to start or stop, click reset to reset timer, click menu for more
      </p>
    </div>
  );
}