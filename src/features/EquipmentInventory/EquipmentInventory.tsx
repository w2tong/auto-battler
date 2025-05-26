import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ActionUpdateEquipment, useCharacters, useCharactersDispatch, useSelected } from "../../hooks/Characters/CharactersContext";
import Equipment from "./components/Equipment";
import Inventory from "./components/Inventory";
import { equips, EquipSlot, isValidEquip, ItemType, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";
import { useInventory, useInventoryDispatch } from "../../hooks/Inventory/InventoryContext";
import { useState } from "react";
import ItemSort from "../../types/ItemSort";
import { cn } from "../../utils/utils";

export default function EquipmentInventory({ className }: { className?: string; }) {
    const characters = useCharacters();
    const charactersDispatch = useCharactersDispatch();
    const { selected } = useSelected();
    const equipment = characters[selected].equipment;

    const inventory = useInventory();
    const inventoryDispatch = useInventoryDispatch();

    const [inventorySort, setInventorySort] = useState<string>('');

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
                <Inventory items={inventory} sort={inventorySort} sortOnChange={handleSortOnChange} />
            </DndContext>
        </div >
    );

    function handleDragEnd(event: DragEndEvent) {
        if (!event.over || selected < 0) return;
        const equipSlots = Object.values(EquipSlot);

        const activeId = event.active.id;
        const overId = event.over.id;
        if (event.active.id === event.over.id) return;

        const activeIsEquip = equipSlots.includes(event.active.id as EquipSlot);
        const overIsEquip = equipSlots.includes(event.over.id as EquipSlot);

        // Equipment Item dragged to Equipment Slot 
        if (activeIsEquip && overIsEquip) {
            const equipActiveId = activeId as EquipSlot;
            const equipOverId = overId as EquipSlot;

            if (equipment[equipActiveId] && !isValidEquip(equipment[equipActiveId], equipOverId)) return;
            if (equipment[equipOverId] && !isValidEquip(equipment[equipOverId], equipOverId)) return;

            charactersDispatch({ type: 'swapEquipment', index: selected, slot1: equipActiveId, slot2: equipOverId });
        }
        // Equipment Item dragged to Inventory Slot
        else if (activeIsEquip) {
            const activeEquipId = activeId as EquipSlot;
            const iOverId = Number(overId);
            const equipItem = equipment[activeEquipId];
            const invItem = inventory[iOverId] ?? null;

            if (!equipItem) return;

            const equipChanges: ActionUpdateEquipment = { [activeEquipId]: invItem };
            resetInventorySort();
            inventoryDispatch({ type: 'update', index: iOverId, itemId: equipItem });

            if (equipItem && invItem) {
                if (!isValidEquip(invItem, activeEquipId)) return;
                // Unequip off hand if equipping two-handed weapon
                if (activeEquipId === EquipSlot.MainHand) {
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
        else if (overIsEquip) {
            const iActiveId = Number(activeId);
            const overEquipId = overId as EquipSlot;
            const equipItem = equipment[overEquipId];
            const invItem = inventory[iActiveId];

            if (invItem === null) return;
            if (!isValidEquip(invItem, overEquipId)) return;

            const equipChanges: ActionUpdateEquipment = { [overEquipId]: invItem };
            resetInventorySort();
            inventoryDispatch({ type: 'update', index: iActiveId, itemId: equipItem });

            // Unequip off hand if equipping two-handed weapon
            if (overEquipId === EquipSlot.MainHand) {
                const item = equips[invItem];
                if (item.itemType === ItemType.Weapon && WeaponTypeProperties[item.type].twoHanded && equipment[EquipSlot.OffHand]) {
                    inventoryDispatch({ type: 'update', itemId: equipment[EquipSlot.OffHand] });
                    equipChanges[EquipSlot.OffHand] = null;
                }
            }
            // Unequip main hand if its two-handed
            else if (overEquipId === EquipSlot.OffHand && equipment[EquipSlot.MainHand]) {
                const mainHand = equips[equipment[EquipSlot.MainHand]];
                if (mainHand.itemType === ItemType.Weapon && WeaponTypeProperties[mainHand.type].twoHanded) {
                    inventoryDispatch({ type: 'update', itemId: equipment[EquipSlot.MainHand] });
                    equipChanges[EquipSlot.MainHand] = null;
                }
            }

            charactersDispatch({ type: 'update', index: selected, equipment: equipChanges });
        }
        // Inventory Item dragged to Inventory Slot
        else {
            const iActiveId = Number(activeId);
            const iOverId = Number(overId);
            resetInventorySort();
            inventoryDispatch({ type: 'swap', index1: iActiveId, index2: iOverId });
        }
    }
}