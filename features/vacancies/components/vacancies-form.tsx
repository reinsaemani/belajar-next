"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVacancySchema, CreateVacancyInput } from "../api/create-vacancy";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const VACANCY_TYPES = [
  { value: "Full_Time", label: "Full-Time" },
  { value: "Internship", label: "Internship" },
  { value: "Freelance", label: "Freelance" },
];

const VACANCY_DEGREES = [
  { value: "SMP", label: "SMP" },
  { value: "SMA_SMK", label: "SMA/SMK" },
  { value: "Diploma", label: "Diploma" },
  { value: "Sarjana", label: "Sarjana" },
  { value: "Magister", label: "Magister" },
];

const VACANCY_LEVELS = [
  { value: "Staff", label: "Staff" },
  { value: "Pejuang", label: "Pejuang" },
];

type VacancyFormProps = {
  id?: string; // optional id so parent can trigger submit
  initialData?: Partial<CreateVacancyInput>;
  onSubmit: (data: CreateVacancyInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  onErrorChange?: (hasError: boolean) => void;
};

function formatDateInput(date?: string | Date) {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export function VacancyForm({
  id,
  initialData,
  onSubmit,
  onCancel,
  loading,
  onErrorChange,
}: VacancyFormProps) {
  const isEditMode = !!initialData?.title;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateVacancyInput>({
    resolver: zodResolver(createVacancySchema),
    defaultValues: {
      ...initialData,
      deadline: formatDateInput(initialData?.deadline),
      is_open: initialData?.is_open ?? true,
    },
  });

  useEffect(() => {
    reset({
      ...initialData,
      deadline: formatDateInput(initialData?.deadline),
      is_open: initialData?.is_open ?? true,
    });
  }, [initialData, reset]);

  useEffect(() => {
    if (onErrorChange) {
      onErrorChange(Object.keys(errors).length > 0);
    }
  }, [errors, onErrorChange]);

  async function handleFormSubmit(data: CreateVacancyInput) {
    await onSubmit(data);
  }

  return (
    // form has id so parent modal can call requestSubmit(); min-h-0 to play nice with scroll container
    <form
      id={id}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 w-full min-h-0"
    >
      {/* === Row 1: Title + Degree === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <Input
            {...register("title")}
            disabled={loading}
            placeholder="Software Engineer"
          />
          {errors.title && (
            <span className="text-destructive text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Degree</label>
          <select
            {...register("degree")}
            disabled={loading}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
          >
            <option value="">Select Degree</option>
            {VACANCY_DEGREES.map((deg) => (
              <option key={deg.value} value={deg.value}>
                {deg.label}
              </option>
            ))}
          </select>
          {errors.degree && (
            <span className="text-destructive text-sm">
              {errors.degree.message}
            </span>
          )}
        </div>
      </div>

      {/* === Row 2: Deadline + Type === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <Input type="date" {...register("deadline")} disabled={loading} />
          {errors.deadline && (
            <span className="text-destructive text-sm">
              {errors.deadline.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            {...register("type")}
            disabled={loading}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
          >
            <option value="">Select Type</option>
            {VACANCY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-destructive text-sm">
              {errors.type.message}
            </span>
          )}
        </div>
      </div>

      {/* === Row 3: Level === */}
      <div>
        <label className="block font-medium mb-1">Level</label>
        <select
          {...register("level")}
          disabled={loading}
          className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
        >
          <option value="">Select Level</option>
          {VACANCY_LEVELS.map((lvl) => (
            <option key={lvl.value} value={lvl.value}>
              {lvl.label}
            </option>
          ))}
        </select>
        {errors.level && (
          <span className="text-destructive text-sm">
            {errors.level.message}
          </span>
        )}
      </div>

      {/* === Detail (full width) === */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Qualification</label>
          <Textarea
            {...register("qualification")}
            rows={2}
            disabled={loading}
          />
          {errors.qualification && (
            <span className="text-destructive text-sm">
              {errors.qualification.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Responsibilities</label>
          <Textarea
            {...register("responsibilities")}
            rows={2}
            disabled={loading}
          />
          {errors.responsibilities && (
            <span className="text-destructive text-sm">
              {errors.responsibilities.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Benefit</label>
          <Textarea {...register("benefit")} rows={2} disabled={loading} />
          {errors.benefit && (
            <span className="text-destructive text-sm">
              {errors.benefit.message}
            </span>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Documents</label>
          <Textarea {...register("documents")} rows={2} disabled={loading} />
          {errors.documents && (
            <span className="text-destructive text-sm">
              {errors.documents.message}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Status</label>
          <Switch
            checked={watch("is_open")}
            onCheckedChange={(val) => setValue("is_open", val)}
            className="data-[state=checked]:bg-[var(--switch-primary)]"
          />
        </div>
      </div>
    </form>
  );
}
