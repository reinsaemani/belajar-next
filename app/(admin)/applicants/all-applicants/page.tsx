import { AllApplicantsList } from "@/features/applicants/components/all-applicants/ApplicantsList";
import * as React from "react";

export default function AdminAllAplicants() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Applicants</h1>
      <AllApplicantsList />
    </section>
  );
}
