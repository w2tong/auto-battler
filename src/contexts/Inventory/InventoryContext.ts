import { createContext, useContext } from "react";
import { LocalStorageInventory } from "../../types/LocalStorage";
import type ItemSort from "../../types/ItemSort";
import { ItemId } from "@wholesome-sisters/auto-battler";

export type Action =
    { type: 'update', index?: number, itemId: ItemId | null; } |
    { type: 'swap', index1: number, index2: number; } |
    { type: 'sort', sort: ItemSort; } |
    { type: 'add', itemId: ItemId; } |
    { type: 'import', inventory: LocalStorageInventory; };

export const InventoryContext = createContext<LocalStorageInventory>([]);
export const InventoryDispatchContext = createContext<React.ActionDispatch<[action: Action]>>(() => { });

export function useInventory() {
    return useContext(InventoryContext);
}
export function useInventoryDispatch() {
    return useContext(InventoryDispatchContext);
}