"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Animated Icon */}
      <Ghost className="h-20 w-20 text-muted-foreground animate-bounce" />

      {/* Title */}
      <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      {/* Actions */}
      {/* <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div> */}
    </div>
  );
}
