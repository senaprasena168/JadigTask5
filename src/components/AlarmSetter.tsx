import { useDispatch } from 'react-redux';
import { addAlarm } from '@/store/slices/alarmSlice';
import { motion } from 'framer-motion';

interface AlarmButtonProps {
  minutes: number;
  label: string;
}

const AlarmButton: React.FC<AlarmButtonProps> = ({ minutes, label }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addAlarm({
      time: minutes * 60000,
      label: `Pomodoro ${minutes}m`,
    }));
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <span className="font-semibold text-gray-800">{label}</span>
    </motion.button>
  );
};

const AlarmSetter = () => {
  const buttons = [
    { minutes: 5, label: '5m' },
    { minutes: 30, label: '30m' },
    { minutes: 60, label: '1h' },
  ];

  return (
    <div className="flex justify-around items-center space-x-4">
      {buttons.map((button) => (
        <AlarmButton key={button.minutes} {...button} />
      ))}
    </div>
  );
};

export default AlarmSetter;
