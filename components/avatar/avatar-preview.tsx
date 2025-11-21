"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AvatarPreviewProps {
  /** URL gambar lengkap (contoh: `${process.env.NEXT_PUBLIC_API_URL}/uploads/applicants/...`) */
  src?: string;
  /** Nama lengkap user — dipakai untuk alt, title, dan fallback huruf */
  name?: string;
  /** Ukuran avatar kecil di tabel (default: h-10 w-10) */
  sizeClass?: string;
  /** Tambahan className opsional */
  className?: string;
}

export function AvatarPreview({
  src,
  name = "Unknown",
  sizeClass = "h-10 w-10",
  className = "",
}: AvatarPreviewProps) {
  const [open, setOpen] = React.useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`cursor-pointer hover:bg-gray-50 p-1 rounded-md transition inline-flex items-center justify-center ${className}`}
      >
        <Avatar className={sizeClass}>
          <AvatarImage src={src} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md flex flex-col items-center justify-center gap-2">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>

          {src ? (
            <img
              src={src}
              alt={name}
              className="rounded-lg max-h-[70vh] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-gray-500">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>
              <p>No photo available</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
