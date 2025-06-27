import { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCurrentValue(value);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        <div className="text-blue-500 dark:text-blue-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          {icon}
        </div>
      </div>
      <p className="text-4xl font-bold text-gray-900 dark:text-white">{currentValue}</p>
    </div>
  );
}