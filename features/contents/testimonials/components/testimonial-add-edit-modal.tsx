"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { TestimonialForm } from "./testimonial-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  mode: "add" | "edit";
};

export function TestimonialAddEditModal({
  open,
  onOpenChange,
  initialData,
  mode,
}: Props) {
  async function handleSubmit(formData: FormData) {
    toast.success(
      mode === "edit" ? "Testimonial updated!" : "Testimonial created!"
    );
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === "edit" ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <TestimonialForm
          id="testimonial-form"
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
