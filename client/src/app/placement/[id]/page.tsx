import PlacementApplicationForm from './components/PlacementApplicationForm';

interface PlacementDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationDeadline: Date;
  contactEmail: string;
}

// Mock placement data - in real app, this would come from params/API
const mockPlacementData: PlacementDetails = {
  id: 'google-internship-2025',
  title: 'Software Engineer Internship',
  company: 'Google',
  location: 'Bangalore, India',
  type: 'Internship',
  salary: '₹80,000 - ₹1,20,000 per month',
  experience: 'Entry Level / Student',
  description: 'Join Google as a Software Engineering Intern and work on cutting-edge projects that impact billions of users worldwide. You will collaborate with experienced engineers and contribute to real products.',
  responsibilities: [
    'Develop and maintain software applications',
    'Participate in code reviews and design discussions',
    'Work closely with senior engineers and product managers',
    'Write clean, efficient, and well-documented code',
    'Contribute to open-source projects',
    'Present your work to stakeholders'
  ],
  requirements: [
    'Currently pursuing B.Tech/M.Tech in Computer Science or related field',
    'CGPA of 8.0 or above',
    'Strong programming skills in Java, Python, or C++',
    'Understanding of data structures and algorithms',
    'Familiarity with software development practices',
    'Excellent problem-solving abilities'
  ],
  skills: [
    'Java', 'Python', 'C++', 'Data Structures', 'Algorithms', 
    'System Design', 'Git', 'Linux', 'APIs', 'Databases'
  ],
  benefits: [
    'Competitive stipend',
    'Mentorship from senior engineers',
    'Access to Google\'s learning resources',
    'Networking opportunities',
    'Potential for full-time offer',
    'Free meals and transportation'
  ],
  applicationDeadline: new Date('2025-02-15'),
  contactEmail: 'placement@college.edu'
};

// Generate static params for static export
export async function generateStaticParams() {
  // Return an array of possible placement IDs for static generation
  // In a real app, this would fetch from your API or database
  return [
    { id: 'google-internship-2025' },
    { id: 'microsoft-sde-2025' },
    { id: 'amazon-internship-2025' },
    { id: 'netflix-backend-2025' },
    { id: 'meta-frontend-2025' }
  ];
}

export default function PlacementApplicationPage() {
  // In a real app, you would fetch placement data based on the id parameter
  // const placement = await fetchPlacementById(params.id);
  
  return <PlacementApplicationForm placementData={mockPlacementData} />;
}
