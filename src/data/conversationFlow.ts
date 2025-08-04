import { ChatMessage } from '../types';

export const conversationFlow = {
  greeting: {
    message: "Hi! 👋 I'm your personal fragrance matchmaker. I'm here to help you discover your perfect scent!",
    delay: 1000
  },
  
  choice: {
    message: "How would you like to find your perfect fragrance today?",
    options: [
      "Let me ask you a few questions 🤔",
      "I'll describe what I want myself ✍️"
    ],
    delay: 1500
  },

  noteFamily: {
    message: "Great! Let's start with the basics. What type of fragrance notes do you enjoy? ✨",
    options: [
      "Floral 🌸",
      "Fruity 🍓",
      "Spicy 🌶️",
      "Woody 🌳",
      "Sweet & Gourmand 🍰"
    ]
  },

  vibe: {
    message: "Perfect! What kind of vibe or feel are you looking for? 💫",
    options: [
      "Fresh & Clean 🌿",
      "Romantic & Soft 💕",
      "Bold & Seductive 🔥",
      "Warm & Cozy ☕",
      "Unique & Unisex ⚡"
    ]
  },

  timing: {
    message: "Excellent choice! When do you plan to wear this perfume? 🕐",
    options: [
      "Daytime / Office 🌅",
      "Evening / Party 🌙",
      "Casual Everyday 👕",
      "Date or Romantic Outing 💖",
      "Gifting someone 🎁"
    ]
  },

  intensity: {
    message: "Almost there! What intensity do you prefer? 💪",
    options: [
      "Light and airy 🌬️",
      "Moderate and balanced ⚖️",
      "Deep and intense 🔥",
      "I'm not sure 🤷‍♀️"
    ]
  },

  processing: {
    message: "Perfect! Let me work my magic and find the best matches for you... ✨🔮",
    delay: 2000
  },

  freeText: {
    message: "I love that! Tell me exactly what kind of fragrance you're dreaming of, and I'll find the perfect matches for you! 💭✨"
  }
};

export const responseMessages = {
  noteFamily: {
    "Floral 🌸": "Florals are timeless! So elegant and beautiful 🌺",
    "Fruity 🍓": "Fruity notes are amazing! Fresh and playful 🍑",
    "Spicy 🌶️": "Spicy notes! Bold and captivating choice 🔥",
    "Woody 🌳": "Woody scents are so sophisticated and grounding 🍂",
    "Sweet & Gourmand 🍰": "Sweet gourmand! Delicious and irresistible 🍯"
  },

  vibe: {
    "Fresh & Clean 🌿": "Fresh and clean vibes! Perfect for feeling refreshed 🌊",
    "Romantic & Soft 💕": "Romantic and soft! So dreamy and feminine 💖",
    "Bold & Seductive 🔥": "Bold and seductive! You want to make an impact 💋",
    "Warm & Cozy ☕": "Warm and cozy! Like a comforting hug 🤗",
    "Unique & Unisex ⚡": "Unique and unisex! Breaking boundaries, I love it! ✨"
  },

  timing: {
    "Daytime / Office 🌅": "Daytime wear! Professional yet pleasant 👔",
    "Evening / Party 🌙": "Evening vibes! Time to shine and sparkle ✨",
    "Casual Everyday 👕": "Everyday casual! Your signature scent 😊",
    "Date or Romantic Outing 💖": "Date night! Something special and memorable 💕",
    "Gifting someone 🎁": "What a thoughtful gift! They'll love it 🥰"
  },

  intensity: {
    "Light and airy 🌬️": "Light and airy - perfect for a subtle presence! 🌸",
    "Moderate and balanced ⚖️": "Moderate and balanced - the sweet spot! 👌",
    "Deep and intense 🔥": "Deep and intense! You want to make a lasting impression 💫",
    "I'm not sure 🤷‍♀️": "No worries! I'll help you find the perfect balance 😊"
  }
};