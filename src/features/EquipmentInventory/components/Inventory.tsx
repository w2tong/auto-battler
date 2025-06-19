import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { ItemId, equips } from '@wholesome-sisters/auto-battler';
import { cn } from '@utils/utils';
import { useDebounceValue } from 'usehooks-ts';
import { Input } from '@/components/ui/input';
import InventoryTierFilter from './InventoryTierFilter';
import { FILTER_NONE_VALUE } from '@/utils/constants';
import InventoryTypeFilter from './InventoryTypeFilter';
import InventorySort from './InventorySort';

// TODO: add keywords thats can be used in name filter (e.g. Attributes, Stats, on hit)
type InventoryProps = { items: (string | null)[], sort: string, sortOnChange: (val: string) => void, className?: string; };
export default function Inventory({ items, sort, sortOnChange, className }: InventoryProps) {
    const [tierFilter, setTierFilter] = useState<string>(FILTER_NONE_VALUE);
    const [typeFilter, setTypeFilter] = useState<string>(FILTER_NONE_VALUE);
    const [nameFilter, setNameFilter] = useDebounceValue<string>('', 100);

    function updateTier(tier: string) {
        setTierFilter(() => tier);
    }
    function updateType(type: string) {
        setTypeFilter(() => type);
    }

    return (
        <div className={cn('flex flex-col', className)}>
            <div>
                <h1 className='text-xl font-bold'>Inventory</h1>
                <div className='flex flex-row flex-wrap py-1 items-end space-x-2 text-sm'>
                    <Input
                        className='min-w-30 max-w-48 h-8'
                        type='text'
                        name='Name Filter'
                        placeholder='Filter By Name'
                        onChange={e => setNameFilter(e.target.value)}
                    />
                    <InventorySort value={sort} onChange={sortOnChange} />
                    <InventoryTierFilter value={tierFilter} onChange={updateTier} />
                    <InventoryTypeFilter value={typeFilter} onChange={updateType} />
                </div>
            </div>

            <div className='flex flex-row flex-wrap content-start gap-0.5 touch-manipulation'>
                {[...items, null].map((itemId, i) => {
                    let filtered = false;
                    if (itemId && (tierFilter !== FILTER_NONE_VALUE || typeFilter !== FILTER_NONE_VALUE || nameFilter !== '')) {
                        const equip = equips[itemId as ItemId];
                        if (
                            tierFilter !== FILTER_NONE_VALUE && tierFilter !== equip.tier.toString() ||
                            typeFilter !== FILTER_NONE_VALUE && typeFilter !== equip.itemType ||
                            nameFilter !== '' && !equip.name.toLocaleLowerCase().includes(nameFilter.trim().toLocaleLowerCase())
                        ) filtered = true;
                    }
                    return (
                        <ItemSlot
                            id={`${i}`}
                            key={i}
                            itemId={itemId}
                            filtered={filtered}
                            slot='inventory'
                        />
                    );
                }
                )}
            </div>
        </div>
    );
}