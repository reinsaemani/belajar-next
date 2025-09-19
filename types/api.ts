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
  title: string;
  type: string;
  degree: string;
  qualification: string;
  responsibilities: string;
  deadline: string;
  is_open: boolean;
}>;
