"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavSheet";

export default function Navbar() {
  return (
    <nav className="h-18 bg-sidebar border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block " />

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
