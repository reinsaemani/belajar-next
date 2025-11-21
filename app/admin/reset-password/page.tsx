import { ResetPasswordView } from "@/features/auth/components/reset-password-view";

export const metadata = {
  title: "Reset Password",
  description: "Ganti password akun Anda",
};

export default function ResetPasswordPage() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-6rem)] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <ResetPasswordView />
      </div>
    </section>
  );
}
