import { SpinnerCustom } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SpinnerCustom text="Please wait..." size="xl" />
    </div>
  );
}
