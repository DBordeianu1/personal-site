export type Award = {
  name: string;
  date: string;
  givenBy: string;
  description?: string;
  url?: string;
  thumbnailSrc?: string; // place images in public/awards/ e.g. /awards/apar.jpg
};

export const awards: Award[] = [
  {
    name: "University of Ottawa Active and Retired Administrative Staff Scholarship",
    date: "January 2026",
    givenBy: "University of Ottawa",
    description:
      "Scholarship awarded for bilingual proficiency in English and French as well as academic excellence.",
    url: "https://apar-asra.ca/our-scholarships/recipients",
    thumbnailSrc: "/awards/apar-asra.png",
  },
  {
    name: "Association of Professors Retired from the University of Ottawa Scholarship Fund",
    date: "January 2026",
    givenBy: "University of Ottawa",
    description:
      "Awarded in support of academic pursuit and continued professional/educational development.",
  },
  {
    name: "3x Dean's Honour List Recipient",
    date: "Fall 2025, Winter 2025, Fall 2024",
    givenBy: "Faculty of Engineering, University of Ottawa",
  },
  {
    name: "Admission's Scholarship",
    date: "September 2024",
    givenBy: "University of Ottawa",
    description:
      "Merit-based entrance scholarship for achieving an admission average between 95-100%.",
  },
  {
    name: "Renewable French Studies Bursary",
    date: "September 2024",
    givenBy: "University of Ottawa",
    description:
      "Renewable bursary awarded for continued academic rigour and commitment to bilingualism.",
  },
  {
    name: "4x Honours Award",
    date: "June of 2024, 2023, 2022, 2021",
    givenBy: "Collège Saint-Alexandre de la Gatineau",
    description:
      "Four-time recipient of the Honours Award, recognizing exceptional performance across all disciplines, including STEM, history, and linguistics.",
  },
  {
    name: "Published by Le Droit journal",
    date: "December 2023",
    givenBy: "Le Droit",
    description: `Published author in "Le Droit" journal for the philosophical essay "La notion de temps", exploring the impact of social comparison on personal potential. Awarded through the "La Plume Étudiante de l'Outaouais" competition.`,
    url: "https://www.ledroit.com/la-vitrine/la-plume-etudiante-de-loutaouais/2023/12/20/la-notion-de-temps-D23PH4GV3BES3L4JUFKOFGXEHI/",
    thumbnailSrc: "/awards/empire-state-building.jpg",
  },
  {
    name: "Math Level J Completion Award",
    date: "November 2023",
    givenBy: "Kumon Canada",
    description:
      "Awarded for the successful completion of Kumon Math Level J, demonstrating advanced proficiency in algebra and complex mathematical concepts.",
  },
  {
    name: "2x Excellence Award",
    date: "June of 2023, 2022",
    givenBy: "Collège Saint-Alexandre de la Gatineau",
    description:
      "Two-time recipient of the Excellence Award, recognized for maintaining excellent academic averages, a dedicated work ethic, and a continued commitment to learning.",
  },
  {
    name: "Third Place in the 2022 Quebec Online Team Regional Contest",
    date: "April 2022",
    givenBy: "Poetry In Voice",
    description:
      "Secured third place in a provincial team-based competition, demonstrating collaborative excellence and high-level proficiency in expressive communication.",
    url: "https://poetryinvoice.ca/recite/team-regionals/2022",
  },
];
