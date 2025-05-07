import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { ItemType, equips } from '@wholesome-sisters/auto-battler';
import SelectFilter from './SelectFilter';

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

export default function Inventory({ items }: { items: (string | null)[]; }) {
    const [tierFilter, setTierFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>('');

    function setTier(tier: string) {
        setTierFilter(() => tier);
    }
    function setType(type: string) {
        setTypeFilter(() => type);
    }

    return (
        <div className='flex flex-col'>
            <div>
                <h2 className='py-1'>Inventory</h2>
                <div className='flex flex-row py-1'>
                    <SelectFilter options={tierOptions} callback={setTier} id='tier' label='Tier' />
                    <SelectFilter options={typeOptions} callback={setType} id='type' label='Type' />
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
                    if (itemId) {
                        const equip = equips[itemId];
                        if (
                            tierFilter !== '' && tierFilter !== equip.tier + '' ||
                            typeFilter !== '' && typeFilter !== equip.itemType ||
                            nameFilter && !equip.name.toLocaleLowerCase().includes(nameFilter)
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