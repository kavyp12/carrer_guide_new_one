// components/Questionnaire/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
      <div className="text-center text-sm text-gray-600 mt-2">
        Question {current} of {total}
      </div>
    </div>
  );
};

export default ProgressBar;