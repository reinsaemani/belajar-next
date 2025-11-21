"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * SkeletonCard — versi generik untuk layout seperti BannerCard (gambar + teks)
 */
export function SkeletonCard({
  width = 250,
  height = 125,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className="flex flex-col space-y-3">
      {/* Gambar utama */}
      <Skeleton
        className="rounded-xl"
        style={{ height: `${height}px`, width: `${width}px` }}
      />
      {/* Tulisan bawah */}
      <div className="space-y-2">
        <Skeleton className="h-4" style={{ width: `${width}px` }} />
        <Skeleton className="h-4" style={{ width: `${width - 50}px` }} />
      </div>
    </div>
  );
}

/**
 * SkeletonCardCompact — versi lebih kecil (seperti TestimonialCard)
 * Ada foto profil bulat + teks 2 baris.
 */
export function SkeletonCardCompact({
  width = 250,
  avatarSize = 48,
}: {
  width?: number;
  avatarSize?: number;
}) {
  return (
    <div className="flex items-center space-x-4">
      {/* Foto profil */}
      <Skeleton
        className="rounded-full"
        style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
      />
      {/* Nama dan role */}
      <div className="space-y-2">
        <Skeleton className="h-4" style={{ width: `${width}px` }} />
        <Skeleton className="h-4" style={{ width: `${width - 50}px` }} />
      </div>
    </div>
  );
}
