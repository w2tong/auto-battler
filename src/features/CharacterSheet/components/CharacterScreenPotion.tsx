import { Tier } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "../../../utils/tierColor";

export default function CharacterSheetPotion({ name, min, max, charges, tier }: { name: string, min: number, max: number, charges: number, tier: Tier; }) {
    return (
        <div>
            <h4>Potion</h4>
            <div className={`font-bold ${tierTextColor[tier]}`}>{name}</div>
            <div>{min} - {max} Healing</div>
            <div>{`${charges} charge${charges > 1 ? 's' : ''}`}</div>
        </div>
    );
}