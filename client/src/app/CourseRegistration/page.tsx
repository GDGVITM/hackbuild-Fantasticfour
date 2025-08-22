"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, User, CheckCircle, Award } from "lucide-react";

const dummyStudent = {
  id: "S12345",
  name: "Vaishvi Khandelwal",
  courses: [
    { code: "CS101", name: "Data Structures", professor: "Dr. Emily Rodriguez", credits: 4 },
    { code: "CS202", name: "Operating Systems", professor: "Prof. Michael Chen", credits: 3 },
    { code: "CS303", name: "Database Management", professor: "Dr. Sarah Williams", credits: 3 },
  ],
};

export default function CourseRegistrationPage() {
  const handleRegisterAll = () => {
    // For now, just log to console
    console.log("Registered for all courses:", dummyStudent.courses);
    alert(`Successfully registered for ${dummyStudent.courses.length} courses!`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #edf6f9 0%, #83c5be 50%, #006d77 100%)' }}>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 sm:p-3 md:p-40 -right-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#ffddd2' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20" 
             style={{ backgroundColor: '#e29578' }}></div>
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full opacity-15" 
             style={{ backgroundColor: '#83c5be' }}></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-8 z-10">
        <div className="flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
          <div className="p-3 rounded-full mr-3" style={{ backgroundColor: '#006d77' }}>
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold" style={{ color: '#006d77' }}>
            Course Registration
          </h1>
        </div>
        <p className="text-lg opacity-80" style={{ color: '#006d77' }}>
          Register for your upcoming semester courses
        </p>
      </div>

      {/* Main Registration Card */}
      <Card className="w-full max-w-2xl shadow-2xl border-0 z-10" 
            style={{ backgroundColor: '#ffddd2' }}>
        <CardContent className="p-4 sm:p-6 md:p-8">
          
          {/* Student Info Section */}
          <div className="flex items-center mb-8 p-2 sm:p-3 md:p-4 rounded-lg" 
               style={{ backgroundColor: '#edf6f9' }}>
            <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#83c5be' }}>
              <User className="w-6 h-6" style={{ color: '#006d77' }} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#006d77' }}>
                {dummyStudent.name}
              </h2>
              <p className="text-lg opacity-75" style={{ color: '#006d77' }}>
                Student ID: {dummyStudent.id}
              </p>
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-8">
            <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
              <BookOpen className="w-6 h-6 mr-3" style={{ color: '#006d77' }} />
              <h3 className="text-xl font-semibold" style={{ color: '#006d77' }}>
                Courses to Register ({dummyStudent.courses.length})
              </h3>
            </div>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {dummyStudent.courses.map((course, index) => (
                <div key={course.code} 
                     className="flex items-center justify-between p-2 sm:p-3 md:p-4 rounded-lg border-2 border-opacity-30 transition-all duration-300 hover:shadow-md hover:scale-[1.02]" 
                     style={{ 
                       backgroundColor: '#edf6f9',
                       borderColor: '#83c5be'
                     }}>
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold text-white flex-shrink-0"
                         style={{ backgroundColor: '#e29578' }}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg" style={{ color: '#006d77' }}>
                        {course.code} — {course.name}
                      </h4>
                      <p className="opacity-75 text-sm mb-1" style={{ color: '#006d77' }}>
                        Professor: {course.professor}
                      </p>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" style={{ color: '#e29578' }} />
                        <p className="text-sm font-medium" style={{ color: '#006d77' }}>
                          {course.credits} Credits
                        </p>
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="w-6 h-6 flex-shrink-0 ml-3" style={{ color: '#83c5be' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Registration Summary */}
          <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg text-center" 
               style={{ backgroundColor: '#83c5be' }}>
            <p className="text-lg font-medium text-white">
              Total Credit Hours: {dummyStudent.courses.reduce((total, course) => total + course.credits, 0)} | 
              Registration Fee: Rs {dummyStudent.courses.reduce((total, course) => total + course.credits, 0) * 15}
            </p>
          </div>

          {/* Register Button */}
          <Button 
            className="w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-0" 
            onClick={handleRegisterAll}
            style={{ 
              backgroundColor: '#006d77', 
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004d57';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006d77';
            }}>
            <GraduationCap className="w-5 h-5 mr-2" />
            Register for All Courses
          </Button>

          {/* Footer Note */}
          <p className="text-center mt-4 text-sm opacity-70" style={{ color: '#006d77' }}>
            Registration deadline: December 15, 2024
          </p>
        </CardContent>
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:p-3 md:p-4 mt-6 w-full max-w-2xl z-10">
        <Card className="border-0 shadow-lg" style={{ backgroundColor: '#e29578' }}>
          <CardContent className="p-2 sm:p-3 md:p-4 text-center">
            <h4 className="font-semibold text-white mb-2">Academic Advisor</h4>
            <p className="text-white opacity-90">Dr. Sarah Johnson</p>
            <p className="text-white opacity-75 text-sm">Office: CS-204</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg" style={{ backgroundColor: '#83c5be' }}>
          <CardContent className="p-2 sm:p-3 md:p-4 text-center">
            <h4 className="font-semibold text-white mb-2">Semester</h4>
            <p className="text-white opacity-90">Odd 2025</p>
            <p className="text-white opacity-75 text-sm">Jan 15 - May 10</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}