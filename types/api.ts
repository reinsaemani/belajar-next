export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type Vacancy = Entity<{
  vacancies_id: number;
  title: string;
  location: string | null;
  type: string;
  degree: string;
  qualification: string;
  responsibilities: string;
  documents: string | null;
  benefit: string | null;
  deadline: string;
  is_open: boolean;
}>;

export type User = Entity<{
  user_id: number;
  NIK: string | null;
  full_name: string;
  gender: "MALE" | "FEMALE" | null;
  place_of_birth: string | null;
  date_of_birth: string | null;
  documents_files_id: number | null;
  phone_number: string | null;
  email: string | null;
  marital_status: string | null;
  religion: string | null;
  address: string | null;
  village: string | null;
  subdistrict: string | null;
  district_town: string | null;
  province: string | null;
  university_school: string | null;
  department_faculty: string | null;
  study_program: string | null;
  educational_level: "SMA_SMK" | "Diploma" | "Sarjana" | "Magister" | null;
  work_experience: string | null;
  banned_until: string | null;
  personality_test_url: string | null;
  created_at: string;
  updated_at: string;
}>;

export type ApplicantsDetails = Entity<{
  detail_applicants_id: number;
  applicants_id: number;
  stage: "HR_INT" | "SKILL_TEST" | "USER_INT" | "FINAL_INT" | "OFFERING";
  attempt_no: number;
  status: "PENDING" | "PASSED" | "FAILED" | "SKIPPED";
  notes: string | null;
  penilaian: string | null;
  schedule_at: string | null;
  created_at: string;
  updated_at: string;
}>;

export type Applicant = Entity<{
  applicants_id: number;
  user_id: number;
  vacancy_id: number;
  current_stage:
    | "HR_INT"
    | "SKILL_TEST"
    | "USER_INT"
    | "FINAL_INT"
    | "OFFERING"
    | "HIRED"
    | "REJECTED";
  created_at: string;
  updated_at: string;
  user: User;
  vacancy: Vacancy;
  details?: ApplicantsDetails[];
}>;

export type Account = {
  account_id: number;
  username: string;
  role: "ADMIN" | "PENGAWAS";
};

export type AuthResponse = {
  jwt: string;
  user: Account;
};
