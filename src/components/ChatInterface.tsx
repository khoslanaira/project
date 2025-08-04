import React, { useState, useEffect, useRef } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { PerfumeCard } from './PerfumeCard';
import { ChatMessage as ChatMessageType, ConversationState, UserResponse, Perfume } from '../types';
import { conversationFlow, responseMessages } from '../data/conversationFlow';
import { getRecommendations } from '../utils/recommendations';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentState, setCurrentState] = useState<ConversationState>('greeting');
  const [userResponses, setUserResponses] = useState<UserResponse>({
    noteFamily: '',
    vibe: '',
    timing: '',
    intensity: '',
    brand: ''
  });
  const [recommendations, setRecommendations] = useState<Perfume[]>([]);
  const [freeTextInput, setFreeTextInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start the conversation
    addBotMessage(conversationFlow.greeting.message, conversationFlow.greeting.delay);
    
    setTimeout(() => {
      addBotMessage(
        conversationFlow.choice.message, 
        conversationFlow.choice.delay,
        conversationFlow.choice.options,
        'choice'
      );
      setCurrentState('choice');
    }, conversationFlow.greeting.delay + 500);
  }, []);

  const addBotMessage = (
    content: string, 
    delay: number = 0, 
    options?: string[], 
    questionId?: string
  ) => {
    if (delay > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content,
          timestamp: new Date(),
          options,
          questionId
        }]);
      }, delay);
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        options,
        questionId
      }]);
    }
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleOptionSelect = (option: string) => {
    addUserMessage(option);

    // Handle different conversation states
    switch (currentState) {
      case 'choice':
        if (option.includes('questions')) {
          setTimeout(() => {
            addBotMessage(
              conversationFlow.noteFamily.message,
              800,
              conversationFlow.noteFamily.options,
              'noteFamily'
            );
            setCurrentState('noteFamily');
          }, 500);
        } else {
          setTimeout(() => {
            addBotMessage(conversationFlow.freeText.message, 800);
            setCurrentState('freeText');
          }, 500);
        }
        break;

      case 'noteFamily':
        setUserResponses(prev => ({ ...prev, noteFamily: option }));
        const noteFamilyResponse = responseMessages.noteFamily[option as keyof typeof responseMessages.noteFamily];
        
        setTimeout(() => {
          addBotMessage(noteFamilyResponse, 800);
          setTimeout(() => {
            addBotMessage(
              conversationFlow.vibe.message,
              1000,
              conversationFlow.vibe.options,
              'vibe'
            );
            setCurrentState('vibe');
          }, 1300);
        }, 500);
        break;

      case 'vibe':
        setUserResponses(prev => ({ ...prev, vibe: option }));
        const vibeResponse = responseMessages.vibe[option as keyof typeof responseMessages.vibe];
        
        setTimeout(() => {
          addBotMessage(vibeResponse, 800);
          setTimeout(() => {
            addBotMessage(
              conversationFlow.timing.message,
              1000,
              conversationFlow.timing.options,
              'timing'
            );
            setCurrentState('timing');
          }, 1300);
        }, 500);
        break;

      case 'timing':
        setUserResponses(prev => ({ ...prev, timing: option }));
        const timingResponse = responseMessages.timing[option as keyof typeof responseMessages.timing];
        
        setTimeout(() => {
          addBotMessage(timingResponse, 800);
          setTimeout(() => {
            addBotMessage(
              conversationFlow.intensity.message,
              1000,
              conversationFlow.intensity.options,
              'intensity'
            );
            setCurrentState('intensity');
          }, 1300);
        }, 500);
        break;

      case 'intensity':
        setUserResponses(prev => ({ ...prev, intensity: option }));
        const intensityResponse = responseMessages.intensity[option as keyof typeof responseMessages.intensity];
        
        setTimeout(() => {
          addBotMessage(intensityResponse, 800);
          setTimeout(() => {
            addBotMessage(conversationFlow.processing.message, 1000);
            setCurrentState('processing');
            
            // Generate recommendations
            setTimeout(async () => {
              const recs = await getRecommendations(userResponses);
              setRecommendations(recs);
              addBotMessage(
                `Amazing! I found 3 perfect matches for you! Here are my top recommendations: 🎉✨`,
                1500
              );
              setCurrentState('results');
            }, 2000);
          }, 1300);
        }, 500);
        break;
    }
  };

  const handleFreeTextSubmit = () => {
    if (!freeTextInput.trim()) return;
    
    addUserMessage(freeTextInput);
    const userDescription = freeTextInput;
    setFreeTextInput('');
    
    setTimeout(() => {
      addBotMessage(conversationFlow.processing.message, 1000);
      setCurrentState('processing');
      
      // Generate recommendations based on free text
      setTimeout(async () => {
        const recs = await getRecommendations({
          noteFamily: 'fresh',
          vibe: 'fresh',
          timing: 'casual',
          intensity: 'moderate',
          brand: userDescription
        });
        setRecommendations(recs);
        addBotMessage(
          `Perfect! Based on your description, I found some amazing matches for you! 🎯✨`,
          1500
        );
        setCurrentState('results');
      }, 2000);
    }, 500);
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentState('greeting');
    setUserResponses({
      noteFamily: '',
      vibe: '',
      timing: '',
      intensity: '',
      brand: ''
    });
    setRecommendations([]);
    setFreeTextInput('');
    
    // Restart conversation
    setTimeout(() => {
      addBotMessage(conversationFlow.greeting.message, conversationFlow.greeting.delay);
      
      setTimeout(() => {
        addBotMessage(
          conversationFlow.choice.message, 
          conversationFlow.choice.delay,
          conversationFlow.choice.options,
          'choice'
        );
        setCurrentState('choice');
      }, conversationFlow.greeting.delay + 500);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-violet-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="text-center py-6 mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fragrance Finder</h1>
          <p className="text-gray-600">Your AI-powered scent matchmaker</p>
        </div>

        {/* Chat Messages */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              onOptionSelect={handleOptionSelect}
              showOptions={index === messages.length - 1}
            />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <div className="bg-white shadow-md rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Free Text Input */}
        {currentState === 'freeText' && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={freeTextInput}
                onChange={(e) => setFreeTextInput(e.target.value)}
                placeholder="Describe your perfect fragrance..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleFreeTextSubmit()}
              />
              <button
                onClick={handleFreeTextSubmit}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {currentState === 'results' && recommendations.length > 0 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 3).map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Find More Fragrances
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};