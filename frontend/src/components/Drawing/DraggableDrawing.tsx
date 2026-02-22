import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import type { ArtProps } from "./types";
import Drawing from "./Drawing";

type Props = ArtProps & {
  id: number;
};

export default function DraggableDrawing({ id, ...drawingProps }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`: undefined,
    transition,
    opacity: 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="select-none cursor-grab active:cursor-grabbing touch-none"
    >
      <Drawing {...drawingProps} />
    </div>
  );
}
