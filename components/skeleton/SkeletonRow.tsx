import { Skeleton } from "../ui/skeleton";

type SkeletonRowProps = {
    columns: number;
};

export const SkeletonRow = ({ columns }: SkeletonRowProps) => {
    return (
        <tr>
            {Array.from({ length: columns }).map((_, idx) => (
                <td key={idx} className="px-4 py-2">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
};