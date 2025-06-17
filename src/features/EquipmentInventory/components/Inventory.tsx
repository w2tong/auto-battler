import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { ItemId, equips } from '@wholesome-sisters/auto-battler';
import { cn } from '@utils/utils';
import Switch from '@components/Switch';
import InfoTooltip from '@components/InfoTooltip';
import { useDebounceValue } from 'usehooks-ts';
import { Input } from '@/components/ui/input';
import InventoryTierFilter from './InventoryTierFilter';
import { FILTER_NONE_VALUE } from '@/utils/constants';
import InventoryTypeFilter from './InventoryTypeFilter';
import InventorySort from './InventorySort';

// TODO: add keywords thats can be used in name filter (e.g. Attributes, Stats, on hit)
export default function Inventory({ items, sort, sortOnChange, className, onItemRightClick }: { items: (string | null)[], sort: string, sortOnChange: (val: string) => void, className?: string; onItemRightClick?: (index: number) => void; }) {
    const [tierFilter, setTierFilter] = useState<string>(FILTER_NONE_VALUE);
    const [typeFilter, setTypeFilter] = useState<string>(FILTER_NONE_VALUE);
    const [nameFilter, setNameFilter] = useDebounceValue<string>('', 100);
    const [sellMode, setSellMode] = useState(false);

    function updateTier(tier: string) {
        setTierFilter(() => tier);
    }
    function updateType(type: string) {
        setTypeFilter(() => type);
    }

    return (
        <div className={cn('flex flex-col', className)}>
            <div>
                <div className='flex flex-row gap-x-2'>
                    <h1 className='text-xl font-bold'>Inventory</h1>
                    <div className='flex flex-row items-center'>
                        <span>Delete Mode <InfoTooltip content={'Enables deleting items from your Inventory with right click.'} /></span>
                        <Switch checked={sellMode} onChange={setSellMode} className='ml-2' />
                    </div>
                </div>
                <div className='flex flex-row flex-wrap py-1 items-end space-x-2 text-sm'>
                    <Input
                        className='min-w-30 max-w-48'
                        type='text'
                        placeholder='Filter By Name'
                        onChange={e => setNameFilter(e.target.value)}
                    />
                    <InventorySort value={sort} onChange={sortOnChange} />
                    <InventoryTierFilter value={tierFilter} onChange={updateTier} />
                    <InventoryTypeFilter value={typeFilter} onChange={updateType} />
                </div>
            </div>

            <div className='flex flex-row flex-wrap content-start gap-0.5 touch-none'>
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
                            onRightClick={onItemRightClick ? (e) => {
                                if (sellMode) {
                                    e.preventDefault();
                                    onItemRightClick(i);
                                }
                            } : undefined}
                        />
                    );
                }
                )}
            </div>
        </div>
    );
}