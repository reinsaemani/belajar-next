"use client";

import { SkeletonBannerCard } from "./SkeletonCard";

export function SkeletonBannerList({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-x-auto w-full">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBannerCard key={i} />
      ))}
    </div>
  );
}
