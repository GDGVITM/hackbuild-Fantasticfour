"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Send, Bot, User, Loader2, MessageSquare, Home, Mic } from 'lucide-react';
import { getMockInterviewResponse } from '@/utlis/mock-interview/get-mock-interview-response';
import { mockInterviewResponse } from '@/utlis/mock-interview/type';
import TeacherModel from './TeacherModel';

// Add types for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface CustomWindow extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

declare const window: CustomWindow;

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface AIResponse {
  response: string;
  score?: number;
  memory?: string[];
}

export default function MockInterviewPage() {
  const maxScore = 25;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Interview Coach. I'll help you practice for your upcoming interviews. Let's start with a simple question: Tell me about yourself",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [lastAIResponse, setLastAIResponse] = useState<AIResponse | null>(null);
  const [previousResponse, setPreviousResponse] = useState<mockInterviewResponse>(
    {
      score: Math.floor(maxScore / 2),
      memory: [],
      response: messages[0].content
    }
  );
  const [interviewType, setInterviewType] = useState('Software engineering interview for a tech company position.');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSendMessage = useCallback(async (messageOverride?: string) => {
    const messageToSend = (messageOverride || inputText || '').trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await getMockInterviewResponse(
        messageToSend,
        previousResponse,
        "", // custom instructions
        interviewType,
        maxScore // out of marks
      );
      
      // Update previous response for context
      setPreviousResponse(aiResponse);
      
      // Convert to AIResponse format for UI
      const uiResponse: AIResponse = {
        response: aiResponse.response,
        score: aiResponse.score,
        memory: aiResponse.memory
      };
      
      setLastAIResponse(uiResponse);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, previousResponse, interviewType, maxScore]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        setSpeechSupported(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            handleSendMessage(transcript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognitionRef.current = recognition;
    }
  }, [handleSendMessage]);

  const startListening = () => {
    if (recognitionRef.current && !isLoading) {
        setIsListening(true);
        recognitionRef.current.start();
    }
  };

  const stopListening = () => {
      if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsListening(false);
      }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const initialMessage = "Hello! I'm your AI Interview Coach. I'll help you practice for your upcoming interviews. Let's start with a simple question: Tell me about yourself and why you're interested in this position.";
    
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: initialMessage,
        timestamp: new Date()
      }
    ]);
    setLastAIResponse(null);
    setPreviousResponse({
      score: 0,
      memory: [],
      response: initialMessage
    });
  };

  return (
    <div className="min-h-screen bg-[#edf6f9]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-[#006d77] hover:opacity-80 transition-colors">
                EduMitra
              </Link>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <h1 className="text-sm sm:text-xl font-semibold text-[#006d77] truncate">Mock Interview Bot</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/" className="flex items-center space-x-1 sm:space-x-2 text-[#006d77] hover:opacity-80 transition-colors" >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Home</span>
              </Link>
              <button
                onClick={() => setShowJson(!showJson)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border-0 ${
                  showJson 
                    ? 'text-white bg-[#006d77] shadow-md' 
                    : 'text-white bg-[#83c5be] hover:shadow-md'
                }`}
              >
                {showJson ? 'Hide' : 'Show'} <span className="hidden sm:inline">JSON</span>
              </button>
              <button
                onClick={clearChat}
                className="px-2 sm:px-3 py-1 rounded-lg text-xs font-medium text-white bg-[#e29578] hover:opacity-90 transition-all duration-300 border-0"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col" 
                 style={{ height: '70vh', minHeight: '500px' }}>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ffddd2] flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#006d77]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#006d77]">AI Interview Coach</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Practice your interview skills</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#e29578]"></div>
                  <span className="text-xs text-gray-600 hidden sm:inline">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[70%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                           style={{
                             backgroundColor: message.type === 'user' ? '#006d77' : '#ffddd2'
                           }}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-[#006d77]" />
                        )}
                      </div>
                      <div className={`rounded-lg p-2 sm:p-3`}
                           style={{
                             backgroundColor: message.type === 'user' ? '#006d77' : 'white',
                             color: message.type === 'user' ? 'white' : '#374151',
                             border: message.type === 'bot' ? '1px solid #e5e7eb' : 'none'
                           }}>
                        <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#ffddd2] flex items-center justify-center">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-[#006d77]" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#006d77]" />
                          <span className="text-xs sm:text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2 sm:space-x-3">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer here... (Press Enter to send)"
                    className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#006d77] focus:border-transparent text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-500"
                    rows={2}
                    disabled={isLoading}
                  />
                  {speechSupported && (
                    <button
                      onClick={isListening ? stopListening : startListening}
                      disabled={isLoading}
                      className={`p-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-[#83c5be] text-white hover:bg-[#006d77]'
                      } disabled:opacity-50`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isLoading}
                    className="bg-[#006d77] text-white p-2 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
            {/* Teacher Model Panel */}
            <div className="h-64 md:h-80 lg:h-auto lg:aspect-[4/3] bg-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <TeacherModel topHalf={false} />
            </div>

            {/* Score & Stats Combined */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <h3 className="font-semibold mb-3 lg:mb-4 text-[#006d77] text-sm lg:text-base">Performance</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs lg:text-sm font-medium text-gray-700">Latest Score</span>
                  <span className="text-lg font-bold text-[#006d77]">{lastAIResponse?.score || 0}/{maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-[#006d77] to-[#83c5be]"
                    style={{ 
                      width: `${((lastAIResponse?.score || 0) / maxScore) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs lg:text-sm text-gray-700">Messages</span>
                  <span className="font-medium text-gray-900">{messages.filter(m => m.type === 'user').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs lg:text-sm text-gray-700">Session Time</span>
                  <span className="font-medium text-gray-900">
                    {Math.floor((Date.now() - messages[0].timestamp.getTime()) / 60000)}m
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions - Simplified */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center space-x-2 mb-3 lg:mb-4">
                <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-[#006d77]" />
                <h3 className="font-semibold text-[#006d77] text-sm lg:text-base">Quick Tips</h3>
              </div>
              <ul className="text-xs lg:text-sm space-y-1 lg:space-y-2 text-gray-700">
                <li>• Use the STAR method for behavioral questions</li>
                <li>• Take your time to think through responses</li>
                <li>• Practice multiple rounds for improvement</li>
              </ul>
              <div className="mt-3 lg:mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  🤖 Powered by Google Gemini AI
                </p>
              </div>
            </div>

            {/* JSON Response Display - Only when toggled */}
            {showJson && lastAIResponse && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
                <h3 className="font-semibold mb-3 lg:mb-4 text-[#006d77] text-sm lg:text-base">AI Response Data</h3>
                <div className="bg-gray-50 rounded-lg p-3 lg:p-4 border">
                  <pre className="text-xs whitespace-pre-wrap overflow-x-auto text-gray-800">
                    {JSON.stringify(lastAIResponse, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
