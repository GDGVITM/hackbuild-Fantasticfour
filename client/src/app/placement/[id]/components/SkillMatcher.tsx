"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  User,
  Award
} from 'lucide-react';

interface SkillMatcherProps {
  isOpen: boolean;
  onClose: () => void;
  requiredSkills: string[];
  jobTitle: string;
  company: string;
}

interface UserSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  experience: number; // in months
}

interface SkillAnalysis {
  skill: string;
  required: boolean;
  userHas: boolean;
  userLevel?: string;
  match: 'perfect' | 'partial' | 'missing';
}

// Simulate user skills fetch
const simulateUserSkillsFetch = (): Promise<UserSkill[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUserSkills: UserSkill[] = [
        { name: 'Java', level: 'Advanced', experience: 24 },
        { name: 'Python', level: 'Intermediate', experience: 18 },
        { name: 'Data Structures', level: 'Advanced', experience: 20 },
        { name: 'Algorithms', level: 'Intermediate', experience: 15 },
        { name: 'Git', level: 'Advanced', experience: 30 },
        { name: 'React', level: 'Intermediate', experience: 12 },
        { name: 'JavaScript', level: 'Advanced', experience: 22 },
        { name: 'Node.js', level: 'Beginner', experience: 6 },
        { name: 'MongoDB', level: 'Intermediate', experience: 10 },
        { name: 'Linux', level: 'Intermediate', experience: 16 }
      ];
      resolve(mockUserSkills);
    }, 1500); // Simulate API delay
  });
};

const SkillMatcher: React.FC<SkillMatcherProps> = ({ 
  isOpen, 
  onClose, 
  requiredSkills, 
  jobTitle, 
  company 
}) => {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [skillAnalysis, setSkillAnalysis] = useState<SkillAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [recommendation, setRecommendation] = useState('');

  const fetchUserSkills = async () => {
    setLoading(true);
    try {
      const skills = await simulateUserSkillsFetch();
      setUserSkills(skills);
    } catch (error) {
      console.error('Error fetching user skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchPercentage = useCallback((analysis: SkillAnalysis[]) => {
    const totalRequired = analysis.length;
    if (totalRequired === 0) {
      setMatchPercentage(0);
      return;
    }

    let score = 0;
    analysis.forEach(skill => {
      if (skill.match === 'perfect') {
        score += 1;
      } else if (skill.match === 'partial') {
        score += 0.7;
      }
      // missing skills add 0
    });

    const percentage = Math.round((score / totalRequired) * 100);
    setMatchPercentage(percentage);
  }, []);

  const generateRecommendation = useCallback((analysis: SkillAnalysis[], percentage: number) => {
    const missingSkills = analysis.filter(skill => skill.match === 'missing');
    const partialSkills = analysis.filter(skill => skill.match === 'partial');
    const perfectSkills = analysis.filter(skill => skill.match === 'perfect');

    let rec = '';
    
    if (percentage >= 80) {
      rec = `Excellent match! You have strong skills aligned with this position. Your expertise in ${perfectSkills.map(s => s.skill).join(', ')} makes you a strong candidate.`;
    } else if (percentage >= 60) {
      rec = `Good match! You have most of the required skills. Consider strengthening your knowledge in ${partialSkills.map(s => s.skill).join(', ')}`;
      if (missingSkills.length > 0) {
        rec += ` and learning ${missingSkills.slice(0, 2).map(s => s.skill).join(', ')}.`;
      } else {
        rec += '.';
      }
    } else {
      rec = `You have potential! Focus on developing skills in ${missingSkills.slice(0, 3).map(s => s.skill).join(', ')}`;
      if (partialSkills.length > 0) {
        rec += ` and improving your ${partialSkills[0].skill} expertise.`;
      } else {
        rec += ' to better match this role.';
      }
    }

    setRecommendation(rec);
  }, []);

  const analyzeSkills = useCallback(() => {
    const analysis: SkillAnalysis[] = [];
    
    // Normalize skill names for better matching
    const normalizeSkill = (skill: string) => skill.toLowerCase().trim();
    const userSkillsMap = new Map(
      userSkills.map(skill => [normalizeSkill(skill.name), skill])
    );

    // Analyze required skills
    requiredSkills.forEach(requiredSkill => {
      const normalizedRequired = normalizeSkill(requiredSkill);
      const userSkill = userSkillsMap.get(normalizedRequired);
      
      if (userSkill) {
        // Determine match quality based on skill level
        let match: 'perfect' | 'partial' | 'missing' = 'partial';
        if (userSkill.level === 'Advanced' || userSkill.level === 'Expert') {
          match = 'perfect';
        } else if (userSkill.level === 'Intermediate') {
          match = 'partial';
        }
        
        analysis.push({
          skill: requiredSkill,
          required: true,
          userHas: true,
          userLevel: userSkill.level,
          match
        });
      } else {
        analysis.push({
          skill: requiredSkill,
          required: true,
          userHas: false,
          match: 'missing'
        });
      }
    });

    setSkillAnalysis(analysis);
    calculateMatchPercentage(analysis);
    generateRecommendation(analysis, matchPercentage);
  }, [userSkills, requiredSkills, calculateMatchPercentage, generateRecommendation, matchPercentage]);

  useEffect(() => {
    if (isOpen && userSkills.length === 0) {
      fetchUserSkills();
    }
  }, [isOpen, userSkills.length]);

  useEffect(() => {
    if (userSkills.length > 0) {
      analyzeSkills();
    }
  }, [userSkills, requiredSkills, analyzeSkills]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 border-green-200';
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getSkillIcon = (match: string) => {
    switch (match) {
      case 'perfect':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <X className="w-4 h-4 text-red-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Skill Matcher</h2>
              <p className="text-sm text-gray-600">{jobTitle} at {company}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your skills...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Match Score */}
              <div className={`p-6 rounded-lg border-2 ${getMatchBgColor(matchPercentage)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className={`w-6 h-6 ${getMatchColor(matchPercentage)}`} />
                    <h3 className="text-lg font-semibold text-gray-900">Match Score</h3>
                  </div>
                  <div className={`text-3xl font-bold ${getMatchColor(matchPercentage)}`}>
                    {matchPercentage}%
                  </div>
                </div>
                <p className="text-gray-700">{recommendation}</p>
              </div>

              {/* Skill Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Required Skills Analysis */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    Required Skills Analysis
                  </h4>
                  <div className="space-y-3">
                    {skillAnalysis.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          {getSkillIcon(skill.match)}
                          <div>
                            <span className="font-medium text-gray-900">{skill.skill}</span>
                            {skill.userLevel && (
                              <span className="text-xs text-gray-500 ml-2">({skill.userLevel})</span>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          skill.match === 'perfect' ? 'bg-green-100 text-green-800' :
                          skill.match === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {skill.match === 'perfect' ? 'Expert' :
                           skill.match === 'partial' ? 'Partial' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Skills */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 text-green-600 mr-2" />
                    Your Skills Profile
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {userSkills.map((skill, index) => {
                      const isRequired = requiredSkills.some(req => 
                        req.toLowerCase() === skill.name.toLowerCase()
                      );
                      return (
                        <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                          isRequired ? 'bg-blue-50 border border-blue-200' : 'bg-white'
                        }`}>
                          <div className="flex items-center space-x-2">
                            {isRequired && <Zap className="w-3 h-3 text-blue-600" />}
                            <span className={`text-sm ${isRequired ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              skill.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                              skill.level === 'Advanced' ? 'bg-green-100 text-green-800' :
                              skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {skill.level}
                            </span>
                            <span className="text-xs text-gray-500">
                              {skill.experience}mo
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h4>
                <div className="space-y-2">
                  {matchPercentage >= 80 ? (
                    <p className="text-blue-800">🎉 You&apos;re ready to apply! Your skills are well-aligned with this role.</p>
                  ) : matchPercentage >= 60 ? (
                    <div className="text-blue-800">
                      <p>💪 You&apos;re a good candidate! Consider:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Highlighting your strongest skills in your application</li>
                        <li>Taking online courses for missing skills</li>
                        <li>Building projects to demonstrate your abilities</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="text-blue-800">
                      <p>📚 Focus on skill development:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Prioritize learning the most critical missing skills</li>
                        <li>Consider internships or projects in these areas</li>
                        <li>Join coding bootcamps or online courses</li>
                        <li>Apply to similar but more junior positions</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                // This could navigate to skill development resources
                alert('Redirecting to skill development resources...');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
            >
              Improve Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatcher;
