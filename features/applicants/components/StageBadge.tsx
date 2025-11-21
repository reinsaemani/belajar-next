"use client";

import React from "react";

export function StageBadge({ value }: { value?: string | null }) {
  if (!value) return <span className="text-gray-400">-</span>;

  const map: Record<string, string> = {
    SCREENING: "bg-gray-50 text-gray-700 border border-gray-300",
    HR_INT: "bg-blue-50 text-blue-700 border border-blue-300",
    SKILL_TEST: "bg-yellow-50 text-yellow-700 border border-yellow-300",
    USER_INT: "bg-purple-50 text-purple-700 border border-purple-300",
    FINAL_INT: "bg-indigo-50 text-indigo-700 border border-indigo-300",
    OFFERING: "bg-emerald-50 text-emerald-700 border border-emerald-300",
    HIRED: "bg-green-50 text-green-700 border border-green-300 font-semibold",
    REJECTED: "bg-red-50 text-red-700 border border-red-300 font-semibold",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs text-center rounded font-medium ${
        map[value] ?? "bg-gray-100 text-gray-600 border border-gray-200"
      }`}
    >
      {value.replaceAll("_", " ")}
    </span>
  );
}
