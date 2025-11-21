import { cn } from "@/utils/cn";
import { LoaderIcon } from "lucide-react";

interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-primary", sizeMap[size], className)}
      {...props}
    />
  );
}

export function SpinnerCustom({
  text = "Please wait...",
  size = "xl",
}: {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Spinner size={size} />
      <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
    </div>
  );
}
