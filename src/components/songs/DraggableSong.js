import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const DraggableSong = ({ song, index, moveSong }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "song",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveSong(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "song",
    item: { id: song.id, index: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <div
      className={`my-1 p-1 ${(index % 2) === 0 ? "bg-white/20" : "bg-white/40"}`}
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      {song.title}
    </div>
  );
};
