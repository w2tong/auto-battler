import { EquipSlot } from '@wholesome-sisters/auto-battler';
import ItemSlot from './ItemSlot';

export default function Equipment({ equipment }: { equipment: { [slot in EquipSlot]: string | null; }; }) {
    return (
        <>
            <h2 className='py-1'>Equipment</h2>
            <div className='flex-col'>
                <div className='flex flex-row'>
                    <div className='flex-col'>
                        <ItemSlot id={EquipSlot.Head} itemId={equipment[EquipSlot.Head]} filtered={false} slot={EquipSlot.Head} />
                        <ItemSlot id={EquipSlot.Armour} itemId={equipment[EquipSlot.Armour]} filtered={false} slot={EquipSlot.Armour} />
                        <ItemSlot id={EquipSlot.Hands} itemId={equipment[EquipSlot.Hands]} filtered={false} slot={EquipSlot.Hands} />
                        <ItemSlot id={EquipSlot.Belt} itemId={equipment[EquipSlot.Belt]} filtered={false} slot={EquipSlot.Belt} />
                    </div>

                    <div className='w-[136px] h-[272px] bg-secondary' >Character goes here</div>

                    <div className='flex-col'>
                        <ItemSlot id={EquipSlot.Amulet} itemId={equipment[EquipSlot.Amulet]} filtered={false} slot={EquipSlot.Amulet} />
                        <ItemSlot id={EquipSlot.Ring1} itemId={equipment[EquipSlot.Ring1]} filtered={false} slot={EquipSlot.Ring1} />
                        <ItemSlot id={EquipSlot.Ring2} itemId={equipment[EquipSlot.Ring2]} filtered={false} slot={EquipSlot.Ring2} />
                        <ItemSlot id={EquipSlot.Potion} itemId={equipment[EquipSlot.Potion]} filtered={false} slot={EquipSlot.Potion} />
                    </div>
                </div>

                <div className='mx-auto flex flex-row justify-center'>
                    <ItemSlot id={EquipSlot.MainHand} itemId={equipment[EquipSlot.MainHand]} filtered={false} slot={EquipSlot.MainHand} />
                    <ItemSlot id={EquipSlot.OffHand} itemId={equipment[EquipSlot.OffHand]} filtered={false} slot={EquipSlot.OffHand} />
                </div>
            </div>
        </>
    );
}