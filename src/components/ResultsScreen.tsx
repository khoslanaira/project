import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Perfume, UserPreferences } from '../types';
import { PerfumeCard } from './PerfumeCard';

interface ResultsScreenProps {
  recommendations: Perfume[];
  preferences: UserPreferences;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  recommendations,
  preferences,
  onRestart
}) => {
  const generateQuerySummary = (prefs: UserPreferences) => {
    const parts = [];
    
    if (prefs.scentFamilies.length > 0) {
      parts.push(prefs.scentFamilies.join(' & '));
    }
    if (prefs.personality) parts.push(prefs.personality.toLowerCase());
    if (prefs.wearTime) parts.push(`for ${prefs.wearTime.toLowerCase()}`);
    if (prefs.season !== 'All Season') parts.push(`in ${prefs.season}`);
    if (prefs.intensity) parts.push(prefs.intensity.toLowerCase());
    if (prefs.budget) parts.push(`under ${prefs.budget}`);

    return parts.join(', ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-violet-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Perfect Fragrance Matches
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Based on your preferences: <em>{generateQuerySummary(preferences)}</em>
          </p>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-purple-200"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Not quite right? Try adjusting your preferences for more personalized recommendations.
          </p>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Find More Fragrances
          </button>
        </div>
      </div>
    </div>
  );
};