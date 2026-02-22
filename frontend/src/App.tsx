import './App.css'
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Experiences from "./components/Experiences";
import userIcon from "./assets/user-icon.png";
import { SocialMedias } from "./components/SocialMedias";

import { user, experiences, drawings, socialMedia } from "./users/kubra-gonen";
import DraggableDrawing from "./components/Drawing/DraggableDrawing";

function App() {
  const [order, setOrder] = useState<number[]>(() =>
    drawings.map((_, i) => i)
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as number);
        const newIndex = prev.indexOf(over.id as number);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-full p-6 justify-center items-center">
        <h1 className="bg-gray-700 bg-clip-text text-5xl font-extrabold text-transparent ...">
          {user.name}
        </h1>
        <h2 className="text-gray-500 text-2xl">{user.role}</h2>

        <SocialMedias socialMedias={socialMedia} />

        <hr className="my-4 h-[1.75px]" />

        <div className="flex flex-row gap-4 mt-8 items-center">
          <img src={userIcon} alt="user" className="w-8 h-8 filter grayscale" />
          <span className="text-gray-500 text-2xl">About me</span>
        </div>

        <hr className="my-4 bg-gray-500 h-[1.75px]" />

        <div className="flex flex-col gap-2 text-justify">
          <span className="text-gray-500 ">{user.description}</span>
        </div>

        <hr className="my-4 bg-gray-500 h-[1.75px]" />

        <Experiences experiences={experiences} title="Experiences" />

        <hr className="my-4 bg-gray-500 h-[1.75px]" />

        <h2 className="text-gray-500 text-2xl">Portfolio</h2>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              {order.map((drawingIndex) => (
                <DraggableDrawing
                  key={drawingIndex}
                  id={drawingIndex}
                  image={drawings[drawingIndex].image}
                  title={drawings[drawingIndex].title}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App
