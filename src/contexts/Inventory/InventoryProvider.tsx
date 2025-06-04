import { ReactNode } from 'react';
import { InventoryContext, InventoryDispatchContext, Action } from './InventoryContext';
import { LocalStorageInventory, LocalStorageKey } from '../../types/LocalStorage';
import { Equip, equips } from '@wholesome-sisters/auto-battler';
import ItemSort from '../../types/ItemSort';
import { useLocalStorage } from 'usehooks-ts';

export function InventoryProvider({ children }: { children: ReactNode; }) {
    const [inventory, setInventory] = useLocalStorage<LocalStorageInventory>(LocalStorageKey.Inventory, []);
    function dispatch(action: Action) {
        setInventory(prev => inventoryReducer(prev, action));
    }

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
            const item1 = inv[action.index1] ?? null;
            const item2 = inv[action.index2] ?? null;
            inv[action.index1] = item2;
            inv[action.index2] = item1;
            return inv;
        }
        case 'sort': {
            const sortFn = sortCompareFnMap[action.sort];
            if (sortFn) {
                const inv = inventory.filter(itemId => itemId !== null).map(itemId => equips[itemId]);
                return inv.sort(sortFn).map(item => item.id);
            }
            return inventory;
        }
        case 'import': {
            return action.inventory;
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
};

const sortCompareFnMap: Record<ItemSort, (a: Equip, b: Equip) => number> = {
    'name': (a, b) => a.name.localeCompare(b.name),
    'type': (a, b) => a.itemType.localeCompare(b.itemType),
    'tier-asc': (a, b) => a.tier - b.tier,
    'tier-desc': (a, b) => b.tier - a.tier
};