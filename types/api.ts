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
