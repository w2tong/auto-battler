import Item from './Item';
import { useDroppable } from '@dnd-kit/core';
import { EquipSlot } from '@wholesome-sisters/auto-battler';
import inventorySlot from '../assets/EquipSlotIcons/inventory.png';

import amulet from '../assets/EquipSlotIcons/amulet.png';
import armour from '../assets/EquipSlotIcons/armour.png';
import belt from '../assets/EquipSlotIcons/belt.png';
import hands from '../assets/EquipSlotIcons/hands.png';
import head from '../assets/EquipSlotIcons/head.png';
import mainHand from '../assets/EquipSlotIcons/mainhand.png';
import offHand from '../assets/EquipSlotIcons/offHand.png';
import potion from '../assets/EquipSlotIcons/potion.png';
import ring from '../assets/EquipSlotIcons/ring.png';

const icons: { [key in EquipSlot]: string } = {
    [EquipSlot.MainHand]: mainHand,
    [EquipSlot.OffHand]: offHand,
    [EquipSlot.Armour]: armour,
    [EquipSlot.Head]: head,
    [EquipSlot.Hands]: hands,
    [EquipSlot.Ring1]: ring,
    [EquipSlot.Ring2]: ring,
    [EquipSlot.Potion]: potion,
    [EquipSlot.Belt]: belt,
    [EquipSlot.Amulet]: amulet
};

export default function ItemSlot({ id, itemId, filtered, slot }: { id: string, itemId: string | null, filtered: boolean, slot?: EquipSlot; }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: { itemId }
    });

    const borderColor = isOver ? 'border-green-800' : 'border-zinc-700';

    return (
        <div style={{ backgroundImage: `url(${slot ? icons[slot] : inventorySlot})` }} className={`w-[68px] h-[68px] border-2 rounded-sm bg-center bg-no-repeat ${borderColor}`} ref={setNodeRef}>
            {itemId ? <Item id={id} itemId={itemId} filtered={filtered} /> : null}
        </div>
    );
}