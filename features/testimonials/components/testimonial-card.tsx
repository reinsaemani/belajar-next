"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function TestimonialCard({ testimonial, onEdit, onDelete }: any) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <Card className="relative group hover:shadow-md transition">
        <CardContent className="flex flex-col items-center text-center p-5">
          {/* Foto */}
          {testimonial.photo_path ? (
            <img
              src={testimonial.photo_path}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover mb-3 cursor-pointer hover:opacity-90 transition"
              onClick={() => setPreviewOpen(true)}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-gray-500 text-sm">
              N/A
            </div>
          )}

          {/* Nama + role + message */}
          <h3 className="text-sm font-semibold">{testimonial.name}</h3>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-4">
            “{testimonial.message}”
          </p>
        </CardContent>

        {/* Hover Action */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onEdit(testimonial)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(testimonial.id)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </Card>

      {/* Modal preview foto */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-lg bg-transparent border-none shadow-none p-0">
          <DialogTitle className="sr-only">Preview Photo</DialogTitle>
          <div className="relative flex justify-center items-center">
            <img
              src={testimonial.photo_path}
              alt={testimonial.name}
              className="max-h-[80vh] rounded-lg shadow-lg object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
