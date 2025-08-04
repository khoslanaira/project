import React from 'react';
import { Star } from 'lucide-react';
import { Perfume } from '../types';

interface PerfumeCardProps {
  perfume: Perfume;
}

export const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border border-gray-100">
      <div className="relative">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{perfume.name}</h3>
          <p className="text-purple-600 font-medium text-sm">{perfume.brand}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {perfume.description}
        </p>

        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-700">
            <span className="font-semibold text-purple-700">Notes:</span> {perfume.notes.top.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};