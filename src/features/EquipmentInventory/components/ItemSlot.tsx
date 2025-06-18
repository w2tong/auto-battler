import { useDroppable } from '@dnd-kit/core';
import { EquipSlot, isValidEquip } from '@wholesome-sisters/auto-battler';
import DraggableItem from './DraggableItem';

import mainHand from '@/assets/icons/items/slots/main-hand.png';
import offHand from '@/assets/icons/items/slots/off-hand.png';
import armour from '@/assets/icons/items/slots/armour.png';
import head from '@/assets/icons/items/slots/head.png';
import hands from '@/assets/icons/items/slots/hands.png';
import potion from '@/assets/icons/items/slots/potion.png';
import ring from '@/assets/icons/items/slots/ring.png';
import waist from '@/assets/icons/items/slots/waist.png';
import neck from '@/assets/icons/items/slots/neck.png';
import inventorySlot from '../assets/inventory.png';
import trashCan from '@/assets/icons/items/slots/trash-can.png';

import { TRASH_ID } from '@/utils/constants';

const icons: Record<Slot, string> = {
    [EquipSlot.MainHand]: mainHand,
    [EquipSlot.OffHand]: offHand,
    [EquipSlot.Armour]: armour,
    [EquipSlot.Head]: head,
    [EquipSlot.Hands]: hands,
    [EquipSlot.Ring1]: ring,
    [EquipSlot.Ring2]: ring,
    [EquipSlot.Potion]: potion,
    [EquipSlot.Waist]: waist,
    [EquipSlot.Neck]: neck,
    inventory: inventorySlot,
    trash: trashCan
};

type Slot = EquipSlot | 'inventory' | typeof TRASH_ID;
type ItemSlotProps = {
    id: string,
    itemId: string | null,
    filtered?: boolean,
    slot: Slot;
};
export default function ItemSlot({ id, itemId, filtered = false, slot }: ItemSlotProps) {
    const { isOver, setNodeRef, over, active } = useDroppable({
        id,
        data: { itemId }
    });

    let borderColor = 'border-zinc-700';
    if (isOver && over && active?.data.current?.itemId) {
        const activeItemId = active.data.current.itemId;
        if (over.id !== TRASH_ID && isNaN(parseInt(over.id.toString()))) {
            borderColor = isValidEquip(activeItemId, over.id as EquipSlot) ? 'border-positive' : 'border-negative';
        }
        else {
            borderColor = 'border-white';
        }
    }

    return (
        <div
            style={{ backgroundImage: `url(${icons[slot]})` }}
            className={`bg-cover w-[52px] h-[52px] lg:w-[68px] lg:h-[68px] border-2 rounded-sm bg-center bg-no-repeat ${borderColor}`}
            ref={setNodeRef}
        >
            {itemId ? <DraggableItem id={id} itemId={itemId} filtered={filtered} /> : null}
        </div>
    );
}