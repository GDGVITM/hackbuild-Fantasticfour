"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Send, Bot, User, Loader2, MessageSquare, Home, Trophy, Target, Zap, Clock, Mic } from 'lucide-react';
import { getMockInterviewResponse } from '@/utlis/mock-interview/get-mock-interview-response';
import { mockInterviewResponse } from '@/utlis/mock-interview/type';
import TeacherModel from './TeacherModel';

// Add types for SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
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
  feedback?: string;
  suggestions?: string[];
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
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
      {/* Enhanced Animated Background - Matching Landing Page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#006d77] to-[#83c5be] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">EduMitra</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#e29578] to-[#ffddd2] rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">AI Interview Coach</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/" className="group flex items-center space-x-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-md transition-all duration-300 hover:scale-105">
                <Home className="w-4 h-4 text-[#006d77]" />
                <span className="font-medium bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Home</span>
              </Link>
              <button
                onClick={() => setShowJson(!showJson)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  showJson 
                    ? 'bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white shadow-lg' 
                    : 'bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 bg-gradient-to-r from-[#83c5be] to-[#006d77] bg-clip-text text-transparent hover:shadow-md'
                }`}
              >
                {showJson ? 'Hide' : 'Show'} <span className="hidden sm:inline">JSON</span>
              </button>
              <button
                onClick={clearChat}
                className="px-4 py-2 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#e29578] to-[#ffddd2] hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col hover:shadow-3xl transition-all duration-300" style={{ height: '700px' }}>
              {/* Premium Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100/50 bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-t-3xl">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#83c5be] to-[#006d77] rounded-2xl flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">AI Interview Coach</h3>
                    <p className="text-sm bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">Your personal career mentor</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600">Online</span>
                  </div>
                  <div className="text-xs bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent font-medium">
                    {messages.filter(m => m.type === 'user').length} responses
                  </div>
                </div>
              </div>

              {/* Enhanced Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#edf6f9]/50 to-white/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-[#006d77] to-[#83c5be]' 
                          : 'bg-gradient-to-br from-[#83c5be] to-[#e29578]'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`relative rounded-2xl p-4 shadow-sm border ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-[#006d77] to-[#83c5be] text-white border-[#006d77]/20' 
                          : 'bg-white/90 backdrop-blur-sm border-gray-200/50 text-gray-800'
                      }`}>
                        <div className="absolute top-3 left-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white/90 transform -translate-x-2"></div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#83c5be] to-[#e29578] rounded-2xl flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50">
                        <div className="flex items-center space-x-3">
                          <Loader2 className="w-4 h-4 animate-spin text-[#006d77]" />
                          <span className="text-sm text-gray-700">AI is analyzing your response...</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#83c5be] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#83c5be] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[#83c5be] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Input Area */}
              <div className="p-6 border-t border-gray-100/50 bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-b-3xl">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share your thoughts and experiences... (Press Enter to send)"
                      className="w-full resize-none border-2 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-[#006d77]/20 focus:border-[#006d77] text-sm bg-white/80 backdrop-blur-sm border-gray-200/50 text-gray-800 placeholder-gray-500 transition-all duration-300"
                      rows={3}
                      disabled={isLoading}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {inputText.length}/500
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isLoading}
                    className="group bg-gradient-to-r from-[#006d77] to-[#83c5be] text-white p-4 rounded-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 hover:shadow-lg hover:scale-105 disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Premium Instructions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#e29578] to-[#ffddd2] rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Interview Tips</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Target, text: "Answer questions naturally and authentically" },
                  { icon: Clock, text: "Take your time to think through responses" },
                  { icon: Zap, text: "Use the STAR method for behavioral questions" },
                  { icon: Trophy, text: "Check JSON feedback for detailed insights" }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-[#edf6f9]/50 to-white/50 border border-gray-100/50">
                    <tip.icon className="w-4 h-4 text-[#83c5be] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced JSON Response Display */}
            {showJson && lastAIResponse && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-4">AI Response Data</h3>
                <div className="bg-gradient-to-br from-[#edf6f9] to-white rounded-2xl p-4 border border-gray-100/50">
                  <pre className="text-xs whitespace-pre-wrap overflow-x-auto text-gray-800 font-mono">
                    {JSON.stringify(lastAIResponse, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Enhanced Feedback Display */}
            {lastAIResponse && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-6">Performance Feedback</h3>
                
                {lastAIResponse.score && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Response Score</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">{lastAIResponse.score}</span>
                        <span className="text-sm text-gray-500">/10</span>
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#006d77] to-[#83c5be] rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${(lastAIResponse.score / 10) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Needs Work</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                )}

                {lastAIResponse.feedback && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-3">Detailed Feedback</h4>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#edf6f9]/50 to-white/50 border border-gray-100/50">
                      <p className="text-sm text-gray-700 leading-relaxed">{lastAIResponse.feedback}</p>
                    </div>
                  </div>
                )}

                {lastAIResponse.suggestions && (
                  <div>
                    <h4 className="text-sm font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-3">Improvement Suggestions</h4>
                    <div className="space-y-2">
                      {lastAIResponse.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-[#ffddd2]/30 to-white/50 border border-[#e29578]/20">
                          <div className="w-1.5 h-1.5 bg-[#e29578] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Stats */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent mb-6">Session Analytics</h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Responses Given",
                    value: messages.filter(m => m.type === 'user').length,
                    icon: MessageSquare,
                    color: "from-[#006d77] to-[#83c5be]"
                  },
                  {
                    label: "Session Duration",
                    value: `${Math.floor((Date.now() - messages[0].timestamp.getTime()) / 60000)}m`,
                    icon: Clock,
                    color: "from-[#83c5be] to-[#e29578]"
                  },
                  {
                    label: "Latest Score",
                    value: lastAIResponse?.score ? `${lastAIResponse.score}/10` : 'N/A',
                    icon: Trophy,
                    color: "from-[#e29578] to-[#ffddd2]"
                  }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#edf6f9]/30 to-white/50 border border-gray-100/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-sm`}>
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">{stat.value}</span>
                  </div>
                ))}
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
