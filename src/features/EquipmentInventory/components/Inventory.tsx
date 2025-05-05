import { useState } from 'react';
import ItemSlot from './ItemSlot';
import { EquipSlot, ItemType, equips } from '@wholesome-sisters/auto-battler';

const tierOptions = [
    { value: '0', text: 'Tier 0' },
    { value: '1', text: 'Tier 1' },
    { value: '2', text: 'Tier 2' },
    { value: '3', text: 'Tier 3' },
    { value: '4', text: 'Tier 4' },
    { value: '5', text: 'Tier 5' }
];

const itemOptions = [
    { value: ItemType.Weapon, text: ItemType.Weapon },
    { value: ItemType.Shield, text: ItemType.Shield },
    { value: ItemType.Head, text: ItemType.Head },
    { value: ItemType.Armour, text: ItemType.Armour },
    { value: ItemType.Hands, text: ItemType.Hands },
    { value: ItemType.Ring, text: ItemType.Ring },
    { value: ItemType.Potion, text: ItemType.Potion },
    { value: ItemType.Belt, text: ItemType.Belt },
    { value: ItemType.Amulet, text: ItemType.Amulet }
];

export default function Inventory({ items }: { items: (string | null)[]; }) {
    const [tierFilter, setTierFilter] = useState<string | null>(null);
    const [itemFilter, setItemFilter] = useState<string | null>(null);
    const [nameFilter, setNameFilter] = useState<string>('');

    return (
        <>
            <div>
                <h2 className='py-1'>Inventory</h2>
                <div className='flex flex-row py-1'>
                    {/* <SelectFilter placeholder='Filter By Tier' options={tierOptions} setState={setTierFilter} />
                    <SelectFilter placeholder='Filter By Item' options={itemOptions} setState={setItemFilter} /> */}
                    <input
                        type='text'
                        placeholder='Filter By Name'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex flex-row flex-wrap'>
                {[...items, null].map((itemId, i) => {
                    let filtered = false;
                    if (itemId) {
                        const equip = equips[itemId];
                        if (
                            tierFilter && tierFilter !== 'none' && tierFilter !== equip.tier + '' ||
                            itemFilter && itemFilter !== 'none' && itemFilter !== equip.itemType ||
                            nameFilter && !equip.name.toLocaleLowerCase().includes(nameFilter)
                        ) filtered = true;
                    }
                    return (
                        <ItemSlot id={`${i}`} key={i} itemId={itemId} filtered={filtered} />
                    );
                }
                )}
            </div>
        </>
    );
}