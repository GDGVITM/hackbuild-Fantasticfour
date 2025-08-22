export interface TimeSlot {
    time: string;
    subject?: string;
    room?: string;
    teacher?: string;
    type?: 'class' | 'break' | 'free' | 'exam' | 'lab';
  }
  
  export const SAMPLE_TIMETABLE: { [key: string]: TimeSlot[] } = {
    Monday: [
      { time: '9:00 AM', subject: 'Advanced Mathematics', room: 'Room 101', teacher: 'Dr. Smith', type: 'class' },
      { time: '10:30 AM', subject: 'Physics Lab', room: 'Physics Lab 2', teacher: 'Prof. Johnson', type: 'lab' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'English Literature', room: 'Room 205', teacher: 'Ms. Davis', type: 'class' },
      { time: '2:30 PM', subject: 'Chemistry Practical', room: 'Chemistry Lab 1', teacher: 'Dr. Wilson', type: 'lab' },
      { time: '4:00 PM', subject: 'Study Period', room: 'Library', type: 'free' },
    ],
    Tuesday: [
      { time: '9:00 AM', subject: 'World History', room: 'Room 102', teacher: 'Mr. Brown', type: 'class' },
      { time: '10:30 AM', subject: 'Biology', room: 'Biology Lab 3', teacher: 'Dr. Taylor', type: 'class' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'Digital Art', room: 'Computer Lab A', teacher: 'Ms. Garcia', type: 'lab' },
      { time: '2:30 PM', subject: 'Physical Education', room: 'Main Gymnasium', teacher: 'Coach Miller', type: 'class' },
      { time: '4:00 PM', subject: 'Basketball Practice', room: 'Outdoor Court', teacher: 'Coach Miller', type: 'free' },
    ],
    Wednesday: [
      { time: '9:00 AM', subject: 'Computer Science', room: 'Tech Lab 4', teacher: 'Mr. Lee', type: 'lab' },
      { time: '10:30 AM', subject: 'Calculus', room: 'Room 101', teacher: 'Dr. Smith', type: 'class' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'Geography', room: 'Room 203', teacher: 'Ms. Anderson', type: 'class' },
      { time: '2:30 PM', subject: 'Music Theory', room: 'Music Studio', teacher: 'Mr. Thompson', type: 'class' },
      { time: '4:00 PM', subject: 'Band Practice', room: 'Music Hall', teacher: 'Mr. Thompson', type: 'free' },
    ],
    Thursday: [
      { time: '9:00 AM', subject: 'Literature Analysis', room: 'Room 206', teacher: 'Ms. White', type: 'class' },
      { time: '10:30 AM', subject: 'Physics Exam', room: 'Exam Hall A', teacher: 'Prof. Johnson', type: 'exam' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'Spanish Conversation', room: 'Language Lab', teacher: 'Señora Martinez', type: 'class' },
      { time: '2:30 PM', subject: 'Study Hall', room: 'Main Library', type: 'free' },
    ],
    Friday: [
      { time: '9:00 AM', subject: 'Psychology', room: 'Room 104', teacher: 'Dr. Clark', type: 'class' },
      { time: '10:30 AM', subject: 'Organic Chemistry', room: 'Advanced Lab', teacher: 'Dr. Wilson', type: 'lab' },
      { time: '12:00 PM', subject: 'Lunch Break', type: 'break' },
      { time: '1:00 PM', subject: 'Theater Arts', room: 'Main Theater', teacher: 'Ms. Roberts', type: 'class' },
      { time: '2:30 PM', subject: 'Free Period', type: 'free' },
    ],
    Saturday: [
      { time: '10:00 AM', subject: 'SAT Prep Class', room: 'Room 105', teacher: 'Various Teachers', type: 'exam' },
      { time: '12:00 PM', subject: 'Sports Activities', room: 'Athletic Field', teacher: 'Coach Miller', type: 'free' },
      { time: '2:00 PM', subject: 'Club Activities', room: 'Various Rooms', type: 'free' },
    ],
    Sunday: [
      { time: 'All Day', subject: 'Rest & Recreation', type: 'free' },
    ],
  };
  
  export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  