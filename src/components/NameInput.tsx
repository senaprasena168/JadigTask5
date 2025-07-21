'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '@/lib/features/name/nameSlice';
import { AppDispatch } from '@/lib/store';

export default function NameInput() {
  const [name, setLocalName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setName(name));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setLocalName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Set Name</button>
    </form>
  );
}