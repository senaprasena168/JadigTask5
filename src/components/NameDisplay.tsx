'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function NameDisplay() {
  const name = useSelector((state: RootState) => state.name.value);

  return <div>The name is: {name}</div>;
}