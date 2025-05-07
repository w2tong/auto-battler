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
            <div style={style} className={`z-10 w-[64px] h-[64px] box-border border-solid rounded-xs bg-black ${tierBorderColor[item.tier]} ${filtered ? '' : 'border-2'}`} ref={setNodeRef} {...listeners} {...attributes}>
                <img src={`/item-icons/${item.img ? item.img : 'placeholder.png'}`} className={filtered ? 'opacity-20' : 'opacity-100'} />
            </div>
        </ItemTooltip>
    );
}