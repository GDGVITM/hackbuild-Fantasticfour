"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Copy,
  CheckSquare,
  Square,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export type Question = {
  question: string;
  options: string[];
  answer: number[];
}

interface Quiz {
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export default function QuizCreator() {
  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    timeLimit: 30,
    questions: []
  });

  const [previewMode, setPreviewMode] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      question: '',
      options: ['', '', '', ''],
      answer: []
    };
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | string[] | number[]) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: q.options.map((opt, oi) => oi === optionIndex ? value : opt) }
          : q
      )
    }));
  };

  const toggleAnswer = (questionIndex: number, optionIndex: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => {
        if (i === questionIndex) {
          const newAnswers = q.answer.includes(optionIndex)
            ? q.answer.filter(a => a !== optionIndex)
            : [...q.answer, optionIndex];
          return { ...q, answer: newAnswers };
        }
        return q;
      })
    }));
  };

  const deleteQuestion = (index: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const duplicateQuestion = (index: number) => {
    const questionToCopy = quiz.questions[index];
    const duplicated = {
      ...questionToCopy,
      question: questionToCopy.question + ' (Copy)',
      options: [...questionToCopy.options],
      answer: [...questionToCopy.answer]
    };
    setQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions.slice(0, index + 1),
        duplicated,
        ...prev.questions.slice(index + 1)
      ]
    }));
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === quiz.questions.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newQuestions = [...quiz.questions];
    [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
    
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  const addOption = (questionIndex: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: [...q.options, ''] }
          : q
      )
    }));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { 
              ...q, 
              options: q.options.filter((_, oi) => oi !== optionIndex),
              answer: q.answer.filter(a => a !== optionIndex).map(a => a > optionIndex ? a - 1 : a)
            }
          : q
      )
    }));
  };

  const saveQuiz = () => {
    console.log('Quiz JSON:', JSON.stringify(quiz, null, 2));
    console.log('Quiz Object:', quiz);
    alert('Quiz saved successfully! Check console for JSON output.');
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
        
        {/* Mobile Preview Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 relative z-10">
          <div className="px-3">
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center space-x-2">
                <Link href="/" className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                  EduMitra
                </Link>
                <span className="text-gray-400 text-sm">|</span>
                <h1 className="text-sm font-semibold text-gray-800">Preview</h1>
              </div>
              <button 
                onClick={() => setPreviewMode(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-lg text-white transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-3 py-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg border border-white/20 p-2 sm:p-3 md:p-4">
            <div className="mb-3 sm:mb-4 md:mb-6">
              <h1 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                {quiz.title || 'Untitled Quiz'}
              </h1>
              <p className="text-sm mb-3 text-gray-600">
                {quiz.description || 'No description provided'}
              </p>
              <p className="text-xs text-gray-500">
                Time Limit: {quiz.timeLimit} minutes
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-gray-50/80 to-white/50 rounded-xl border border-gray-100/50">
                  <h3 className="text-base font-semibold mb-3 text-gray-800">
                    {qIndex + 1}. {question.question || 'Question not set'}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        question.answer.includes(oIndex) 
                          ? 'bg-[#83c5be]/10 border-[#83c5be]/30' 
                          : 'bg-gray-50/50 border-gray-200/50'
                      }`}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          question.answer.includes(oIndex) 
                            ? 'border-[#83c5be] bg-[#83c5be]' 
                            : 'border-gray-300 bg-transparent'
                        }`}>
                          {question.answer.includes(oIndex) && (
                            <CheckSquare className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm text-gray-700">
                          {option || `Option ${oIndex + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6f9] via-[#edf6f9] to-[#ffddd2]/20 relative overflow-hidden">
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#83c5be]/10 to-[#006d77]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#ffddd2]/20 to-[#e29578]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#83c5be]/5 to-[#006d77]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Mobile Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 relative z-10">
        <div className="px-3">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
                EduMitra
              </Link>
              <span className="text-gray-400 text-sm">|</span>
              <h1 className="text-sm font-semibold text-gray-800">Quiz Creator</h1>
            </div>
            <Link href="/" className="p-2 rounded-lg bg-white/80 border border-gray-200/50 hover:shadow-sm transition-all duration-200">
              <Home className="w-5 h-5 text-[#006d77]" />
            </Link>
          </div>
        </div>
        
        {/* Mobile Action Bar */}
        <div className="px-3 pb-3">
          <div className="flex space-x-2">
            <button 
              onClick={() => setPreviewMode(true)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/80 border border-gray-200/50 hover:shadow-sm transition-all duration-200"
            >
              <Eye className="w-4 h-4 text-[#006d77]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Preview</span>
            </button>
            <button 
              onClick={saveQuiz}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-lg text-white transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-3 py-4 space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
        {/* Quiz Settings */}
        <div className="bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg border border-white/20 p-2 sm:p-3 md:p-4">
          <h2 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">Quiz Settings</h2>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Quiz Title
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter quiz title"
                className="w-full px-3 py-3 rounded-xl border border-gray-200/50 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#83c5be]/30 focus:border-[#83c5be] text-base text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 30 }))}
                min="1"
                className="w-full px-3 py-3 rounded-xl border border-gray-200/50 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#83c5be]/30 focus:border-[#83c5be] text-base text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description
              </label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter quiz description"
                rows={3}
                className="w-full px-3 py-3 rounded-xl border border-gray-200/50 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#83c5be]/30 focus:border-[#83c5be] text-base resize-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg border border-white/20 p-2 sm:p-3 md:p-4">
          <div className="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-[#006d77] to-[#83c5be] bg-clip-text text-transparent">
              Questions ({quiz.questions.length})
            </h2>
            <button
              onClick={addQuestion}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-lg text-white transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>

          {quiz.questions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-base font-medium mb-2 text-gray-800">No questions yet</h3>
              <p className="text-sm mb-2 sm:mb-3 md:mb-4 text-gray-600">
                Start by adding your first question
              </p>
              <button
                onClick={addQuestion}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#006d77] to-[#83c5be] hover:shadow-lg text-white transition-all duration-200 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add First Question</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-gray-50/80 to-white/50 rounded-xl border border-gray-100/50">
                  {/* Mobile Question Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold text-gray-800">
                      Q{qIndex + 1}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveQuestion(qIndex, 'up')}
                        disabled={qIndex === 0}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          qIndex === 0 
                            ? 'bg-gray-300/50 text-gray-400' 
                            : 'bg-gradient-to-r from-[#83c5be] to-[#e29578] hover:shadow-md text-white'
                        }`}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveQuestion(qIndex, 'down')}
                        disabled={qIndex === quiz.questions.length - 1}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          qIndex === quiz.questions.length - 1 
                            ? 'bg-gray-300/50 text-gray-400' 
                            : 'bg-gradient-to-r from-[#83c5be] to-[#e29578] hover:shadow-md text-white'
                        }`}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => duplicateQuestion(qIndex)}
                        className="p-2 rounded-lg bg-white/80 border border-gray-200/50 hover:shadow-sm text-[#006d77] transition-all duration-200"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteQuestion(qIndex)}
                        className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <label className="block text-xs font-medium mb-2 text-gray-600">
                      Question Text
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                      rows={3}
                      className="w-full px-3 py-3 rounded-xl border border-gray-200/50 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#83c5be]/30 focus:border-[#83c5be] text-base resize-none text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-medium text-gray-600">
                        Options (Tap to mark correct)
                      </label>
                      <button
                        onClick={() => addOption(qIndex)}
                        className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-[#83c5be] to-[#e29578] hover:shadow-md text-white transition-all duration-200"
                      >
                        Add Option
                      </button>
                    </div>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleAnswer(qIndex, oIndex)}
                              className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                question.answer.includes(oIndex)
                                  ? 'border-[#83c5be] bg-[#83c5be] shadow-sm'
                                  : 'border-gray-300 bg-transparent hover:border-[#83c5be]/50'
                              }`}
                            >
                              {question.answer.includes(oIndex) ? (
                                <CheckSquare className="w-4 h-4 text-white" />
                              ) : (
                                <Square className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                            <span className="text-xs text-gray-600">
                              Option {oIndex + 1}
                            </span>
                            {question.options.length > 2 && (
                              <button
                                onClick={() => removeOption(qIndex, oIndex)}
                                className="ml-auto p-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            placeholder={`Enter option ${oIndex + 1}`}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200/50 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-[#83c5be]/30 focus:border-[#83c5be] text-base text-gray-800 placeholder-gray-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Answer Summary */}
                  <div className="text-xs p-3 rounded-xl bg-[#83c5be]/10 border border-[#83c5be]/20 text-gray-700">
                    <strong>Correct:</strong> {
                      question.answer.length > 0 
                        ? question.answer.map(i => `Option ${i + 1}`).join(', ')
                        : 'No correct answer selected'
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
