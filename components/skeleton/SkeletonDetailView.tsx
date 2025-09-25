import { Skeleton } from "@/components/ui/skeleton";

type SkeletonDetailViewProps = {
  rows?: number;
};

export function SkeletonDetailView({ rows = 7 }: SkeletonDetailViewProps) {
  return (
    <div className="bg-white dark:bg-muted rounded-lg shadow p-6 w-full max-w-2xl">
      <Skeleton className="h-8 w-2/3 mb-6" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-5 ${
              i % 2 === 0 ? "w-1/2" : i % 3 === 0 ? "w-2/3" : "w-1/3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
