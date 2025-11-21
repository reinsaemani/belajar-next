export function getApplicantPhotoUrl(photoPath?: string | null): string {
  if (!photoPath) return "";
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  return `${base}/uploads/applicants/${photoPath}`;
}
