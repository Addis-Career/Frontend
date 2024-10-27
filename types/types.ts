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
