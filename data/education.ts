export type Education = {
  institution: string;
  degree: string;
  years: string;
  date: string; // YYYY-MM for sorting (start date, descending)
  gpa?: { value: string; outOf: string };
  courses?: string[];
  logoSrc?: string;
  url?: string;
};

export const educations: Education[] = [
  {
    institution: "University of Ottawa",
    degree: "B.Sc. Computer Science (Co-op)",
    years: "2024 – Present",
    date: "2028-09",
    gpa: { value: "9.87", outOf: "10" },
    courses: [
      "Discrete Mathematics",
      "Data Structures and Algorithms",
      "Software Engineering",
      "Computer Architecture I",
      "Discrete Structures",
      "Databases I",
      "Programming Paradigms",
    ],
    logoSrc: "/education/uottawa.png",
    url: "https://www.uottawa.ca",
  },
  {
    institution: "Collège Saint-Alexandre de la Gatineau",
    degree: "High School Diploma",
    years: "2019 – 2024",
    date: "2024-06",
    gpa: { value: "95", outOf: "100" },
    courses: ["Enriched Mathematics, Physics, and Chemistry"],
    logoSrc: "/education/csa.png",
    url: "https://st-alex.ca/",
  },
];
