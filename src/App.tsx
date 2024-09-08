import React, { useState } from 'react';
import Day1Puzzle from './day1';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'day1'>('calendar');
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const toggleCompletion = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const renderCalendar = () => (
    <div className="calendar">
      {Array.from({ length: 25 }, (_, i) => i + 1).map(day => (
        <div 
          key={day} 
          className={`day ${completedDays.includes(day) ? 'completed' : ''}`}
          onClick={() => day === 1 ? setCurrentView('day1') : toggleCompletion(day)}
        >
          {day}
          {completedDays.includes(day) && <span className="star"> *</span>}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Advent of Code 2023</h1>
      {currentView === 'calendar' ? (
        renderCalendar()
      ) : (
        <>
          <Day1Puzzle />
          <button onClick={() => setCurrentView('calendar')}>Back to Calendar</button>
        </>
      )}
    </div>
  );
};

export default App;