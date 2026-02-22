import { ExperienceProps } from "../../components/Experiences/types";
import { Language, SkillCategory } from "../../components/SideMenu/types";
import { Education } from "../../components/SideMenu/types";
import { SocialMediaProps } from "../../types/social-media";
import { UserProps } from "../../types/user";

export const education: Education[] = [
  {
    school: "Aerospace Engineering Institute (ITA)",
    degree: "Aeroespacial Engineering",
    period: "2020 - 2024",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages and related tools",
    skills: [
      { name: "Python", level: 90 },
      { name: "C/C++", level: 85 },
      { name: "C#", level: 80 },
      { name: "Javascript", level: 85 },
      { name: "SQL", level: 85 },
      { name: "R", level: 75 },
      { name: "Excel", level: 90 },
      { name: "Power BI", level: 85 },
      { name: "Golang", level: 90 },
      { name: "Rust", level: 70 },
      { name: "Typescript", level: 85 },
      { name: "TensorFlow", level: 80 },
    ],
  },
  {
    name: "Miscellaneous",
    skills: [
      { name: "Illustrator", level: 85 },
      { name: "After Effects", level: 80 },
      { name: "Premiere", level: 80 },
    ],
  },
];

export const languages: Language[] = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Intermediate" },
  { name: "Turkish", level: "Beginner" },
];

export const experiences: ExperienceProps[] = [
  {
    company: "Isaac",
    title: "Software Engineer I",
    startDate: new Date(2025, 0, 1), // January 2025
    bulletPoints: [],
    iconCompany: "iconCompany",
  },
  {
    company: "Isaac",
    title: "Associate Software Engineer",
    startDate: new Date(2024, 10, 1), // November 2024
    bulletPoints: [],
    iconCompany: "iconCompany",
  },
  {
    company: "Isaac",
    title: "Software Engineer Intern",
    startDate: new Date(2024, 3, 1), // April 2024
    endDate: new Date(2024, 10, 1), // November 2024
    bulletPoints: [
      "Credit FIDC API in Golang: Developed a Golang API to manage and support credit operations for the company's Credit FIDC, ensuring performance and scalability.",
      "React and TypeScript Platform: Implemented client-facing credit service interfaces using React and TypeScript, enhancing usability and user experience.",
      "Kubernetes Cronjobs with Humanitec: Designed and deployed cronjobs in Kubernetes for daily data storage tasks, leveraging Humanitec for streamlined operations.",
      "Design Patterns Implementation (Builders): Applied design patterns, such as Builders, to create test setups, simplifying test component configurations and improving code maintainability.",
      "Bug Investigation and Logging: Built logging systems and debugged issues using tools like Datadog and Metabase, creating dashboards for streamlined bug tracking and resolution.",
    ],
    iconCompany: "iconCompany",
  },
  {
    company: "Embraer",
    title: "Flight Operations Intern",
    startDate: new Date(2024, 0, 1), // January 2024
    endDate: new Date(2024, 2, 1), // March 2024
    bulletPoints: [
      "Python and Excel Integration: Automated aircraft performance checking processes by creating Python scripts integrated with Excel, enhancing accuracy and efficiency.",
      "Kotlin for Performance Analysis: Developed and utilized Kotlin scripts to measure and analyze aircraft performance, delivering reliable metrics for operational improvements.",
    ],
    iconCompany: "iconCompany",
  },
  {
    company: "Isaac",
    title: "Business Analytics Intern",
    startDate: new Date(2023, 2, 1), // March 2023
    endDate: new Date(2023, 11, 1), // December 2023
    bulletPoints: [
      "Pipefy Custom Forms: Designed personalized forms to streamline and accelerate the process of blocking schools and financial guardians in charge of payments.",
      "Dataform and BigQuery: Created and developed tables to prevent incorrect billing of financial guardians, ensuring data accuracy and operational efficiency.",
      "Dashboards with Metabase: Built dashboards using Metabase to visualize the status of financial guardians and schools regarding billing processes, improving transparency and decision-making.",
      "A/B Testing and Data Analysis with Python: Conducted A/B tests and performed data analyses using Python to evaluate the performance of billing platforms, driving informed improvements.",
    ],
    iconCompany: "iconCompany",
  },
  {
    company: "Navi Capital",
    title: "Data Science Intern",
    startDate: new Date(2023, 0, 1), // January 2023
    endDate: new Date(2023, 1, 1), // February 2023
    bulletPoints: [
      "REST API with FastAPI: Developed an API using FastAPI to process and extract information from Microsoft Project files, enabling task criticality visualization and analysis for solar panel project management.",
      "Interactive Interface with PyQt6: Built a real-time updating graphical interface using PyQt6, offering an intuitive and user-friendly experience for non-technical users.",
      "Interactive Dashboards: Created interactive dashboards with Streamlit, leveraging libraries like Plotly to visualize project progress and analyze task criticality.",
      "Custom Streamlit Components: Designed custom components in Streamlit, integrating advanced features with React-based elements to enhance dashboard interactivity and usability.",
    ],
    iconCompany: "iconCompany",
  },
];

export const extraActivities: ExperienceProps[] = [
  {
    company: "CASD - Curso Alberto Santos Dumont",
    title: "Executive Director",
    startDate: new Date(2021, 0, 1), // January 2021
    endDate: new Date(2022, 11, 31), // December 2022
    bulletPoints: [
      "Data Analysis with Power BI for Admissions: Leveraged Power BI to analyze data from previous selection processes for 8th and 9th-grade students, identifying schools and locations with the highest number of applicants. This targeted approach enabled the team to focus efforts effectively, achieving a record-breaking 2,200+ subscriptions.",
      "Automated spreadsheets using Google Script to streamline team metrics and OKR updates, as well as science olympiad research",
      "Built a WhatsApp bot to assist parents and guardians with questions about the course application process and program information",
      "Led team of Directors managing volunteer members for a community preparatory course serving 760 students.",
    ],
    iconCompany: "iconCompany",
  },
];

export const socialMedia: SocialMediaProps[] = [
  {
    label: "Github",
    url: "https://github.com/nauanelinhares",
    icon: "iconGithub",
  },
  {
    label: "Email",
    url: "mailto:nauane.linhares@gmail.com",
    icon: "iconEmail",
  },
  {
    label: "Linkedin",
    url: "https://www.linkedin.com/in/nauane-linhares-61ba7b204/",
    icon: "iconLinkedin",
  },
];

export const user: UserProps = {
  name: "Nauane Linhares",
  role: "Software Engineer",
  email: "nauane.linhares@gmail.com",
  phone: "+55 88 992507747",
  address: "Av. Andrômeda, 1589, Jardim Satélite",
  city: "SÃO JOSÉ DOS CAMPOS, SP",
  description: `
   I am an Aerospace Engineer passionate about education and technology. I have volunteered as a teacher 
   and managed a preparatory course for underprivileged students. In the technology field, I have worked 
   on machine learning projects, including developing an AI that identifies Brazilian states from Google 
   Street View images and a Deep Q-Network (DQN) AI that learns to play the Chrome Dino Game.
   
   I have experience with Golang, TypeScript, React, Python, and various data analysis tools. My work spans 
   from API development to data visualization and analysis.
   
   Interests: Challenges, Education, Machine Learning, Data Analysis, Software Engineering.
  `,
};
