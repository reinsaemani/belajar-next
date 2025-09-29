import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, idx) => (
          <li key={item.href ?? item.label} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-foreground">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <ChevronRight className="mx-2 size-4 text-muted-foreground" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
