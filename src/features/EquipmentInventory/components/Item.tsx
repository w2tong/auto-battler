import { equips } from '@wholesome-sisters/auto-battler';
import { useDraggable, useDndMonitor } from '@dnd-kit/core';
import { CSSProperties, useState } from 'react';
import { tierBorderColor } from '../../../utils/tierColor';
import ItemTooltip from '../../../components/ItemTooltip';

export default function Item({ id, itemId, filtered }: { id: string, itemId: string, filtered: boolean; }) {
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

    const item = equips[itemId];
    // TODO: add tooltip (tooltip loads on hoverover and stays in DOM)

    return (
        <ItemTooltip item={item} display={!dragging}>
            <div style={style} className={`w-[64px] h-[64px] box-border border-solid border-2 rounded-xs ${tierBorderColor[item.tier]} ${filtered ? 'opacity-20' : 'opacity-100'}`} ref={setNodeRef} {...listeners} {...attributes}>
                <img src={`/item-icons/${item.img ? item.img : 'placeholder.png'}`} />
            </div>
        </ItemTooltip>
    );
}