import { Skeleton } from '../ui/skeleton';
import { SkeletonRow } from './SkeletonRow';

type SkeletonTableProps = {
    columns: number;
    rows?: number;
};

export const SkeletonTable = ({ columns, rows = 5 }: SkeletonTableProps) => {
    return (
        <div className="overflow-hidden rounded-md border">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, idx) => (
                            <th key={idx} className="px-4 py-2">
                                <Skeleton className="h-4 w-full" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, idx) => (
                        <SkeletonRow key={idx} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
