export type Project = {
  name: string;
  tagline: string;
  description?: string; // longer text shown only on the featured card
  date: string;         // "YYYY-MM" — used for sorting only
  period: string;       // human-readable date range e.g. "Nov 2025 – Present"
  featured: boolean;    // exactly one project should be featured
  imageSrc?: string;    // thumbnail used on grid cards
  images?: string[];    // slideshow images for the featured card
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
  name: "CloudGarden",
  tagline: "A Cloud-Native Simulation of Resource Lifecycle Management",
  description: `Models plant health as if they were cloud resources: they have state transitions, background schedulers monitoring them, and can enter "service failure" states if neglected.`, 
  date: "2026-05",         
  period: "November 2025 – Present",    
  featured: true,    
  imageSrc: "/projects/cloud-garden-empty.png",
  images: ["/projects/cloud-garden-empty.png", "/projects/cloud-garden-plant.png", "/projects/cloud-garden.png", "/projects/cloud-garden-remove.png", "/projects/cloud-garden-update.png"],
  techStack: [ "Java 17", "Spring Boot", "React", "Docker", "Kubernetes (Minikube)", "Claude Code"],
  githubUrl: "https://github.com/DBordeianu1/CloudGarden",
  },
  {
  name: "room4u",
  tagline: "An E-Hotel Management Service",
  description: `It is a web-based hotel management platform that allows customers to search and book available rooms across hotels in North America. It enables employees to manage bookings and handle walk-in rentals.`,
  date: "2026-04",         
  period: "January 2026 – April 2026",    
  featured: false,     
  techStack: ["PostgreSQL", "Java 17", "HTLM/CSS", "Apache Maven & Tomcat", "IntelliJ", "Python", "Git"],
  githubUrl: "https://github.com/DBordeianu1/room4u",
  },
  {
  name: "StableMarriage",
  tagline: "A comparative implementation of the Stable Marriage problem across four programming paradigms",
  description: `Explores how language design shapes problem-solving approaches. The implementations use the Gale-Shapley and McVitie-Wilson algorithms.`,
  date: "2026-03",         
  period: "January 2026 – April 2026",    
  featured: false,  
  techStack: ["Java", "Go", "Scheme", "Prolog"],
  githubUrl: "https://github.com/DBordeianu1/StableMarriageProblem",
  },
  {
  name: "Online Management Tutoring System",
  tagline: "An Online Tutoring Appointment Management System (OTAMS)",
  description: `Supports three user-roles: Student, Tutor, and Administrator, each with distinct permissions and views, requiring role-based access control and real-time data synchronization across users.`,
  date: "2025-12",         
  period: "September 2025 – December 2025",    
  featured: false,    
  techStack: [ "Java", "Firebase (Auth & Realtime DB)", "XML", "Git"],
  githubUrl: "https://github.com/uOttawaSEG/project-group-4",
  },
  {
  name: "simpleChat",
  tagline: "A chat application, which uses the OCSF Java Framework",
  description: `Implements real-time message broadcasting and command-based control for both client and server consoles.`,
  date: "2025-11",         
  period: "November 2025",    
  featured: false,  
  techStack: ["Java", "OCSF", "Socket Programming", "Multi-threading"],
  githubUrl: "https://github.com/DBordeianu1/simpleChat",
  },
   {
  name: "Data Path Unit Design (Hardware)",
  tagline: "A 4-bit data path unit integrating an Arithmetic Logic Unit (ALU) and a status register circuit",
  description: ` Functionality tested through waveform simulation/analysis and by loading the project onto the Altera DE2-115 FPGA. `,
  date: "2025-10",         
  period: "October 2025 – November 2025",    
  featured: false,  
  techStack: ["Quartus II", "FPGA"],
  },
];
