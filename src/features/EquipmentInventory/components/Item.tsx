import { equips } from '@wholesome-sisters/auto-battler';
import { useDraggable, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { tierBorderColor } from '../../../utils/tierColor';

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
    const style = {
        ...(transform && { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` })
    };

    const item = equips[itemId];
    const icon = (
        <div className='bg-black'>
            <div className={`w-[66px] h-[66px] box-border border-solid border-2 rounded-sm ${tierBorderColor[item.tier]} ${filtered ? 'opacity-20' : 'opacity-100'}`} style={{ backgroundImage: `url(/item-icons/${item.img ? item.img : 'placeholder.png'}` }} />
        </div>
    );

    // TODO: add tooltip (tooltip loads on hoverover and stays in DOM)
    return (
        <div className='w-[66px] h-[66px]' id={`${itemId}`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {icon}
        </div>
    );
}