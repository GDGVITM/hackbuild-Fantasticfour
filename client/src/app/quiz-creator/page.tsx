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
      <div className="min-h-screen relative overflow-hidden" 
           style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)' }}>
        
        {/* Mobile Preview Header */}
        <header className="shadow-sm border-b border-opacity-20 relative z-10" 
                style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
          <div className="px-3">
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center space-x-2">
                <Link href="/" className="text-lg font-bold" style={{ color: '#10b981' }}>
                  EduMitra
                </Link>
                <span className="text-gray-400 text-sm">|</span>
                <h1 className="text-sm font-semibold" style={{ color: '#d1fae5' }}>Preview</h1>
              </div>
              <button 
                onClick={() => setPreviewMode(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#047857', color: 'white' }}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-3 py-4">
          <div className="rounded-lg shadow-sm border p-4"
               style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-3" style={{ color: '#d1fae5' }}>
                {quiz.title || 'Untitled Quiz'}
              </h1>
              <p className="text-sm mb-3" style={{ color: '#a7f3d0' }}>
                {quiz.description || 'No description provided'}
              </p>
              <p className="text-xs" style={{ color: '#a7f3d0', opacity: 0.8 }}>
                Time Limit: {quiz.timeLimit} minutes
              </p>
            </div>

            <div className="space-y-4">
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 rounded-lg border"
                     style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                  <h3 className="text-base font-semibold mb-3" style={{ color: '#d1fae5' }}>
                    {qIndex + 1}. {question.question || 'Question not set'}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-3 p-3 rounded"
                           style={{ 
                             backgroundColor: question.answer.includes(oIndex) ? '#047857' : '#4b5563',
                             border: question.answer.includes(oIndex) ? '2px solid #10b981' : '1px solid #6b7280'
                           }}>
                        <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                             style={{ 
                               borderColor: question.answer.includes(oIndex) ? '#10b981' : '#6b7280',
                               backgroundColor: question.answer.includes(oIndex) ? '#10b981' : 'transparent'
                             }}>
                          {question.answer.includes(oIndex) && (
                            <CheckSquare className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm" style={{ color: '#d1fae5' }}>
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
    <div className="min-h-screen relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)' }}>
      
      {/* Mobile Header */}
      <header className="shadow-sm border-b border-opacity-20 relative z-10" 
              style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
        <div className="px-3">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-lg font-bold" style={{ color: '#10b981' }}>
                EduMitra
              </Link>
              <span className="text-gray-400 text-sm">|</span>
              <h1 className="text-sm font-semibold" style={{ color: '#d1fae5' }}>Quiz Creator</h1>
            </div>
            <Link href="/" className="p-2 rounded-lg transition-colors" 
                  style={{ backgroundColor: '#374151', color: '#10b981' }}>
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Mobile Action Bar */}
        <div className="px-3 pb-3">
          <div className="flex space-x-2">
            <button 
              onClick={() => setPreviewMode(true)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: '#374151', color: '#10b981' }}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>
            <button 
              onClick={saveQuiz}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: '#047857', color: 'white' }}
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-3 py-4 space-y-4">
        {/* Quiz Settings */}
        <div className="rounded-lg shadow-sm border p-4"
             style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#d1fae5' }}>Quiz Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#a7f3d0' }}>
                Quiz Title
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter quiz title"
                className="w-full px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                style={{ 
                  backgroundColor: '#374151', 
                  borderColor: '#4b5563', 
                  color: '#d1fae5'
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#a7f3d0' }}>
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 30 }))}
                min="1"
                className="w-full px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                style={{ 
                  backgroundColor: '#374151', 
                  borderColor: '#4b5563', 
                  color: '#d1fae5'
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#a7f3d0' }}>
                Description
              </label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter quiz description"
                rows={3}
                className="w-full px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base resize-none"
                style={{ 
                  backgroundColor: '#374151', 
                  borderColor: '#4b5563', 
                  color: '#d1fae5'
                }}
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="rounded-lg shadow-sm border p-4"
             style={{ backgroundColor: '#1f2937', borderColor: '#374151' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#d1fae5' }}>
              Questions ({quiz.questions.length})
            </h2>
            <button
              onClick={addQuestion}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#047857', color: 'white' }}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>

          {quiz.questions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-base font-medium mb-2" style={{ color: '#d1fae5' }}>No questions yet</h3>
              <p className="text-sm mb-4" style={{ color: '#a7f3d0', opacity: 0.8 }}>
                Start by adding your first question
              </p>
              <button
                onClick={addQuestion}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors mx-auto"
                style={{ backgroundColor: '#047857', color: 'white' }}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add First Question</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 rounded-lg border"
                     style={{ backgroundColor: '#374151', borderColor: '#4b5563' }}>
                  {/* Mobile Question Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-semibold" style={{ color: '#d1fae5' }}>
                      Q{qIndex + 1}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveQuestion(qIndex, 'up')}
                        disabled={qIndex === 0}
                        className="p-2 rounded transition-colors disabled:opacity-50"
                        style={{ backgroundColor: qIndex === 0 ? '#4b5563' : '#047857', color: 'white' }}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveQuestion(qIndex, 'down')}
                        disabled={qIndex === quiz.questions.length - 1}
                        className="p-2 rounded transition-colors disabled:opacity-50"
                        style={{ backgroundColor: qIndex === quiz.questions.length - 1 ? '#4b5563' : '#047857', color: 'white' }}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => duplicateQuestion(qIndex)}
                        className="p-2 rounded transition-colors"
                        style={{ backgroundColor: '#374151', color: '#10b981' }}
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteQuestion(qIndex)}
                        className="p-2 rounded transition-colors"
                        style={{ backgroundColor: '#dc2626', color: 'white' }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-2" style={{ color: '#a7f3d0' }}>
                      Question Text
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                      rows={3}
                      className="w-full px-3 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base resize-none"
                      style={{ 
                        backgroundColor: '#4b5563', 
                        borderColor: '#6b7280', 
                        color: '#d1fae5'
                      }}
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-medium" style={{ color: '#a7f3d0' }}>
                        Options (Tap to mark correct)
                      </label>
                      <button
                        onClick={() => addOption(qIndex)}
                        className="text-xs px-2 py-1 rounded transition-colors"
                        style={{ backgroundColor: '#047857', color: 'white' }}
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
                              className="flex-shrink-0 w-8 h-8 rounded border-2 flex items-center justify-center transition-colors"
                              style={{
                                borderColor: question.answer.includes(oIndex) ? '#10b981' : '#6b7280',
                                backgroundColor: question.answer.includes(oIndex) ? '#10b981' : 'transparent'
                              }}
                            >
                              {question.answer.includes(oIndex) ? (
                                <CheckSquare className="w-4 h-4 text-white" />
                              ) : (
                                <Square className="w-4 h-4" style={{ color: '#6b7280' }} />
                              )}
                            </button>
                            <span className="text-xs" style={{ color: '#a7f3d0' }}>
                              Option {oIndex + 1}
                            </span>
                            {question.options.length > 2 && (
                              <button
                                onClick={() => removeOption(qIndex, oIndex)}
                                className="ml-auto p-1 rounded transition-colors"
                                style={{ backgroundColor: '#dc2626', color: 'white' }}
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
                            className="w-full px-3 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                            style={{ 
                              backgroundColor: '#4b5563', 
                              borderColor: '#6b7280', 
                              color: '#d1fae5'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Answer Summary */}
                  <div className="text-xs p-3 rounded"
                       style={{ backgroundColor: '#4b5563', color: '#a7f3d0' }}>
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
