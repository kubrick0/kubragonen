import { SocialMediaProps } from "../../types/social-media";

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Language {
  name: string;
  level: string;
}

export interface SideMenuProps {
  education: Education[];
  skillCategories: SkillCategory[];
  languages: Language[];
  socialMedia: SocialMediaProps[];
}
