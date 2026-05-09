export type Experience = {
  title: string;
  org: string;
  location?: string;
  period: string;
  date: string; // YYYY-MM for sorting
  description: string;
  category: "work" | "community";
  skills: string[];
};

export const experiences: Experience[] = [
  {
    title: "Software Developer Co-op",
    org: "Solace",
    location: "Kanata, ON",
    period: "May 2026 – Present",
    date: "2026-05",
    description:
      "Incoming",
    category: "work",skills: ["TBD"],
    
  },
  {
    title: "Government Financial Aid and Awards Clerk",
    org: "University of Ottawa",
    location: "Ottawa, ON",
    period: "May 2025 – April 2026",
    date: "2025-05",
    description:
      "Managed 1,600+ complex student inquiries, performed scholarship data entry, and analyzed government financial aid applications",
    category: "work",
    skills: ["Problem Solving", "Student Affairs", "Time Management", "Customer Service"],
  },
  {
    title: "Teaching Assistant and Tutor (Mathematics and English)",
    org: "Kumon",
    location: "Gatineau, QC",
    period: "September 2022 – June 2024",
    date: "2024-06",
    description:
      "Created individualized strategies for 100+ students based on goals, requiring strong communication and organizational skills",
    category: "work",
    skills: ["Leadership", "Patience", "Communication", "Organization", "Customer Service"],
  },
  {
    title: "Vice President of External Affairs",
    org: "Computer Science Student Association (CSSA)",
    location: "University of Ottawa",
    period: "May 2026 – Present",
    date: "2026-03",
    description:
      "Elected with 81% of the vote, acted as a liaison between the CSSA and external entities/sub-associations, and managed external partnerships as well as industry relations for the CSSA",
    category: "community",
    skills: ["Leadership", "Partnerships", "Collaboration", "Adaptability"],
  },
  {
    title: "Orientation Guide-Mentor",
    org: "CSSA",
    location: "University of Ottawa",
    period: "August 2025 – September 2025",
    date: "2025-09",
    description:
      "Supported incoming students in integrating the university, shared online and on campus resources, and coordinated events and cooperated with the guide and executive team of the CSSA",
    category: "community",
    skills: ["Mentorship", "Collaboration", "Adaptability"],
  },
  {
    title: "Student Cafe Organizer and Fundraising Volunteer",
    org: "Agir Outaouais",
    location: "Collège Saint-Alexandre de la Gatineau",
    period: "September 2022 – June 2023",
    date: "2023-06",
    description:
      "Raised $13.5k through daily café operations at the Collège Saint-Alexandre student cafe",
    category: "community",
    skills: ["Fundraising", "Teamwork", "Community Outreach"],
  },
];
