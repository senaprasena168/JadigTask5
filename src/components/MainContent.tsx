import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAlarm, triggerAlarm, snoozeAlarm, markAlarmDone } from '@/store/slices/alarmSlice';
import { useAnimation } from 'framer-motion';

const MainContent = () => {
  const dispatch = useDispatch();
  const alarms = useSelector((state: RootState) => state.alarms.alarms);
  const activeAlarm = useSelector((state: RootState) => state.alarms.activeAlarm);
  const controls = useAnimation();

  const handleQuickSet = (minutes: number) => {
    dispatch(addAlarm({
      time: minutes * 60000, // Convert minutes to milliseconds
      label: `${minutes} minutes`,
    }));
  };

  const handleSnooze = () => {
    if (activeAlarm) {
      dispatch(snoozeAlarm(activeAlarm.id));
    }
  };

  const handleDone = () => {
    if (activeAlarm) {
      dispatch(markAlarmDone(activeAlarm.id));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Apple Background */}
      <div className="relative w-full max-w-2xl aspect-square rounded-full bg-green-500 shadow-2xl">
        {/* Caterpillar Character */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Standby State */}
          {!activeAlarm && (
            <div className="animate-bounce">
              <div className="w-12 h-12 bg-green-700 rounded-full"></div>
            </div>
          )}
          {/* Active State */}
          {activeAlarm && !activeAlarm.isTriggered && (
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
            </div>
          )}
          {/* Triggered State */}
          {activeAlarm && activeAlarm.isTriggered && (
            <div className="animate-wiggle">
              <div className="w-12 h-12 bg-red-400 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Quick Set Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-around">
            {[
              { minutes: 5, label: '5m' },
              { minutes: 30, label: '30m' },
              { minutes: 60, label: '1h' },
            ].map((button) => (
              <button
                key={button.minutes}
                onClick={() => handleQuickSet(button.minutes)}
                className="px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alarm List */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Alarms</h2>
            <div className="space-y-2">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="flex justify-between items-center p-2 rounded bg-gray-100"
                >
                  <span>{alarm.label}</span>
                  <div className="flex space-x-2">
                    {alarm.isTriggered && (
                      <button
                        onClick={handleSnooze}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Snooze
                      </button>
                    )}
                    {alarm.isActive && (
                      <button
                        onClick={handleDone}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
