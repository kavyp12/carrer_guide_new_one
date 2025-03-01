// components/Questionnaire/Question.tsx
import React from 'react';
import { Question as QuestionType } from '../../types/types';

interface QuestionProps {
  question: QuestionType;
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
}

const Question: React.FC<QuestionProps> = ({ question, value, onChange }) => {
  if (question.type === 'radio' && question.options) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'checkbox' && question.options) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                value={option}
                checked={(value as string[]).includes(option)}
                onChange={(e) => {
                  const currentValue = [...(value as string[])];
                  if (e.target.checked) {
                    currentValue.push(option);
                  } else {
                    const index = currentValue.indexOf(option);
                    if (index !== -1) currentValue.splice(index, 1);
                  }
                  onChange(currentValue);
                }}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'textarea') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
        <textarea
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      <input
        type="number"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default Question;