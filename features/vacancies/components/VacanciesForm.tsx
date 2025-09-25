"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVacancySchema,
  CreateVacancyInput,
} from "../api/create-vacancy";
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

  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>([]);
  const [regencies, setRegencies] = useState<{ id: string; name: string }[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  // Fetch Provinces
  useEffect(() => {
    fetch("/api/wilayah/provinces")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Fetch Regencies
  useEffect(() => {
    if (selectedProvince) {
      fetch(`/api/wilayah/regencies?province_code=${selectedProvince}`)
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Informasi Dasar */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input {...register("title")} disabled={loading} />
            {errors.title && (
              <span className="text-destructive text-sm">{errors.title.message}</span>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Deadline</label>
            <Input type="date" {...register("deadline")} disabled={loading} />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </div>

      {/* Lokasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Provinsi</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
            disabled={loading}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((prov, idx) => (
              <option key={idx} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Kota/Kabupaten</label>
          <select
            {...register("location")}
            disabled={loading || !selectedProvince}
            className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {regencies.map((reg) => (
              <option key={reg.id} value={reg.name}>
                {reg.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detail */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Qualification</label>
          <Textarea {...register("qualification")} rows={2} disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1">Responsibilities</label>
          <Textarea {...register("responsibilities")} rows={2} disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1">Benefit</label>
          <Textarea {...register("benefit")} rows={2} disabled={loading} />
        </div>
        <div>
          <label className="block font-medium mb-1">Documents</label>
          <Textarea {...register("documents")} rows={2} disabled={loading} />
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

      {/* Status & Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
