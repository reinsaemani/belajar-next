"use client";

import { Skeleton } from "../ui/skeleton";

type SkeletonBlockProps = {
  lines?: number;
  className?: string;
  height?: number; // biar bisa custom tinggi bar
};

export function SkeletonBlock({
  lines = 5,
  className = "",
  height = 16,
}: SkeletonBlockProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
