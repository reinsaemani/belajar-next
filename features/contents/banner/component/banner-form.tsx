"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useState, useEffect } from "react";

type BannerFormProps = {
  id?: string;
  initialData?: {
    title?: string | null;
    is_active?: boolean;
    image_path?: string | null;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export function BannerForm({
  id,
  initialData,
  onSubmit,
  onCancel,
  loading,
}: BannerFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setIsActive(initialData?.is_active ?? true);
    if (initialData?.image_path)
      setPreview(
        `${process.env.NEXT_PUBLIC_STORAGE_URL}/${initialData.image_path}`
      );
  }, [initialData]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    const MAX_SIZE_MB = 2;
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File size must be under ${MAX_SIZE_MB} MB`);
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("is_active", String(isActive));
    await onSubmit(formData);
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="space-y-6 w-full min-h-0 py-2"
    >
      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded border object-contain"
          />
        </div>
      )}

      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Banner title (optional)"
          disabled={loading}
        />
      </div>

      <div>
        <Label>Image (max 2 MB)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        {file && (
          <p className="text-xs text-muted-foreground mt-1">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label>Active</Label>
        <Switch
          checked={isActive}
          onCheckedChange={setIsActive}
          disabled={loading}
          className="data-[state=checked]:bg-[var(--switch-primary)]"
        />
      </div>

      <div className="flex justify-between gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        {loading ? (
          <Button
            variant="secondary"
            disabled
            size="sm"
            className="flex items-center gap-2"
          >
            <Spinner className="size-4" />
            Saving
          </Button>
        ) : (
          <Button type="submit" className="flex bg-pink-500 hover:bg-pink-400">
            Save
          </Button>
        )}
      </div>
    </form>
  );
}
