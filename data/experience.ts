export type Experience = {
  title: string;
  org: string;
  location?: string;
  period: string;
  date: string; // YYYY-MM for sorting
  description: string[];
  category: "work" | "community";
  skills: string[];
};

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    org: "Centre for Entrepreneurship and Engineering Design (CEED)",
    location: "Ottawa, ON",
    period: "September 2026 – Present",
    date: "2026-05",
    description:
      [],
    category: "work",skills: [],
    
  },
  {
    title: "Software Developer Co-op",
    org: "Solace",
    location: "Kanata, ON",
    period: "May 2026 – August 2026",
    date: "2026-05",
    description: 
      ["Led a Spring Boot 4 migration across 2 Java microservices (125 files), resolving breaking changes related to exception handling.","Developed in 2 weeks a full-stack feature that lets the Support team (30+ people) manage Datadog users themselves, replacing ticket filing.", "Built 5 internal Claude Code skills, including a statusline script adopted org-wide."],
    category: "work",skills: ["Spring Boot", "Datadog", "Kubernetes", "Claude Code"],
    
  },
  {
    title: "Government Financial Aid and Awards Clerk",
    org: "University of Ottawa",
    location: "Ottawa, ON",
    period: "May 2025 – April 2026",
    date: "2025-05",
    description:
      ["Managed 1,600+ complex student inquiries, performed scholarship data entry, and analyzed government financial aid applications."],
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
      ["Created individualized strategies for 100+ students based on goals, requiring strong communication and organizational skills."],
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
      ["Elected with 81% of the vote, secured 3 tech partnerships ($1,900 in funding), and partnered with 2 local restaurants, serving as the primary liaison between the CSSA and external entities."],
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
      ["Supported incoming students in integrating the university, shared resources, and cooperated with the guide and executive team of the CSSA."],
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
      ["Raised $13.5k through daily cafe operations at the Collège Saint-Alexandre student cafe."],
    category: "community",
    skills: ["Fundraising", "Teamwork", "Community Outreach"],
  },
];
