import React from 'react';
import { Sparkles, Brain, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-violet-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Brain className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Fragrance Finder
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover your perfect match through our personalized AI recommendations
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            How it works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <p className="text-sm text-gray-600">Answer a few quick questions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-pink-600 font-bold">2</span>
              </div>
              <p className="text-sm text-gray-600">Our AI analyzes your preferences</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-violet-600 font-bold">3</span>
              </div>
              <p className="text-sm text-gray-600">Get custom perfumes that fit your vibe</p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
        >
          Start Your Fragrance Journey
        </button>
      </div>
    </div>
  );
};