import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import MainContent from '@/components/MainContent';
import { addAlarm, triggerAlarm, snoozeAlarm, markAlarmDone } from '@/store/slices/alarmSlice';

describe('Pomo-Doro Alarm App', () => {
  beforeEach(() => {
    // Reset the store before each test
    store.dispatch({ type: 'RESET' });
  });

  it('should add a new alarm when quick set button is clicked', () => {
    render(
      <Provider store={store}>
        <MainContent />
      </Provider>
    );

    // Find and click the 30m button
    const thirtyMinButton = screen.getByText('30m');
    fireEvent.click(thirtyMinButton);

    // Check if alarm is added
    const alarms = store.getState().alarms.alarms;
    expect(alarms.length).toBe(1);
    expect(alarms[0].time).toBe(30 * 60000);
  });

  it('should trigger an alarm and show snooze option', () => {
    // Add an alarm first
    store.dispatch(addAlarm({
      id: 'test-alarm',
      time: 30 * 60000,
      label: 'Test Alarm',
      isActive: true,
      isTriggered: false,
    }));

    render(
      <Provider store={store}>
        <MainContent />
      </Provider>
    );

    // Find the alarm item
    const alarmItem = screen.getByText('Test Alarm');
    const triggerButton = screen.getByText('Trigger');

    // Click trigger
    fireEvent.click(triggerButton);

    // Check if alarm is triggered
    const triggeredAlarm = store.getState().alarms.alarms[0];
    expect(triggeredAlarm.isTriggered).toBe(true);

    // Check if snooze button appears
    const snoozeButton = screen.getByText('Snooze');
    expect(snoozeButton).toBeInTheDocument();
  });

  it('should snooze an alarm', () => {
    // Add and trigger an alarm
    store.dispatch(addAlarm({
      id: 'test-alarm',
      time: 30 * 60000,
      label: 'Test Alarm',
      isActive: true,
      isTriggered: true,
    }));

    render(
      <Provider store={store}>
        <MainContent />
      </Provider>
    );

    // Find and click snooze button
    const snoozeButton = screen.getByText('Snooze');
    fireEvent.click(snoozeButton);

    // Check if alarm is snoozed
    const snoozedAlarm = store.getState().alarms.alarms[0];
    expect(snoozedAlarm.isTriggered).toBe(false);
    expect(snoozedAlarm.isActive).toBe(true);
  });

  it('should mark an alarm as done', () => {
    // Add and trigger an alarm
    store.dispatch(addAlarm({
      id: 'test-alarm',
      time: 30 * 60000,
      label: 'Test Alarm',
      isActive: true,
      isTriggered: true,
    }));

    render(
      <Provider store={store}>
        <MainContent />
      </Provider>
    );

    // Find and click done button
    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    // Check if alarm is marked as done
    const doneAlarm = store.getState().alarms.alarms[0];
    expect(doneAlarm.isActive).toBe(false);
    expect(doneAlarm.isTriggered).toBe(false);
  });
});
