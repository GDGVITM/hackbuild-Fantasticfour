"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock, BookOpen, Calendar } from "lucide-react";

interface Assignment {
  course: string;
  title: string;
  due: string; // Changed from Date to string since it comes from API
  description?: string;
}

interface UpcomingAssignmentsProps {
  accessToken: string | null; // Changed from gapi to accessToken
}

export default function UpcomingAssignments({ accessToken }: UpcomingAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true);
        setError(null);
        
        if (!accessToken) {
          setError("No access token available");
          setLoading(false);
          return;
        }

        const response = await fetch('https://fantasticfour.onrender.com/classroom/assignments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setAssignments(data.assignments || []);
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to fetch assignments from Google Classroom");
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchAssignments();
    }
  }, [accessToken]);

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d77] mx-auto mb-2 sm:mb-3 md:mb-4"></div>
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
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg p-4 sm:p-6 md:p-8 max-w-md mx-auto">
          <div className="text-green-500 text-4xl mb-2 sm:mb-3 md:mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
          <p className="text-gray-600">No upcoming assignments found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:p-3 md:p-4 md:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment, index) => {
        const daysLeft = getDaysUntilDue(assignment.due);
        
        return (
          <Card key={index} className="shadow-lg rounded-lg sm:rounded-xl md:rounded-2xlborder-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
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
                <p className="text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                  {assignment.description}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-3">{format(new Date(assignment.due), "MMM dd, yyyy")}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{format(new Date(assignment.due), "hh:mm a")}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}