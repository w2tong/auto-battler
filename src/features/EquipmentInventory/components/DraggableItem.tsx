import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { useState, CSSProperties } from "react";
import Item from "./Item";

export default function DraggableItem({ id, itemId, filtered }: { id: string, itemId: string, filtered: boolean; }) {
    const [dragging, setDragging] = useState<boolean>(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { itemId }
    });
    useDndMonitor({
        onDragStart() { setDragging(true); },
        onDragEnd() { setDragging(false); }
    });
    const style: CSSProperties = {
        ...(transform && { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` })
    };

    return (
        <div className='w-full h-full' ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <Item itemId={itemId} filtered={filtered} dragging={dragging} />
        </div>
    );
}