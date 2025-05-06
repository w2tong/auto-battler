import { createContext, useContext } from "react";
import { LocalStorageInventory } from "../../types/LocalStorage";

export type Action =
    { type: 'update'; index?: number, itemId: string | null; } |
    { type: 'swap'; index1: number, index2: number; };

export const InventoryContext = createContext<LocalStorageInventory>([]);
export const InventoryDispatchContext = createContext<React.ActionDispatch<[action: Action]>>(() => { });

export function useInventory() {
    return useContext(InventoryContext);
}
export function useInventoryDispatch() {
    return useContext(InventoryDispatchContext);
}