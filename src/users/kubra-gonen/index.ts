import { ArtProps } from "../../components/Drawing/types";
import { ExperienceProps } from "../../components/Experiences/types";
import { Language } from "../../components/SideMenu/types";

import { Skill } from "../../components/SideMenu/types";

import { Education } from "../../components/SideMenu/types";
import { SocialMediaProps } from "../../types/social-media";
import { UserProps } from "../../types/user";
import linkedinIcon from "../../assets/linkedin.png";
import instagramIcon from "../../assets/instagram.png";
import gmailIcon from "../../assets/gmail.png";

import jinx from "../../assets/jinx.jpg";
import barrels from "../../assets/barrels.png";
import randomPeople from "../../assets/random-people.png";
import trees from "../../assets/trees.webp";
import turkishWithFez from "../../assets/turkish_with_fez.jpg";
import turkish from "../../assets/turkish.webp";
import characterDesign from "../../assets/character_design.png";
import characterDesign2 from "../../assets/character_design_2.png";

export const education: Education[] = [
  {
    school: "Hacettepe University",
    degree: "Bachelor in Sculpture",
    period: "2021 - Present",
  },
];

export const skills: Skill[] = [
  { name: "Photoshop", level: 90 },
  { name: "Illustrator", level: 85 },
  { name: "Procreate", level: 95 },
  { name: "Character Design", level: 90 },
];

export const languages: Language[] = [
  { name: "English", level: "Fluent" },
  { name: "Portuguese", level: "Basic" },
  { name: "Turkish", level: "Native" },
];

export const experiences: ExperienceProps[] = [
  {
    company: "Masterpiece",
    title: "Sculpture Workshop Instructor",
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 7, 1),
    bulletPoints: [
      "I taught sculpture workshops to children and adults. I also helped them to create their own sculptures.",
    ],
    iconCompany: "iconCompany 1",
  },

  {
    company: "Freelancer",
    title: "Freelance Designer",
    startDate: new Date(2019, 0, 1),
    bulletPoints: [
      "5 Years of experience",
      "Designed characters and mascots for various projects.",
      "Created concepts and animations for NFT projects.",
    ],
    iconCompany: "iconCompany 2",
  },
  {
    company: "Stak games",
    title: "2D Concept Artist",
    startDate: new Date(2023, 10, 1),
    endDate: new Date(2024, 3, 1),
    bulletPoints: [
      "Contributed to character and environment design in game projects",
    ],
    iconCompany: "iconCompany 3",
  },
];

export const socialMedia: SocialMediaProps[] = [
  {
    label: "Linkedin",
    url: "https://www.linkedin.com/in/k%C3%BCbra-g%C3%B6nen-477169220/",
    icon: linkedinIcon,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/kbragnn/",
    icon: instagramIcon,
  },
  {
    label: "Email",
    url: "mailto:kubragnn.0@gmail.com",
    icon: gmailIcon,
  },
];

export const user: UserProps = {
  name: "Kübra Gönen",
  role: "Game Artist",
  email: "kubragnn.0@gmail.com",
  phone: "+90 532 123 45 67",
  address: "123 Main St, Anytown, USA",
  city: "Anytown",
  description: `
  I am a final-year Sculpture student at Hacettepe University with over five years of freelance experience in character design, mascots, NFTs, and 2D game design. I am proficient in Photoshop, Illustrator, and Procreate. I have contributed to various game and NFT projects. I enjoy combining traditional and digital techniques to bring creative ideas to life. I have intermediate proficiency in English and basic knowledge of Portuguese. Art, design, and continuous learning are my greatest passions.
  `,
};

export const drawings: ArtProps[] = [
  {
    image: characterDesign,
  },
  {
    image: characterDesign2,
  },
  {
    image: turkishWithFez,
  },
  {
    image: turkish,
  },
  {
    image: jinx,
  },
  {
    image: barrels,
  },
  {
    image: randomPeople,
  },

  {
    image: trees,
  }
];
