import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock, BookOpen, Calendar } from "lucide-react";

declare global {
  interface Window {
    gapi: any;
  }
}

interface Assignment {
  course: string;
  title: string;
  due: Date;
  description?: string;
}

interface UpcomingAssignmentsProps {
  gapi: any;
}

export default function UpcomingAssignments({ gapi }: UpcomingAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true);
        setError(null);
        
        const coursesResp = await gapi.client.classroom.courses.list({
          courseStates: ['ACTIVE']
        });
        const courses = coursesResp.result.courses || [];

        let allAssignments: Assignment[] = [];

        for (let course of courses) {
          try {
            const cwResp = await gapi.client.classroom.courses.courseWork.list({
              courseId: course.id,
            });
            const courseWork = cwResp.result.courseWork || [];

            for (let work of courseWork) {
              if (work.dueDate) {
                const due = new Date(
                  work.dueDate.year,
                  work.dueDate.month - 1,
                  work.dueDate.day,
                  work.dueTime?.hours || 23,
                  work.dueTime?.minutes || 59
                );
                
                // Only include future assignments
                if (due >= new Date()) {
                  allAssignments.push({
                    course: course.name,
                    title: work.title,
                    due,
                    description: work.description || '',
                  });
                }
              }
            }
          } catch (courseError) {
            console.warn(`Error fetching assignments for course ${course.name}:`, courseError);
          }
        }

        // Sort by due date (earliest first)
        allAssignments.sort((a, b) => a.due.getTime() - b.due.getTime());
        setAssignments(allAssignments);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to fetch assignments from Google Classroom");
      } finally {
        setLoading(false);
      }
    }

    if (gapi) {
      fetchAssignments();
    }
  }, [gapi]);

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (daysLeft: number) => {
    if (daysLeft <= 1) return 'bg-red-500';
    if (daysLeft <= 3) return 'bg-orange-500';
    if (daysLeft <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d77] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-green-500 text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
          <p className="text-gray-600">No upcoming assignments found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment, index) => {
        const daysLeft = getDaysUntilDue(assignment.due);
        
        return (
          <Card key={index} className="shadow-lg rounded-2xl border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" style={{ color: '#006d77' }} />
                  <span className="text-sm font-medium text-gray-600">{assignment.course}</span>
                </div>
                <span 
                  className={`px-2 py-1 text-xs font-bold text-white rounded-lg ${getPriorityColor(daysLeft)}`}
                >
                  {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days`}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                {assignment.title}
              </h3>
              
              {assignment.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {assignment.description}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-3">{format(assignment.due, "MMM dd, yyyy")}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{format(assignment.due, "hh:mm a")}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
