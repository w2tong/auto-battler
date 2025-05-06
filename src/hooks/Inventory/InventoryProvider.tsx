import { ReactNode, useEffect, useReducer } from 'react';
import { InventoryContext, InventoryDispatchContext, Action } from './InventoryContext';
import { LocalStorageInventory } from '../../types/LocalStorage';

export function InventoryProvider({ children }: { children: ReactNode; }) {
    const lsInventory = localStorage.getItem('inventory');
    const [inventory, dispatch] = useReducer(inventoryReducer, lsInventory ? JSON.parse(lsInventory) : []);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    return (
        <InventoryContext.Provider value={inventory}>
            <InventoryDispatchContext.Provider value={dispatch}>
                {children}
            </InventoryDispatchContext.Provider>
        </InventoryContext.Provider>
    );
}

function inventoryReducer(inventory: LocalStorageInventory, action: Action): LocalStorageInventory {
    switch (action.type) {
        case 'update': {
            if (action.itemId === null && action.index === undefined) return inventory;
            // Add to specific index
            if (action.index !== undefined) {
                return [
                    ...inventory.slice(0, action.index),
                    action.itemId,
                    ...inventory.slice(action.index + 1)
                ];
            }

            // Add to first empty slot
            const index = inventory.indexOf(null);
            if (index === -1) {
                return [...inventory, action.itemId];
            }
            else {
                return [
                    ...inventory.slice(0, index),
                    action.itemId,
                    ...inventory.slice(index + 1)
                ];
            }
        }
        case 'swap': {
            const inv: LocalStorageInventory = structuredClone(inventory);
            [inv[action.index1], inv[action.index2]] = [inv[action.index2], inv[action.index1]];
            return inv;
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
};