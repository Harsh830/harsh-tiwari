
export enum ExamCategory {
  CIVIL_SERVICES = 'Civil Services (UPSC/State)',
  ARMED_FORCES = 'Armed Forces (NDA/CDS)',
  BOARDS_K12 = 'School Boards (10th/12th)',
  LAW_STUDIES = 'Law (LL.B / B.A.LL.B)',
  GENERAL = 'General Knowledge'
}

export enum EducationBoard {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
  MP = 'Madhya Pradesh (MP)',
  UP = 'Uttar Pradesh (UP)',
  MAHARASHTRA = 'Maharashtra',
  NONE = 'Other/Competitive'
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  preferredExams?: ExamCategory[];
}

export type AuthMode = 'login' | 'signup' | null;

export interface Course {
  id: string;
  title: string;
  category: ExamCategory;
  description: string;
  thumbnail: string;
  progress: number;
}

export interface FreeResource {
  id: string;
  title: string;
  type: 'NCERT' | 'Reference' | 'Guide' | 'Legal Text';
  courseId: string;
  link: string;
}

export type ViewTab = 'home' | 'search' | 'dashboard' | 'resources' | 'planner' | 'settings' | 'doubts' | 'notes' | 'current-affairs';

export interface SearchState {
  query: string;
  isLoading: boolean;
  category: ExamCategory;
  board: EducationBoard;
}

export type JackAIGender = 'male' | 'female';

export interface JackAIMessage {
  role: 'user' | 'model';
  text: string;
}
