import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { ItemType, equips } from '@wholesome-sisters/auto-battler';
import SelectMenu from './SelectMenu';
import { useInventoryDispatch } from '../../../hooks/Inventory/InventoryContext';
import ItemSort from '../../../types/ItemSort';

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

export default function Inventory({ items }: { items: (string | null)[]; }) {
    const [tierFilter, setTierFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>('');
    const inventoryDispatch = useInventoryDispatch();

    function setTier(tier: string) {
        setTierFilter(() => tier);
    }
    function setType(type: string) {
        setTypeFilter(() => type);
    }
    function setSort(sort: string) {
        inventoryDispatch({ type: 'sort', sort: sort as ItemSort });
    }

    return (
        <div className='flex flex-col'>
            <div>
                <h2 className='py-1'>Inventory</h2>
                <div className='flex flex-row py-1'>
                    <SelectMenu options={tierOptions} onChange={setTier} id='tier' label='Tier' />
                    <SelectMenu options={typeOptions} onChange={setType} id='type' label='Type' />
                    <SelectMenu options={sortOptions} onChange={setSort} id='sort' label='Sort' />

                    <input
                        className='border border-white'
                        type='text'
                        placeholder='Filter By Name'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex flex-row flex-wrap content-start gap-0.5'>
                {[...items, null].map((itemId, i) => {
                    let filtered = false;
                    if (itemId && (tierFilter !== '' || typeFilter !== '' || nameFilter !== '')) {
                        const equip = equips[itemId];
                        if (
                            tierFilter !== equip.tier.toString() ||
                            typeFilter !== equip.itemType ||
                            !equip.name.toLocaleLowerCase().includes(nameFilter)
                        ) filtered = true;
                    }
                    return (
                        <ItemSlot id={`${i}`} key={i} itemId={itemId} filtered={filtered} />
                    );
                }
                )}
            </div>
        </div>
    );
}