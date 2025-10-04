"use client";

import { Applicant } from "@/types/api";
import { Eye, Download } from "lucide-react";
import React from "react";
import { ApplicantDetailActionsDropdown } from "./applicants-actions-details";

type Props = {
  applicant?: Applicant;
  isLoading?: boolean;
  error?: Error | null;
};

export function ApplicantDetail({ applicant, isLoading, error }: Props) {
  if (isLoading) return <ApplicantDetailSkeleton />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error.message || "Failed to load applicant data."}</p>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="text-center py-16 text-gray-500">Applicant not found</div>
    );
  }

  const { user, vacancy, created_at } = applicant;

  function getFiles(user: any) {
    const base = process.env.NEXT_PUBLIC_API_URL + "/uploads/applicants/";
    const safe = (path?: string | null) =>
      path && path.trim().length > 0 ? path : undefined;

    return [
      {
        label: "CV",
        filename: safe(user.documents_files?.cv_path),
        url: safe(user.documents_files?.cv_path)
          ? base + user.documents_files.cv_path
          : undefined,
      },
      {
        label: "ID Card",
        filename: safe(user.documents_files?.id_card_path),
        url: safe(user.documents_files?.id_card_path)
          ? base + user.documents_files.id_card_path
          : undefined,
      },
      {
        label: "Certificate",
        filename: safe(user.documents_files?.certificate_path),
        url: safe(user.documents_files?.certificate_path)
          ? base + user.documents_files.certificate_path
          : undefined,
      },
      {
        label: "Photo",
        filename: safe(user.documents_files?.photo_path),
        url: safe(user.documents_files?.photo_path)
          ? base + user.documents_files.photo_path
          : undefined,
      },
    ];
  }

  const files = getFiles(user);

  return (
    <div className="bg-white rounded-xl shadow mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Applicant Preview</h2>
        <ApplicantDetailActionsDropdown applicantId={applicant.applicants_id} />
      </div>

      {/* === Applicant Info === */}
      <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <tbody>
            <DetailRow label="Full Name" value={user.full_name} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Phone Number" value={user.phone_number} />
            <DetailRow label="NIK" value={user.NIK} />
            <DetailRow
              label="Birth Place, Date"
              value={`${user.place_of_birth ?? "-"}, ${
                user.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString("en-GB")
                  : "-"
              }`}
            />
            <DetailRow
              label="Address"
              value={
                [
                  user.address,
                  user.village,
                  user.subdistrict,
                  user.district_town,
                  user.province,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"
              }
            />
            <DetailRow label="Marital Status" value={user.marital_status} />
            <DetailRow label="Religion" value={user.religion} />

            <DetailRow
              label="School / University"
              value={user.university_school}
            />
            <DetailRow
              label="Faculty / Department"
              value={user.department_faculty}
            />
            <DetailRow label="Study Program" value={user.study_program} />
            <DetailRow label="Education Level" value={user.educational_level} />
            <DetailRow label="GPA / Grades" value={user.GPA_grades} />
            <DetailRow label="Work Experience" value={user.work_experience} />
            <DetailRow label="Vacancy Level" value={vacancy.level} />
            <DetailRow label="Applied Position" value={vacancy?.title} />
            <DetailRow
              label="Application Date"
              value={
                created_at
                  ? new Date(created_at).toLocaleDateString("en-GB")
                  : "-"
              }
            />
          </tbody>
        </table>
      </div>

      {/* === Files/Documents === */}
      <div className="flex flex-col gap-3">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg p-4 flex items-center gap-4"
          >
            <div className="flex-1">
              <div className="font-bold">{file.label}</div>
              <div className="text-sm text-gray-600">
                {file.filename ? file.filename : `${file.label} not found`}
              </div>
            </div>
            {file.url && (
              <>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Preview
                </a>
                <a
                  href={file.url}
                  download
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2 pr-3 font-semibold text-gray-700 w-56">{label}</td>
      <td className="py-2">
        {value || <span className="text-gray-400">-</span>}
      </td>
    </tr>
  );
}

function ApplicantDetailSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow mx-auto p-8 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 mb-6 rounded"></div>
      <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 10 }).map((_, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 pr-3 w-56">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
                <td className="py-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
