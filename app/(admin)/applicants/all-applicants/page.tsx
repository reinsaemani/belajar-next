import { AllApplicantsList } from "@/features/applicants/components/all-applicants/ApplicantsList";
import * as React from "react";

export default function AdminAllAplicants() {
  return (
    <section className="p-4">
      <h1 className="text-xl font-bold mb-4">All Applicants</h1>
      <AllApplicantsList />
    </section>
  );
}
