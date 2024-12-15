// types.ts
export interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string | null;
  work_arrangement: string;
  job_type: string;
  salary_range: string;
  responsibilities: string[];
  requirements: string[];
  preferred_qualifications: string[];
  benefits: string[];
  application_link: string;
  company_description: string;
  posted_date: string | null;
  closing_date: string | null;
  tech_stack: string[];
  areas_of_focus: string[];
}
export interface ResponseJob {
  results: Job[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface JobsState {
  jobs: ResponseJob;
  loading: boolean;
  error: string | null;
}
export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Profile {
  id: number;
  user: User;
  country: string;
  city: string;
  phone_number: string;
  profile_image_uri: string;
  bio: string;
  prefered_tech_stacks: string[];
  resume_uri: string;
  preferred_job_types: string[];
  prefered_work_arrangement: string;
  summary_from_resume: string;
}

export interface ProfileState {
  refresh: string;
  access: string;
  user: User;
  profile: Profile;
}
export interface UserProfile {
  id?: number;
  user?: {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
  };
  country?: string | null;
  city?: string | null;
  phone_number?: string | null;
  profile_image_uri?: string | null;
  bio?: string | null;
  prefered_tech_stacks?: string[] | null;
  resume_uri?: string | null;
  preferred_job_types?: string | null;
  prefered_work_arrangement?: string | null;
  summary_from_resume?: string | null;
  profile_does_not_exist?: boolean;
}
