import { Tier } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "@utils/tierColor";

export default function CharacterSheetPotion({ name, min, max, charges, tier }: { name: string, min: number, max: number, charges: number, tier: Tier; }) {
    return (
        <div>
            <h4 className='text-lg font-bold'>Potion</h4>
            <div className={`font-bold ${tierTextColor[tier]}`}>{name}</div>
            <div><span className='font-bold'>{min} - {max}</span> healing</div>
            <div><span className='font-bold'>{charges}</span> charge{charges > 1 ? 's' : ''}</div>
        </div>
    );
}