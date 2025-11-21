import { TestimonialsView } from "@/features/contents/testimonials/components/testimonials-view";

export default function ContentTestimonialsPage() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>
      <TestimonialsView />
    </section>
  );
}
