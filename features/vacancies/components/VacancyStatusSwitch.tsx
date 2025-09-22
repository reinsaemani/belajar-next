
'use client';

import { Switch } from '@/components/ui/switch';
import { SwitchSkeleton } from '@/components/skeleton/SkeletonSwitch';
import { toast } from 'sonner';
import { useUpdateVacancyStatus } from '../api/update-vacancy-status';

interface VacancyStatusSwitchProps {
    id: string | number;
    defaultChecked: boolean;
}

export function VacancyStatusSwitch({
    id,
    defaultChecked,
}: VacancyStatusSwitchProps) {
    const updateVacancyStatusMutation = useUpdateVacancyStatus();

    const handleChange = (checked: boolean) => {
        updateVacancyStatusMutation.mutate(
            { id: String(id), is_open: checked },
            {
                onSuccess: () =>
                    toast.success(`Vacancy status updated to ${checked ? 'Open' : 'Closed'}!`),
                onError: () => toast.error('Failed to update vacancy status'),
            }
        );
    };

    if (updateVacancyStatusMutation.isPending) {
        return <SwitchSkeleton />;
    }

    return (
        <div className="flex justify-center">
            <Switch defaultChecked={defaultChecked} onCheckedChange={handleChange} />
        </div>
    );
}