"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVacancySchema, CreateVacancyInput } from "../api/create-vacancy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const VACANCY_TYPES = [
  { value: "Full_Time", label: "Full-Time" },
  { value: "Part_Time", label: "Part-Time" },
  { value: "Freelance", label: "Freelance" },
];

const VACANCY_DEGREES = [
  { value: "SMA_SMK", label: "SMA/SMK" },
  { value: "Diploma", label: "Diploma" },
  { value: "Sarjana", label: "Sarjana" },
  { value: "Magister", label: "Magister" },
];

type VacancyFormProps = {
  initialData?: Partial<CreateVacancyInput>;
  onSubmit: (data: CreateVacancyInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  onErrorChange?: (hasError: boolean) => void;
};

function formatDateInput(date?: string | Date) {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export function VacancyForm({
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


  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    []
  );
  const [regencies, setRegencies] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedProvince, setSelectedProvince] = useState("");


  useEffect(() => {
    if (onErrorChange) {
      const hasError = Object.keys(errors).length > 0;
      onErrorChange(hasError);
    }
  }, [errors, onErrorChange]);

  // Fetch Provinces
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/region/provinces`)
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Fetch Regencies
  useEffect(() => {
    if (selectedProvince) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/region/regencies/${selectedProvince}`)
        .then((res) => res.json())
        .then(setRegencies);
      setValue("location", "");
    } else {
      setRegencies([]);
      setValue("location", "");
    }
  }, [selectedProvince, setValue]);

  // Reset form when initialData berubah
  useEffect(() => {
    reset({
      ...initialData,
      deadline: formatDateInput(initialData?.deadline),
      is_open: initialData?.is_open ?? true,
    });
  }, [initialData, reset]);


  async function handleFormSubmit(data: CreateVacancyInput) {
    await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* === Kolom kiri: Title & Deadline === */}
        <div className="space-y-4">
          {/* Title */}
          <div className="w-full">
            <label className="block font-medium mb-1">Title</label>
            <Input
              {...register("title")}
              disabled={loading}
              className="w-full"
              placeholder="Software Engineer"
            />
            {errors.title && (
              <span className="text-destructive text-sm">{errors.title.message}</span>
            )}
          </div>

          {/* Deadline */}
          <div className="w-full">
            <label className="block font-medium mb-1">Deadline</label>
            <Input
              type="date"
              {...register("deadline")}
              disabled={loading}
              className="w-full"
            />
            {errors.deadline && (
              <span className="text-destructive text-sm">{errors.deadline.message}</span>
            )}
          </div>
        </div>

        {/* === Kolom kanan: Province & City/Regency === */}
        <div className="space-y-4">
          {/* Province */}
          <div className="w-full">
            <label className="block font-medium mb-1">Province</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
              disabled={loading}
            >
              <option value="">Select Province</option>
              {provinces.map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

          {/* City / Regency */}
          <div className="w-full">
            <label className="block font-medium mb-1">City/Regency</label>
            <select
              {...register("location")}
              disabled={loading || !selectedProvince}
              className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
            >
              <option value="">Select City/Regency</option>
              {regencies.map((reg) => (
                <option key={reg.id} value={reg.name}>
                  {reg.name}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className="text-destructive text-sm">{errors.location.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* === Degree + Type berdampingan === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Degree */}
        <div className="w-full">
          <label className="block font-medium mb-1">Degree</label>
          <select
            {...register("degree")}
            disabled={loading}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
          >
            <option value="">Pilih Degree</option>
            {VACANCY_DEGREES.map((deg) => (
              <option key={deg.value} value={deg.value}>
                {deg.label}
              </option>
            ))}
          </select>
          {errors.degree && (
            <span className="text-destructive text-sm">{errors.degree.message}</span>
          )}
        </div>

        {/* Type */}
        <div className="w-full">
          <label className="block font-medium mb-1">Type</label>
          <select
            {...register("type")}
            disabled={loading}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
          >
            <option value="">Pilih Type</option>
            {VACANCY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-destructive text-sm">{errors.type.message}</span>
          )}
        </div>
      </div>



      {/* === Detail (full width) === */}
      <div className="space-y-4">
        <div className="w-full">
          <label className="block font-medium mb-1">Qualification</label>
          <Textarea {...register("qualification")} rows={2} disabled={loading} className="w-full" />
          {errors.qualification && <span className="text-destructive text-sm">{errors.qualification.message}</span>}
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1">Responsibilities</label>
          <Textarea {...register("responsibilities")} rows={2} disabled={loading} className="w-full" />
          {errors.responsibilities && <span className="text-destructive text-sm">{errors.responsibilities.message}</span>}
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1">Benefit</label>
          <Textarea {...register("benefit")} rows={2} disabled={loading} className="w-full" />
          {errors.benefit && <span className="text-destructive text-sm">{errors.benefit.message}</span>}
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1">Documents</label>
          <Textarea {...register("documents")} rows={2} disabled={loading} className="w-full" />
          {errors.documents && <span className="text-destructive text-sm">{errors.documents.message}</span>}
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

      {/* === Footer: Buttons === */}
      <div className="flex justify-between gap-3 border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button type="submit" disabled={loading} className="bg-pink-500 hover:bg-pink-400">
          {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </form>


  );
}
