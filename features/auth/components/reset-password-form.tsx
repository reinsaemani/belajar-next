"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";

export function ResetPasswordForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  loading?: boolean;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle visibilitas password
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");
    onSubmit({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto")}
    >
      <div className="grid gap-4">
        {/* Old Password */}
        <div>
          <Label htmlFor="oldPassword">Old Password</Label>
          <div className="relative mt-1">
            <Input
              id="oldPassword"
              type={showOld ? "text" : "password"}
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowOld((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative mt-1">
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              placeholder="Re-enter new password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMessage && e.target.value === newPassword) {
                  setErrorMessage("");
                }
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-500 hover:bg-pink-400"
      >
        {loading ? "Loading..." : "Reset Password"}
      </Button>
    </form>
  );
}
