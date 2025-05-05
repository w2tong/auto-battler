import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ActionUpdateEquipment, useCharacters, useCharactersDispatch, useSelected } from "../../hooks/Characters/CharactersContext";
import Equipment from "./components/Equipment";
import Inventory from "./components/Inventory";
import { useEffect, useState } from "react";
import { equips, EquipSlot, isValidEquip, ItemType, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";

export default function EquipmentInventory() {
    const characters = useCharacters();
    const dispatch = useCharactersDispatch();
    const { selected } = useSelected();
    const equipment = characters[selected].equipment;

    const lsInventory = localStorage.getItem('inventory');
    const [inventory, setInventory] = useState<(string | null)[]>(lsInventory ? JSON.parse(lsInventory) : []);

    function addToInventory(itemId: string | null, index?: number) {
        console.log('addToInventory', itemId, index);
        if (itemId === null && index === undefined) return;
        setInventory(inv => {
            // Add to specific index
            if (index !== undefined) {
                const newInv = inv.slice();
                newInv[index] = itemId;
                return newInv;
            }

            // Add to first empty slot
            index = inv.indexOf(null);
            if (index === -1) {
                return [...inv, itemId];
            }
            else {
                const newInv = inv.slice();
                newInv[index] = itemId;
                return newInv;
            }
        });
    }

    function swapInventory(index1: number, index2: number) {
        setInventory(inv => {
            const newInv = inv.slice();
            [newInv[index1], newInv[index2]] = [newInv[index2], newInv[index1]];
            return newInv;
        });
    }

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='flex flex-row'>
                <Equipment equipment={equipment} />
                <Inventory items={inventory} />
            </div>
        </DndContext>
    );

    async function handleDragEnd(event: DragEndEvent) {
        // console.log()
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

            console.log('equip to equip');

            if (equipment[equipActiveId] && !isValidEquip(equipment[equipActiveId], equipOverId)) return;
            if (equipment[equipOverId] && !isValidEquip(equipment[equipOverId], equipOverId)) return;

            dispatch({ type: 'swapEquipment', index: selected, slot1: equipActiveId, slot2: equipOverId });
        }
        // Equipment Item dragged to Inventory Slot
        else if (activeIsEquip) {
            const activeEquipId = activeId as EquipSlot;
            const iOverId = Number(overId);
            const equipItem = equipment[activeEquipId];
            const invItem = inventory[iOverId];

            if (!equipItem) return;

            const equipChanges: ActionUpdateEquipment = { [activeEquipId]: invItem };
            addToInventory(equipItem, iOverId);

            if (equipItem && invItem) {
                if (!isValidEquip(invItem, activeEquipId)) return;
                // Unequip off hand if equipping two-handed weapon
                if (activeEquipId === EquipSlot.MainHand) {
                    const item = equips[invItem];
                    if (item.itemType === ItemType.Weapon && WeaponTypeProperties[item.type].twoHanded && equipment[EquipSlot.OffHand]) {
                        addToInventory(equipment[EquipSlot.OffHand]);
                        equipChanges[EquipSlot.OffHand] = null;
                    }
                }
            }

            dispatch({ type: 'update', index: selected, equipment: equipChanges });
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
            addToInventory(equipItem, iActiveId);

            // Unequip off hand if equipping two-handed weapon
            if (overEquipId === EquipSlot.MainHand) {
                const item = equips[invItem];
                if (item.itemType === ItemType.Weapon && WeaponTypeProperties[item.type].twoHanded && equipment[EquipSlot.OffHand]) {
                    addToInventory(equipment[EquipSlot.OffHand]);
                    equipChanges[EquipSlot.OffHand] = null;
                }
            }
            // Unequip main hand if its two-handed
            else if (overEquipId === EquipSlot.OffHand && equipment[EquipSlot.MainHand]) {
                const mainHand = equips[equipment[EquipSlot.MainHand]];
                if (mainHand.itemType === ItemType.Weapon && WeaponTypeProperties[mainHand.type].twoHanded) {
                    addToInventory(equipment[EquipSlot.MainHand]);
                    equipChanges[EquipSlot.MainHand] = null;
                }
            }

            dispatch({ type: 'update', index: selected, equipment: equipChanges });
        }
        // Inventory Item dragged to Inventory Slot
        else {
            const iActiveId = Number(activeId);
            const iOverId = Number(overId);

            swapInventory(iActiveId, iOverId);
        }
    }
}