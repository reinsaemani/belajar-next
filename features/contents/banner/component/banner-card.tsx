"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";
import { getImageUrl } from "@/utils/format";

export function BannerCard({
  banner,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleActive,
  dragAttributes,
}: any) {
  return (
    <Card
      onClick={() => onSelect(banner)}
      className={cn(
        "relative w-60 h-[190px] flex-shrink-0 overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition group bg-white",
        isSelected ? "border-pink-500 ring-2 ring-pink-300" : "border-gray-200",
        !banner.is_active && "opacity-60"
      )}
    >
      <CardContent className="p-2 flex flex-col h-full justify-between relative">
        {/* Drag Handle */}
        <div
          {...dragAttributes}
          className="absolute left-2 top-2 text-gray-400 cursor-grab active:cursor-grabbing z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={18} />
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <Image
            src={getImageUrl(banner.banner_path)}
            alt={banner.title ?? "Banner"}
            width={240}
            height={120}
            className="w-full h-[110px] object-cover rounded-md"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-1 mt-6 z-20 relative">
          <div className="text-xs font-medium truncate w-3/4">
            {banner.title ?? "Tanpa Judul"}
          </div>
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Switch
              checked={banner.is_active}
              onCheckedChange={(val) => onToggleActive(banner.banner_id, val)}
              className="data-[state=checked]:bg-pink-500"
            />
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition z-30">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(banner);
            }}
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(banner.banner_id);
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
