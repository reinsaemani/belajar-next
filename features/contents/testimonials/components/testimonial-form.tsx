"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export function TestimonialForm({ id, initialData, onSubmit, onCancel }: any) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [message, setMessage] = useState(initialData?.message ?? "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.photo_path ?? null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("message", message);
    formData.append("is_active", String(isActive));
    await onSubmit(formData);
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4">
      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover border mb-2"
          />
        </div>
      )}

      <div>
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
      </div>

      <div>
        <Label>Role</Label>
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Job / Position"
        />
      </div>

      <div>
        <Label>Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write testimonial here..."
          rows={4}
        />
      </div>

      <div>
        <Label>Photo</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setPhoto(f ?? null);
            if (f) setPreview(URL.createObjectURL(f));
          }}
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Label>Active</Label>
        <Switch checked={isActive} onCheckedChange={setIsActive} />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-pink-500 hover:bg-pink-400">
          Save
        </Button>
      </div>
    </form>
  );
}
