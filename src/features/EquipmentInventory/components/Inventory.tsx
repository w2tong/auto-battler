import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { ItemType, equips } from '@wholesome-sisters/auto-battler';
import SelectMenu from './SelectMenu';
import { cn } from '../../../utils/utils';
import Switch from '../../../components/Switch';

const tierOptions = [
    { value: '0', text: 'Tier 0' },
    { value: '1', text: 'Tier 1' },
    { value: '2', text: 'Tier 2' },
    { value: '3', text: 'Tier 3' },
    { value: '4', text: 'Tier 4' },
    { value: '5', text: 'Tier 5' }
];

const typeOptions = [
    { value: ItemType.Weapon, text: ItemType.Weapon },
    { value: ItemType.Shield, text: ItemType.Shield },
    { value: ItemType.Head, text: ItemType.Head },
    { value: ItemType.Armour, text: ItemType.Armour },
    { value: ItemType.Hands, text: ItemType.Hands },
    { value: ItemType.Ring, text: ItemType.Ring },
    { value: ItemType.Potion, text: ItemType.Potion },
    { value: ItemType.Waist, text: ItemType.Waist },
    { value: ItemType.Neck, text: ItemType.Neck }
];

const sortOptions = [
    { value: 'name', text: 'Name' },
    { value: 'type', text: 'Type' },
    { value: 'tier-asc', text: 'Tier Asc' },
    { value: 'tier-desc', text: 'Tier Desc' }
];

// TODO: add keywords thats can be used in name filter (e.g. Attributes, Stats, on hit)
export default function Inventory({ items, sort, sortOnChange, className, onItemRightClick }: { items: (string | null)[], sort: string, sortOnChange: (val: string) => void, className?: string; onItemRightClick?: (index: number) => void; }) {
    const [tierFilter, setTierFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>('');
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
                <h2 className='py-1'>Inventory</h2>
                <div className='flex flex-row py-1 items-center'>
                    <SelectMenu options={tierOptions} onChange={updateTier} id='tier' label='Filter by Tier' value={tierFilter} />
                    <SelectMenu options={typeOptions} onChange={updateType} id='type' label='Filter by Type' value={typeFilter} />
                    <div className='flex flex-col'>
                        <label htmlFor='sort'>Sort by</label>
                        <select className='border border-white' id='sort' value={sort} onChange={e => sortOnChange(e.target.value)}>
                            {[{ value: '', text: '-' }, ...sortOptions].map(opt =>
                                <option className='bg-black' key={opt.value} value={opt.value}>{opt.text}</option>
                            )}
                        </select>
                    </div>
                    <input
                        className='border border-white p-2'
                        type='text'
                        placeholder='Filter By Name'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <div className='flex flex-row items-center'>
                        Delete Mode: <Switch checked={sellMode} onChange={setSellMode} className='ml-2' />
                    </div>
                </div>
            </div>

            <div className='flex flex-row flex-wrap content-start gap-0.5'>
                {[...items, null].map((itemId, i) => {
                    let filtered = false;
                    if (itemId && (tierFilter !== '' || typeFilter !== '' || nameFilter !== '')) {
                        const equip = equips[itemId];
                        if (
                            tierFilter !== '' && tierFilter !== equip.tier.toString() ||
                            typeFilter !== '' && typeFilter !== equip.itemType ||
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