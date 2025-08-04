import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswers: string[];
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  questionNumber,
  totalQuestions
}) => {
  const isSelected = (option: string) => selectedAnswers.includes(option);

  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
          {question.question}
        </h2>
        {question.multiSelect && (
          <p className="text-sm text-purple-600 mt-2">You can select multiple options</p>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
              isSelected(option)
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {isSelected(option) && (
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            canGoPrevious
              ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            canGoNext
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {questionNumber === totalQuestions ? 'Get Recommendations' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};