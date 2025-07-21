import { useSelector, useDispatch } from 'react-redux';
import { triggerAlarm, snoozeAlarm, markAlarmDone } from '@/store/slices/alarmSlice';
import { motion } from 'framer-motion';

interface AlarmItemProps {
  alarm: {
    id: string;
    label: string;
    isActive: boolean;
    isTriggered: boolean;
  };
}

const AlarmItem: React.FC<AlarmItemProps> = ({ alarm }) => {
  const dispatch = useDispatch();

  const handleTrigger = () => {
    dispatch(triggerAlarm(alarm.id));
  };

  const handleSnooze = () => {
    dispatch(snoozeAlarm(alarm.id));
  };

  const handleDone = () => {
    dispatch(markAlarmDone(alarm.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md mb-2"
    >
      <div>
        <h3 className="font-semibold">{alarm.label}</h3>
        {alarm.isTriggered && (
          <p className="text-sm text-red-500">Time's up!</p>
        )}
      </div>
      <div className="flex space-x-2">
        {alarm.isTriggered ? (
          <>
            <motion.button
              onClick={handleSnooze}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Snooze
            </motion.button>
            <motion.button
              onClick={handleDone}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Done
            </motion.button>
          </>
        ) : (
          <motion.button
            onClick={handleTrigger}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Trigger
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const AlarmList = () => {
  const alarms = useSelector((state: RootState) => state.alarms.alarms);
  const activeAlarm = useSelector((state: RootState) => state.alarms.activeAlarm);

  if (alarms.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500"
      >
        No alarms set yet
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      {alarms.map((alarm) => (
        <AlarmItem key={alarm.id} alarm={alarm} />
      ))}
    </div>
  );
};

export default AlarmList;
