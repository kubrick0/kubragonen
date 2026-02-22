import { useState, useEffect } from "react";
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
import Experiences from "../Experiences";
import userIcon from "../../assets/user-icon.png";
import { SocialMedias } from "../SocialMedias";
import { user, experiences, socialMedia } from "../../users/kubra-gonen";
import DraggableDrawing from "../Drawing/DraggableDrawing";
import Drawing from "../Drawing/Drawing";
import { fetchPortfolio, reorderPortfolio, type PortfolioItem } from "../../api/portfolio";

const PORTFOLIO_USER = "kubra-gonen";

type Props = {
  canDrag?: boolean;
  header?: React.ReactNode;
};

export default function PortfolioPage({ canDrag = false, header }: Props) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio(PORTFOLIO_USER)
      .then((items) => {
        setPortfolioItems(items);
        setOrder(items.map((_, i) => i));
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Erro"))
      .finally(() => setLoading(false));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id as number);
    const newIndex = order.indexOf(over.id as number);
    const newOrder = arrayMove(order, oldIndex, newIndex);
    setOrder(newOrder);

    const updates = newOrder.map((idx, pos) => {
      const item = portfolioItems[idx];
      return item ? { id: item.id, position: pos } : null;
    }).filter(Boolean) as { id: string; position: number }[];

    try {
      await reorderPortfolio(updates);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar ordem");
      setOrder(order);
    }
  };

  const orderedItems = order.map((idx) => portfolioItems[idx]).filter(Boolean);

  return (
    <div>
      {header}
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

        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p className="text-gray-500">Loading portfolio...</p>
        ) : canDrag ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={order} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-4 justify-items-center">
                {order.map((index) => {
                  const item = portfolioItems[index];
                  if (!item) return null;
                  return (
                    <DraggableDrawing
                      key={item.id}
                      id={index}
                      image={item.path}
                      title={item.name}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {orderedItems.map((item) => (
              <div key={item.id}>
                <Drawing image={item.path} title={item.name} />
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
