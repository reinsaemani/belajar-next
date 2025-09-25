"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUpdateVacancyStatus } from "../api/update-vacancy-status";

interface VacancyStatusSwitchProps {
  id: string | number;
  checked: boolean;
}

export function VacancyStatusSwitch({ id, checked }: VacancyStatusSwitchProps) {
  const updateVacancyStatusMutation = useUpdateVacancyStatus();

  const handleChange = (checked: boolean) => {
    updateVacancyStatusMutation.mutate(
      { id: String(id), is_open: checked },
      {
        onSuccess: () =>
          toast.success(
            `Vacancy status updated to ${checked ? "Open" : "Closed"}!`
          ),
        onError: () => toast.error("Failed to update vacancy status"),
      }
    );
  };

  return (
    <div className="flex justify-center">
      <Switch
        checked={checked}
        onCheckedChange={handleChange}
        className="data-[state=checked]:bg-[var(--switch-primary)]"
      />
    </div>
  );
}
