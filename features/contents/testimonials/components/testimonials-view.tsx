"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import { TestimonialAddEditModal } from "./testimonial-add-edit-modal";

const dummyTestimonials = [
  {
    id: 1,
    name: "Andi Prasetyo",
    role: "Customer",
    message:
      "Minuman Mamanest ini benar-benar segar dan membantu saya tetap fokus di siang hari. Rasanya natural banget!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 2,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 3,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 4,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 5,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 6,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 7,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 8,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 9,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 10,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
  {
    id: 11,
    name: "Rina Wijaya",
    role: "Nutritionist",
    message:
      "Kandungan sarang burung waletnya cukup tinggi dan dikombinasikan dengan rasa yang enak — kombinasi sempurna!",
    photo_path: "/20190704184.JPG",
    is_active: true,
  },
];

export function TestimonialsView() {
  const [testimonials, setTestimonials] = useState(dummyTestimonials);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const handleEdit = (data: any) => {
    setEditData(data);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => {
            setEditData(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-400"
        >
          <Plus size={16} /> Add Testimonial
        </Button>
      </div>

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal */}
      <TestimonialAddEditModal
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editData ?? undefined}
        mode={editData ? "edit" : "add"}
      />
    </div>
  );
}
