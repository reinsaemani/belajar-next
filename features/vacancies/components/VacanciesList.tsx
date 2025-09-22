'use client';

import { DataTable } from '@/components/datatable/DataTable';
import { SkeletonTable } from '@/components/skeleton/SkeletonTable';
import { useVacancies } from '../api/get-vacancies';
import { Vacancy } from '@/types/api';
import { formatDate, formatType } from '@/utils/format';
import { ColumnDef } from '@tanstack/react-table';
import { VacancyStatusSwitch } from './VacancyStatusSwitch';

export const VacanciesList = () => {
    const vacanciesQuery = useVacancies();

    const columns: ColumnDef<Vacancy>[] = [
        { accessorKey: 'title', header: 'Title' },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ getValue }) => (
                <span className="block text-center">{formatType(getValue<string>())}</span>
            ),
        },
        {
            accessorKey: 'degree',
            header: 'Degree',
            cell: ({ getValue }) => (
                <span className="block text-center">{getValue<string>()}</span>
            ),
        },
        {
            accessorKey: 'deadline',
            header: 'Deadline',
            cell: ({ getValue }) => {
                const deadlineStr = getValue<string>();
                return (
                    <span className="block text-center">
                        {deadlineStr
                            ? formatDate(new Date(deadlineStr).getTime())
                            : '-'}
                    </span>
                );
            },
        },
        {
            accessorKey: "is_open",
            header: "Status",
            cell: ({ row }) => {
                const id = row.original.vacancies_id;
                const isOpen = row.original.is_open as boolean;

                return (
                    <div className="flex justify-center">
                        <VacancyStatusSwitch id={id} defaultChecked={isOpen} />
                    </div>
                );
            },
        }
    ];

    if (vacanciesQuery.isLoading) return <SkeletonTable columns={columns.length} rows={5} />;

    const vacancies = vacanciesQuery.data?.data;
    if (!vacancies) return null;

    return <DataTable<Vacancy, unknown> data={vacancies} columns={columns} />;
};
