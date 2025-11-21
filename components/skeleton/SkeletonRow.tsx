"use client";

import { Skeleton } from "../ui/skeleton";

type SkeletonRowProps = {
  columns?: number;
  count?: number;
};

export function SkeletonRow({ columns = 4, count = 6 }: SkeletonRowProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
