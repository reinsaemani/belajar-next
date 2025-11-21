"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { BannerCard } from "./banner-card";
import { Banner } from "@/types/api";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function BannerList({
  banners,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onReorder,
  onToggleActive,
  onAdd,
}: any) {
  const [items, setItems] = useState<Banner[]>(banners);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => setItems(banners), [banners]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.banner_id === active.id);
      const newIndex = items.findIndex((i) => i.banner_id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const orderedIds = newItems
        .map((b) => Number(b.banner_id))
        .filter(Boolean);
      onReorder(orderedIds);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full overflow-hidden">
      {/* Tambah Banner */}
      <div
        onClick={onAdd}
        className="w-[220px] h-[180px] flex-shrink-0 rounded-xl border-2 border-dashed border-pink-400 hover:border-pink-500 hover:bg-pink-50 cursor-pointer flex items-center justify-center transition"
      >
        <span className="text-pink-600 font-semibold text-sm">
          + Add Banner
        </span>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 h-full overflow-hidden">
        <ScrollArea className="w-full h-full">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((b) => b.banner_id)}
              strategy={rectSortingStrategy}
            >
              <div className="flex gap-3 w-max py-1 pr-4">
                {items.map((banner) => (
                  <SortableItem
                    key={banner.banner_id}
                    banner={banner}
                    isSelected={banner.banner_id === selectedId}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleActive={onToggleActive}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

function SortableItem({
  banner,
  onSelect,
  onEdit,
  onDelete,
  onToggleActive,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: banner.banner_id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    flexShrink: 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BannerCard
        banner={banner}
        onSelect={() => onSelect(banner)}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
      />
    </div>
  );
}
