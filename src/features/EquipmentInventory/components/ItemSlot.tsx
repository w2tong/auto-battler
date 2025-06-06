import { useDroppable } from '@dnd-kit/core';
import { EquipSlot, isValidEquip } from '@wholesome-sisters/auto-battler';
import inventorySlot from '../assets/inventory.png';

import neck from '../assets/neck.png';
import armour from '../assets/armour.png';
import waist from '../assets/waist.png';
import hands from '../assets/hands.png';
import head from '../assets/head.png';
import mainHand from '../assets/mainhand.png';
import offHand from '../assets/offHand.png';
import potion from '../assets/potion.png';
import ring from '../assets/ring.png';
import DraggableItem from './DraggableItem';

const icons: { [key in EquipSlot]: string } = {
    [EquipSlot.MainHand]: mainHand,
    [EquipSlot.OffHand]: offHand,
    [EquipSlot.Armour]: armour,
    [EquipSlot.Head]: head,
    [EquipSlot.Hands]: hands,
    [EquipSlot.Ring1]: ring,
    [EquipSlot.Ring2]: ring,
    [EquipSlot.Potion]: potion,
    [EquipSlot.Waist]: waist,
    [EquipSlot.Neck]: neck
};

export default function ItemSlot({ id, itemId, filtered, slot, onRightClick }: { id: string, itemId: string | null, filtered: boolean, slot?: EquipSlot; onRightClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; }) {
    const { isOver, setNodeRef, over, active } = useDroppable({
        id,
        data: { itemId }
    });

    let borderColor = 'border-zinc-700';
    if (isOver && over && active?.data.current?.itemId) {
        const activeItemId = active.data.current.itemId;
        if (isNaN(parseInt(over.id.toString()))) {
            borderColor = isValidEquip(activeItemId, over.id as EquipSlot) ? 'border-positive' : 'border-negative';
        }
        else {
            borderColor = 'border-white';
        }
    }

    return (
        <div
            style={{ backgroundImage: `url(${slot ? icons[slot] : inventorySlot})` }}
            className={`w-[36px] h-[36px] lg:w-[52px] lg:h-[52px] xl:w-[68px] xl:h-[68px] border-2 rounded-sm bg-center bg-no-repeat ${borderColor}`}
            ref={setNodeRef}
            onContextMenu={onRightClick}
        >
            {itemId ? <DraggableItem id={id} itemId={itemId} filtered={filtered} /> : null}
        </div>
    );
}