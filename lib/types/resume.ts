import resumeData from "@/content/resume.json";

export interface ResumeSkill {
  name: string;
  icon: string;
}

export interface ResumeSkillLevel {
  name: string;
  level: number;
}

export interface ResumeSkillCategory {
  title: string;
  skills: ResumeSkillLevel[];
}

export interface ResumeSocialItem {
  name: string;
  url: string;
  icon: string;
  navbar: boolean;
}

export interface ResumeRole {
  title: string;
  start: string;
  end: string;
  description: string;
}

export interface ResumeWorkItem {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
  roles: ResumeRole[];
}

export interface ResumeData {
  firstName: string;
  lastName: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: ResumeSkill[];
  skillCategories: ResumeSkillCategory[];
  contact: {
    social: ResumeSocialItem[];
  };
  work: ResumeWorkItem[];
}

export const typedResumeData: ResumeData = resumeData;
