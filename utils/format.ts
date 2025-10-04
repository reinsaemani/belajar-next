import { default as dayjs } from "dayjs";

export const formatDate = (date: number) => dayjs(date).format("D MMMM YYYY");

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
