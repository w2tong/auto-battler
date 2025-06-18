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
                        <ItemSlot id={EquipSlot.Head} itemId={equipment[EquipSlot.Head]} slot={EquipSlot.Head} />
                        <ItemSlot id={EquipSlot.Armour} itemId={equipment[EquipSlot.Armour]} slot={EquipSlot.Armour} />
                        <ItemSlot id={EquipSlot.Hands} itemId={equipment[EquipSlot.Hands]} slot={EquipSlot.Hands} />
                        <ItemSlot id={EquipSlot.Waist} itemId={equipment[EquipSlot.Waist]} slot={EquipSlot.Waist} />
                    </div>

                    {/* <div className='w-[136px] h-[272px] bg-secondary' >Character goes here</div> */}

                    <div className='flex-col'>
                        <ItemSlot id={EquipSlot.Neck} itemId={equipment[EquipSlot.Neck]} slot={EquipSlot.Neck} />
                        <ItemSlot id={EquipSlot.Ring1} itemId={equipment[EquipSlot.Ring1]} slot={EquipSlot.Ring1} />
                        <ItemSlot id={EquipSlot.Ring2} itemId={equipment[EquipSlot.Ring2]} slot={EquipSlot.Ring2} />
                        <ItemSlot id={EquipSlot.Potion} itemId={equipment[EquipSlot.Potion]} slot={EquipSlot.Potion} />
                    </div>
                </div>

                <div className='mx-auto flex flex-row justify-center'>
                    <ItemSlot id={EquipSlot.MainHand} itemId={equipment[EquipSlot.MainHand]} slot={EquipSlot.MainHand} />
                    <ItemSlot id={EquipSlot.OffHand} itemId={equipment[EquipSlot.OffHand]} slot={EquipSlot.OffHand} />
                </div>
            </div>
        </div>
    );
}