

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
declare global {
  interface Window {
    gapi: any;
  }
}


export default function UpcomingAssignments({ gapi }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const coursesResp = await gapi.client.classroom.courses.list();
        const courses = coursesResp.result.courses || [];

        let allAssignments = [];

        for (let course of courses) {
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
                work.dueTime?.hours || 0,
                work.dueTime?.minutes || 0
              );
              if (due >= new Date()) {
                allAssignments.push({
                  course: course.name,
                  title: work.title,
                  due,
                });
              }
            }
          }
        }

        allAssignments.sort((a, b) => a.due - b.due);
        setAssignments(allAssignments);
      } catch (err) {
        console.error("Error fetching assignments", err);
      }
    }

    fetchAssignments();
  }, [gapi]);

  return (
    <div className="grid gap-4 p-4">
      {assignments.map((a, i) => (
        <Card key={i} className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-600">{a.course}</p>
            <p className="text-sm text-red-500">
              Due: {format(a.due, "dd MMM yyyy, hh:mm a")}
            </p>
          </CardContent>
        </Card>
      ))}
      {assignments.length === 0 && (
        <p className="text-center text-gray-500">No upcoming assignments 🎉</p>
      )}
    </div>
  );
}
