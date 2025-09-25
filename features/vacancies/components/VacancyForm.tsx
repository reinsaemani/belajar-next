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

type Province = { id: string; name: string };
type Regency = { id: string; name: string };

type VacancyFormProps = {
  initialData?: Partial<CreateVacancyInput>;
  onSubmit: (data: CreateVacancyInput) => void;
  loading?: boolean;
};

export function VacancyForm({
  initialData,
  onSubmit,
  loading,
}: {
  initialData?: Partial<CreateVacancyInput>;
  onSubmit: (data: CreateVacancyInput) => void;
  loading?: boolean;
}) {
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
      is_open: initialData?.is_open ?? true,
    },
  });

  // === State for Provinsi & Kota ===
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    []
  );
  const [regencies, setRegencies] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedProvince, setSelectedProvince] = useState("");

  // Fetch Provinces on mount
  useEffect(() => {
    fetch("/api/wilayah/provinces")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Fetch Regencies when province selected
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

  useEffect(() => {
    reset({
      ...initialData,
      is_open: initialData?.is_open ?? true,
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section: Informasi Dasar */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input {...register("title")} disabled={loading} />
            {errors.title && (
              <span className="text-destructive text-sm">
                {errors.title.message}
              </span>
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

      {/* Section: Lokasi */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Provinsi</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full rounded border border-input bg-background py-2 px-3 text-sm shadow-sm"
              disabled={loading}
            >
              <option key="prov-default" value="">
                Pilih Provinsi
              </option>
              {provinces.map((prov, idx) => (
                <option
                  key={`prov-${prov.code ?? idx}`}
                  value={prov.code ?? ""}
                >
                  {prov.name ?? "Tanpa Nama"}
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
              <option key="reg-default" value="">
                Pilih Kota/Kabupaten
              </option>
              {regencies.map((reg) => (
                <option key={`reg-${reg.id}`} value={reg.id}>
                  {reg.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section: Detail */}
      <div>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Qualification</label>
            <Textarea
              {...register("qualification")}
              rows={2}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Responsibilities</label>
            <Textarea
              {...register("responsibilities")}
              rows={2}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Benefit</label>
            <Textarea {...register("benefit")} rows={2} disabled={loading} />
          </div>
          <div>
            <label className="block font-medium mb-1">Documents</label>
            <Textarea {...register("documents")} rows={2} disabled={loading} />
          </div>
        </div>
      </div>

      {/* Status & Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="font-medium">Open</label>
          <Switch
            checked={watch("is_open")}
            onCheckedChange={(val) => setValue("is_open", val)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
