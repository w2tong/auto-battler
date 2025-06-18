import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ActionUpdateEquipment, useCharacters, useCharactersDispatch } from "@contexts/Characters/CharactersContext";
import Equipment from "./components/Equipment";
import Inventory from "./components/Inventory";
import { equips, EquipSlot, isValidEquip, ItemId, ItemType, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";
import { useInventory, useInventoryDispatch } from "@contexts/Inventory/InventoryContext";
import { useState } from "react";
import ItemSort from "../../types/ItemSort";
import { cn } from "@utils/utils";
import Trash from "./components/Trash";
import { TRASH_ID } from "@/utils/constants";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { LocalStorageKey } from "@/types/LocalStorage";

export default function EquipmentInventory({ className }: { className?: string; }) {
    const { list, selected } = useCharacters();
    const charactersDispatch = useCharactersDispatch();
    const equipment = list[selected].equipment;

    const inventory = useInventory();
    const inventoryDispatch = useInventoryDispatch();

    const [inventorySort, setInventorySort] = useState<string>('');

    const [trashItemId, setTrashItemId] = useLocalStorage<ItemId | null>(LocalStorageKey.Trash, null);

    function handleSortOnChange(sort: string) {
        setInventorySort(() => sort);
        inventoryDispatch({ type: 'sort', sort: sort as ItemSort });
    }

    function resetInventorySort() {
        setInventorySort(() => '');
    }

    return (
        <div className={cn('flex flex-row space-x-4', className)}>
            <DndContext onDragEnd={handleDragEnd}>
                <Equipment equipment={equipment} />
                <Inventory
                    items={inventory}
                    sort={inventorySort}
                    sortOnChange={handleSortOnChange}
                />
                <Trash itemId={trashItemId} />
            </DndContext>
        </div >
    );

    function handleDragEnd(event: DragEndEvent) {
        if (!event.over || selected < 0) return;
        const equipSlots = Object.values(EquipSlot);

        const activeId = event.active.id;
        const overId = event.over.id;
        if (activeId === overId) return;

        const activeIsEquip = equipSlots.includes(activeId as EquipSlot);
        const overIsEquip = equipSlots.includes(overId as EquipSlot);

        const activeIsInv = !isNaN(Number(activeId));
        const overIsInv = !isNaN(Number(overId));

        const activeIsTrash = activeId === TRASH_ID;
        const overIsTrash = overId === TRASH_ID;

        // Equipment Item dragged to Equipment Slot 
        if (activeIsEquip && overIsEquip) {
            const equipActiveId = activeId as EquipSlot;
            const equipOverId = overId as EquipSlot;

            if (equipment[equipActiveId] && !isValidEquip(equipment[equipActiveId], equipOverId)) return;
            if (equipment[equipOverId] && !isValidEquip(equipment[equipOverId], equipOverId)) return;

            charactersDispatch({ type: 'swapEquipment', index: selected, slot1: equipActiveId, slot2: equipOverId });
        }
        // Equipment Item dragged to Inventory Slot
        else if (activeIsEquip && overIsInv) {
            const equipActiveId = activeId as EquipSlot;
            const invOverId = Number(overId);
            const equipItem = equipment[equipActiveId];
            const invItem = inventory[invOverId] ?? null;

            if (!equipItem) return;

            const equipChanges: ActionUpdateEquipment = { [equipActiveId]: invItem };
            resetInventorySort();
            inventoryDispatch({ type: 'update', index: invOverId, itemId: equipItem });

            if (equipItem && invItem) {
                if (!isValidEquip(invItem, equipActiveId)) return;
                // Unequip off hand if equipping two-handed weapon
                if (equipActiveId === EquipSlot.MainHand) {
                    const item = equips[invItem];
                    if (item.itemType === ItemType.Weapon && WeaponTypeProperties[item.type].twoHanded && equipment[EquipSlot.OffHand]) {
                        inventoryDispatch({ type: 'update', itemId: equipment[EquipSlot.OffHand] });
                        equipChanges[EquipSlot.OffHand] = null;
                    }
                }
            }

            charactersDispatch({ type: 'update', index: selected, equipment: equipChanges });
        }
        // Inventory Item dragged to Equipment Slot
        else if (activeIsInv && overIsEquip) {
            const invActiveId = Number(activeId);
            const equipOverId = overId as EquipSlot;
            const equipItem = equipment[equipOverId];
            const invItem = inventory[invActiveId];

            if (invItem === null) return;
            if (!isValidEquip(invItem, equipOverId)) return;

            const equipChanges: ActionUpdateEquipment = { [equipOverId]: invItem };
            resetInventorySort();
            inventoryDispatch({ type: 'update', index: invActiveId, itemId: equipItem });

            // Unequip off hand if equipping two-handed weapon
            if (equipOverId === EquipSlot.MainHand) {
                const item = equips[invItem];
                if (item.itemType === ItemType.Weapon && WeaponTypeProperties[item.type].twoHanded && equipment[EquipSlot.OffHand]) {
                    inventoryDispatch({ type: 'update', itemId: equipment[EquipSlot.OffHand] });
                    equipChanges[EquipSlot.OffHand] = null;
                }
            }
            // Unequip main hand if its two-handed
            else if (equipOverId === EquipSlot.OffHand && equipment[EquipSlot.MainHand]) {
                const mainHand = equips[equipment[EquipSlot.MainHand]];
                if (mainHand.itemType === ItemType.Weapon && WeaponTypeProperties[mainHand.type].twoHanded) {
                    inventoryDispatch({ type: 'update', itemId: equipment[EquipSlot.MainHand] });
                    equipChanges[EquipSlot.MainHand] = null;
                }
            }

            charactersDispatch({ type: 'update', index: selected, equipment: equipChanges });
        }
        // Inventory Item dragged to Inventory Slot
        else if (activeIsInv && overIsInv) {
            const invActiveId = Number(activeId);
            const invOverId = Number(overId);
            resetInventorySort();
            inventoryDispatch({ type: 'swap', index1: invActiveId, index2: invOverId });
        }
        // Inventory Item dragged to Inventory Slot
        else if (activeIsInv && overIsTrash) {
            const invActiveId = Number(activeId);
            const itemId = inventory[invActiveId];
            inventoryDispatch({ type: 'update', index: invActiveId, itemId: null });
            setTrashItemId(itemId);
        }
        // Trash dragged to 
        else if (activeIsTrash && overIsInv) {
            const overInvId = Number(overId);
            if (inventory[overInvId] !== null) {
                toast('You must move this item to an empty slot.');
            }
            else {
                const itemId = trashItemId;
                inventoryDispatch({ type: 'update', index: overInvId, itemId });
                setTrashItemId(null);
            }
        }
        else {
            toast('You cannot move items between Equipment and Trash.');
        }
    }
}