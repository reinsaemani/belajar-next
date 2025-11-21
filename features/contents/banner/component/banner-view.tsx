"use client";

import { useEffect, useState } from "react";
import { useBanners } from "../api/get-banners";
import { useCreateBanner } from "../api/create-banner";
import { useUpdateBanner } from "../api/update-banner";
import { useDeleteBanner } from "../api/delete-banner";
import { useReorderBanners } from "../api/reorder-banners";
import { BannerList } from "./banner-list";
import { toast } from "sonner";
import { BannerAddEditModal } from "./banner-add-edit-modal";
import { getImageUrl } from "@/utils/format";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { SkeletonBlock } from "@/components/skeleton/SkeletonBlock";

export function BannerView() {
  const [selected, setSelected] = useState<any | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useBanners();

  const createMutation = useCreateBanner({
    mutationConfig: {
      onSuccess: () => toast.success("Banner created successfully"),
      onError: () => toast.error("Failed to create banner"),
    },
  });

  const updateMutation = useUpdateBanner({
    mutationConfig: {
      onSuccess: () => toast.success("Banner updated successfully"),
      onError: () => toast.error("Failed to update banner"),
    },
  });

  const deleteMutation = useDeleteBanner({
    mutationConfig: {
      onSuccess: () => toast.success("Banner deleted successfully"),
      onError: () => toast.error("Failed to delete banner"),
    },
  });

  const reorderMutation = useReorderBanners();
  const banners = data?.data ?? [];

  useEffect(() => {
    if (banners.length > 0 && !selected) setSelected(banners[0]);
  }, [banners, selected]);

  const handleEdit = (banner: any) => {
    setEditData(banner);
    setFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    deleteMutation.mutate(
      { id: deleteId },
      {
        onSuccess: async () => {
          await refetch();
          toast.success("Banner deleted");
          setSelected(null);
        },
      }
    );
    setDeleteId(null);
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-xl mx-auto h-[calc(100vh-200px)] px-4 sm:px-6 overflow-hidden">
        {/* === Preview === */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-8 mb-4 shadow-sm overflow-hidden">
          {isLoading ? (
            <SkeletonBlock lines={6} className="w-full max-w-md" height={24} />
          ) : selected ? (
            <>
              <div className="flex items-center justify-center w-full h-[440px] max-h-[65vh]">
                <img
                  src={getImageUrl(selected.banner_path)}
                  alt={selected.title ?? "Preview"}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                />
              </div>
              <h2 className="mt-3 text-lg font-semibold text-gray-800 truncate max-w-full text-center">
                {selected.title ?? "Tanpa Judul"}
              </h2>
            </>
          ) : (
            <div className="text-gray-400">Select a banner to preview</div>
          )}
        </div>

        {/* === List === */}
        <div className="h-[240px] bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          {isLoading ? (
            <SkeletonBlock lines={3} height={20} />
          ) : (
            <BannerList
              banners={banners}
              selectedId={selected?.banner_id}
              onSelect={(b: any) => setSelected(b)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReorder={(ids: number[]) =>
                reorderMutation.mutate(ids, {
                  onSuccess: async () => await refetch(),
                })
              }
              onToggleActive={(id: number, isActive: boolean) => {
                const formData = new FormData();
                formData.append("is_active", String(isActive));
                updateMutation.mutate(
                  { id, formData },
                  { onSuccess: async () => await refetch() }
                );
              }}
              onAdd={() => {
                setEditData(null);
                setFormOpen(true);
              }}
            />
          )}
        </div>
      </div>

      {/* === Modal Add/Edit === */}
      <BannerAddEditModal
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editData ?? undefined}
        mode={editData ? "edit" : "add"}
      />

      {/* === Dialog Delete === */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Banner?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The banner will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
