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

// _____________  Vacancy  _____________
export type Vacancy = {
  vacancies_id: number;
  title: string;
  type: "Full_Time" | "Internship" | "Freelance";
  degree: "SMP" | "SMA_SMK" | "Diploma" | "Sarjana" | "Magister" | null;
  level: "Staff" | "Pejuang" | null;
  qualification: string | null;
  responsibilities: string | null;
  documents: string | null;
  benefit: string | null;
  deadline: string | null;
  is_open: boolean;
  created_at: string;
  updated_at: string | null;
};

// _____________  User  _____________
export type User = {
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
  educational_level:
    | "SMP"
    | "SMA_SMK"
    | "Diploma"
    | "Sarjana"
    | "Magister"
    | null;
  work_experience:
    | "FRESH_GRADUATE"
    | "ONE_TO_THREE"
    | "THREE_TO_FIVE"
    | "MORE_THAN_FIVE"
    | null;
  GPA_grades: string | null;
  banned_until: string | null;
  personality_test_url: string | null;
  created_at: string;
  updated_at: string | null;
};

// _____________  Applicants Details (record per stage)  _____________
export type ApplicantsDetails = {
  detail_applicants_id: number;
  applicants_id: number;
  vacancy_id: number;
  stage: "HR_INT" | "SKILL_TEST" | "USER_INT" | "FINAL_INT" | "OFFERING";
  status: "RECOMMENDED" | "NOT_RECOMMENDED" | "CONSIDERED" | "HOLD";
  notes: string | null;
  penilaian: string | null;
  schedule_at: string | null;
  created_at: string;
  updated_at: string | null;
};

// Alias untuk Record list view
export type ApplicantRecord = ApplicantsDetails;

// _____________  Applicant (gabungan user + vacancy + records)  _____________
export type Applicant = {
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
    | "REJECTED"
    | null;
  created_at: string;
  updated_at: string | null;
  user: User;
  vacancy: Vacancy;
  details?: ApplicantsDetails[];
};

// _____________  Account & Auth  _____________
export type Account = {
  account_id: number;
  username: string;
  role: "ADMIN" | "PENGAWAS" | "INTERVIEWER";
};

export type AuthResponse = {
  jwt: string;
  user: Account;
};
