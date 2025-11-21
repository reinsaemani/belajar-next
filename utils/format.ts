import { default as dayjs } from "dayjs";

export const formatDate = (date: number) => dayjs(date).format("D MMMM YYYY");

export const formatDateTime = (date: number) =>
  dayjs(date).format("D MMMM YYYY, HH:mm");

export const formatType = (type: string) => {
  if (!type) return "";
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const formatCapitalize = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export function formatStage(stage?: string | null): string {
  if (!stage) return "-";
  const map: Record<string, string> = {
    SCREENING: "Screening",
    HR_INT: "Interview HR",
    SKILL_TEST: "Skill Test",
    USER_INT: "Interview User",
    FINAL_INT: "Final Interview",
    OFFERING: "Offering",
    HIRED: "Hired",
    REJECTED: "Rejected",
  };
  return map[stage] ?? stage;
}

export function formatWorkExperience(work_experience?: string | null): string {
  if (!work_experience) return "-";
  const map: Record<string, string> = {
    FRESH_GRADUATES: "Fresh Graduates",
    ONE_TO_THREE_YEARS: "1 - 3 years",
    THREE_TO_FIVE_YEARS: "3 - 5 years",
    MORE_THAN_FIVE_YEARS: "> 5 years",
    FINAL_INT: "Final Interview",
  };
  return map[work_experience] ?? work_experience;
}

export function getImageUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_STORAGE_URL}/${url}`;
}
