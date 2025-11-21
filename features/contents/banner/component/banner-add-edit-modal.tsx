"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateBanner } from "../api/create-banner";
import { useUpdateBanner } from "../api/update-banner";
import { BannerForm } from "./banner-form";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    banner_id?: number;
    title?: string;
    is_active?: boolean;
    image_path?: string;
  };
  mode: "add" | "edit";
};

export function BannerAddEditModal({
  open,
  onOpenChange,
  initialData,
  mode,
}: Props) {
  const createMutation = useCreateBanner({
    mutationConfig: {
      onSuccess: () => toast.success("Banner created successfully"),
      onError: () => toast.error("Failed to create banner"),
    },
  });

  const updateMutation = useUpdateBanner({
    mutationConfig: {
      onSuccess: () => toast.success("Banner updated successfully"),
      onError: () => toast.error("Failed to update banner"),
    },
  });

  const loading = createMutation.isPending || updateMutation.isPending;

  async function handleSubmit(formData: FormData) {
    if (mode === "edit" && initialData?.banner_id) {
      await updateMutation.mutateAsync({
        id: initialData.banner_id,
        formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === "edit" ? "Edit Banner" : "Add Banner"}
          </DialogTitle>
        </DialogHeader>

        <BannerForm
          id="banner-form"
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
