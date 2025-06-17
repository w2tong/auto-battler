import { EquipSlot } from '@wholesome-sisters/auto-battler';
import ItemSlot from './ItemSlot';
import { cn } from '@utils/utils';

export default function Equipment({ equipment, className }: { equipment: { [slot in EquipSlot]: string | null; }, className?: string; }) {
    return (
        <div className={cn(className)}>
            <h1 className='pb-2 text-xl font-bold'>Equipment</h1>
            <div className='touch-none flex-col'>
                <div className='flex flex-row justify-center'>
                    <div className='flex-col'>
                        <ItemSlot id={EquipSlot.Head} itemId={equipment[EquipSlot.Head]} filtered={false} slot={EquipSlot.Head} />
                        <ItemSlot id={EquipSlot.Armour} itemId={equipment[EquipSlot.Armour]} filtered={false} slot={EquipSlot.Armour} />
                        <ItemSlot id={EquipSlot.Hands} itemId={equipment[EquipSlot.Hands]} filtered={false} slot={EquipSlot.Hands} />
                        <ItemSlot id={EquipSlot.Waist} itemId={equipment[EquipSlot.Waist]} filtered={false} slot={EquipSlot.Waist} />
                    </div>

                    {/* <div className='w-[136px] h-[272px] bg-secondary' >Character goes here</div> */}

                    <div className='flex-col'>
                        <ItemSlot id={EquipSlot.Neck} itemId={equipment[EquipSlot.Neck]} filtered={false} slot={EquipSlot.Neck} />
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
        </div>
    );
}