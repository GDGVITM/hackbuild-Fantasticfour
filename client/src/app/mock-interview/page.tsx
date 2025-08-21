"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Send, Bot, User, Loader2, MessageSquare, Home } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface AIResponse {
  response: string;
  feedback?: string;
  score?: number;
  suggestions?: string[];
}

// Dummy AI function that simulates mock interview responses
const mockInterviewAI = async (userInput: string): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    {
      response: "That's a great start! Can you elaborate on your experience with teamwork and how you handle conflicts in a team setting?",
      feedback: "Good opening, but try to be more specific about your achievements.",
      score: 7,
      suggestions: ["Use STAR method", "Include quantifiable results", "Be more confident"]
    },
    {
      response: "Interesting! Now tell me about a challenging project you worked on and how you overcame obstacles.",
      feedback: "Nice technical explanation. Consider adding more details about the impact.",
      score: 8,
      suggestions: ["Mention specific technologies", "Explain the business value", "Discuss lessons learned"]
    },
    {
      response: "I see you have strong problem-solving skills. What motivates you in your work, and where do you see yourself in 5 years?",
      feedback: "Good self-reflection. Try to connect your goals with the company's mission.",
      score: 6,
      suggestions: ["Research the company values", "Be more specific about career goals", "Show enthusiasm"]
    },
    {
      response: "Excellent communication! Let's discuss a time when you had to learn something completely new. How did you approach it?",
      feedback: "Great example of adaptability. Could use more details about the learning process.",
      score: 9,
      suggestions: ["Mention specific learning strategies", "Highlight time management", "Show continuous improvement mindset"]
    },
    {
      response: "Thank you for that detailed answer. Finally, do you have any questions about our company or the role?",
      feedback: "Always prepare thoughtful questions. It shows genuine interest.",
      score: 8,
      suggestions: ["Ask about team dynamics", "Inquire about growth opportunities", "Show you've researched the company"]
    }
  ];
  
  // Simple logic to vary responses based on input length and content
  let responseIndex = 0;
  if (userInput.length > 100) responseIndex = 1;
  if (userInput.toLowerCase().includes('project') || userInput.toLowerCase().includes('challenge')) responseIndex = 2;
  if (userInput.toLowerCase().includes('goal') || userInput.toLowerCase().includes('future')) responseIndex = 3;
  if (userInput.toLowerCase().includes('learn') || userInput.toLowerCase().includes('new')) responseIndex = 4;
  
  responseIndex = Math.min(responseIndex, responses.length - 1);
  
  return responses[responseIndex];
};

export default function MockInterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Interview Coach. I'll help you practice for your upcoming interviews. Let's start with a simple question: Tell me about yourself and why you're interested in this position.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [lastAIResponse, setLastAIResponse] = useState<AIResponse | null>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await mockInterviewAI(inputText);
      setLastAIResponse(aiResponse);

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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your AI Interview Coach. I'll help you practice for your upcoming interviews. Let's start with a simple question: Tell me about yourself and why you're interested in this position.",
        timestamp: new Date()
      }
    ]);
    setLastAIResponse(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #edf6f9 0%, #83c5be 50%, #006d77 100%)' }}>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#ffddd2' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#e29578' }}></div>
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full opacity-15" 
             style={{ backgroundColor: '#83c5be' }}></div>
        <div className="absolute top-2/3 -right-20 w-32 h-32 rounded-full opacity-10" 
             style={{ backgroundColor: '#ffddd2' }}></div>
      </div>

      {/* Header */}
      <header className="shadow-sm border-b border-opacity-20 relative z-10" 
              style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold" style={{ color: '#006d77' }}>
                EduMitra
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold" style={{ color: '#006d77' }}>Mock Interview Bot</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-80" 
                    style={{ color: '#006d77' }}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <button
                onClick={() => setShowJson(!showJson)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border-0 ${
                  showJson 
                    ? 'text-white shadow-md' 
                    : 'text-white hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: showJson ? '#006d77' : '#83c5be'
                }}
              >
                {showJson ? 'Hide JSON' : 'Show JSON'}
              </button>
              <button
                onClick={clearChat}
                className="px-3 py-1 rounded-full text-xs font-medium text-white transition-all duration-300 hover:shadow-md border-0"
                style={{ backgroundColor: '#e29578' }}
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="rounded-xl shadow-2xl border-0 flex flex-col" 
                 style={{ height: '600px', backgroundColor: '#ffddd2' }}>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-opacity-20"
                   style={{ borderColor: '#83c5be' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: '#83c5be' }}>
                    <Bot className="w-5 h-5" style={{ color: '#006d77' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: '#006d77' }}>AI Interview Coach</h3>
                    <p className="text-sm opacity-75" style={{ color: '#006d77' }}>Practice your interview skills</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e29578' }}></div>
                  <span className="text-xs opacity-75" style={{ color: '#006d77' }}>Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#edf6f9' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[70%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                           style={{
                             backgroundColor: message.type === 'user' ? '#006d77' : '#83c5be'
                           }}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4" style={{ color: '#006d77' }} />
                        )}
                      </div>
                      <div className={`rounded-lg p-3`}
                           style={{
                             backgroundColor: message.type === 'user' ? '#006d77' : '#ffddd2',
                             color: message.type === 'user' ? 'white' : '#006d77'
                           }}>
                        <p className="text-sm">{message.content}</p>
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
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: '#83c5be' }}>
                        <Bot className="w-4 h-4" style={{ color: '#006d77' }} />
                      </div>
                      <div className="rounded-lg p-3" style={{ backgroundColor: '#ffddd2' }}>
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#006d77' }} />
                          <span className="text-sm" style={{ color: '#006d77' }}>AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-opacity-20" style={{ borderColor: '#83c5be' }}>
                <div className="flex space-x-3">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer here... (Press Enter to send)"
                    className="flex-1 resize-none border rounded-lg px-3 py-2 focus:ring-2 text-sm"
                    style={{ 
                      borderColor: '#83c5be',
                      backgroundColor: '#edf6f9',
                      color: '#006d77'
                    }}
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="text-white p-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                    style={{ backgroundColor: '#006d77' }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructions */}
            <div className="rounded-xl shadow-sm border p-6"
                 style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5" style={{ color: '#006d77' }} />
                <h3 className="font-semibold" style={{ color: '#006d77' }}>How to Use</h3>
              </div>
              <ul className="text-sm space-y-2" style={{ color: '#006d77' }}>
                <li>• Answer the bot&apos;s questions naturally</li>
                <li>• Take your time to think through responses</li>
                <li>• Use the STAR method for behavioral questions</li>
                <li>• Check the JSON response for detailed feedback</li>
                <li>• Practice multiple rounds for better results</li>
              </ul>
            </div>

            {/* JSON Response Display */}
            {showJson && lastAIResponse && (
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
                <h3 className="font-semibold mb-4" style={{ color: '#006d77' }}>Latest AI Response (JSON)</h3>
                <div className="rounded-lg p-4" style={{ backgroundColor: '#edf6f9' }}>
                  <pre className="text-xs whitespace-pre-wrap overflow-x-auto" style={{ color: '#006d77' }}>
                    {JSON.stringify(lastAIResponse, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Feedback Display */}
            {lastAIResponse && (
              <div className="rounded-xl shadow-sm border p-6"
                   style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
                <h3 className="font-semibold mb-4" style={{ color: '#006d77' }}>Latest Feedback</h3>
                
                {lastAIResponse.score && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: '#006d77' }}>Score</span>
                      <span className="text-lg font-bold" style={{ color: '#006d77' }}>{lastAIResponse.score}/10</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: '#edf6f9' }}>
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(lastAIResponse.score / 10) * 100}%`,
                          backgroundColor: '#006d77'
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {lastAIResponse.feedback && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#006d77' }}>Feedback</h4>
                    <p className="text-sm p-3 rounded-lg" 
                       style={{ 
                         color: '#006d77', 
                         backgroundColor: '#edf6f9' 
                       }}>
                      {lastAIResponse.feedback}
                    </p>
                  </div>
                )}

                {lastAIResponse.suggestions && (
                  <div>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#006d77' }}>Suggestions</h4>
                    <ul className="text-sm space-y-1" style={{ color: '#006d77' }}>
                      {lastAIResponse.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="mt-0.5" style={{ color: '#e29578' }}>•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="rounded-xl shadow-sm border p-6"
                 style={{ backgroundColor: '#ffddd2', borderColor: '#83c5be' }}>
              <h3 className="font-semibold mb-4" style={{ color: '#006d77' }}>Session Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#006d77' }}>Messages</span>
                  <span className="font-medium" style={{ color: '#006d77' }}>{messages.filter(m => m.type === 'user').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: '#006d77' }}>Session Time</span>
                  <span className="font-medium" style={{ color: '#006d77' }}>
                    {Math.floor((Date.now() - messages[0].timestamp.getTime()) / 60000)}m
                  </span>
                </div>
                {lastAIResponse?.score && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#006d77' }}>Latest Score</span>
                    <span className="font-medium" style={{ color: '#006d77' }}>{lastAIResponse.score}/10</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
