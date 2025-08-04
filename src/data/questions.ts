import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'scentFamilies',
    question: 'Which scent families appeal to you the most?',
    options: [
      'Fresh & Aquatic',
      'Floral & Romantic',
      'Oriental & Exotic',
      'Woody & Earthy',
      'Fruity & Sweet',
      'Spicy & Warm'
    ],
    multiSelect: true
  },
  {
    id: 'wearTime',
    question: 'When would you primarily wear this fragrance?',
    options: ['Daytime', 'Nighttime', 'Special Occasions', 'Everyday']
  },
  {
    id: 'season',
    question: 'What season are you shopping for?',
    options: ['Summer', 'Winter', 'Spring', 'Monsoon', 'All Season']
  },
  {
    id: 'intensity',
    question: 'How strong do you like your fragrance to be?',
    options: ['Light & Subtle', 'Moderate', 'Intense & Long-Lasting']
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    options: ['Under ₹500', '₹500–₹1000', '₹1000–₹2000', '₹2000+']
  },
  {
    id: 'personality',
    question: "What best describes your personality?",
    options: [
      'Bold & Confident',
      'Calm & Elegant',
      'Mysterious & Deep',
      'Playful & Cheerful',
      'Romantic & Soft'
    ]
  },
  {
    id: 'experience',
    question: "What's your experience with perfumes?",
    options: ['Beginner', 'I use them casually', "I'm a perfume lover", 'I collect perfumes']
  }
];