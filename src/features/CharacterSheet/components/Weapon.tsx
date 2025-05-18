import { Tier, WeaponType } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "../../../utils/tierColor";
import { formatNum } from "../../../utils/stats";

type WeaponProps = { name: string, type: WeaponType, min: number, max: number, accuracy: number, tier: Tier; };
function Weapon({ name, type, min, max, accuracy, tier }: WeaponProps) {
    return (
        <div>
            <div className={`font-bold ${tierTextColor[tier]}`}>{name}</div>
            <hr />
            <div>{type}</div>
            <div>{formatNum(accuracy)} Accuracy</div>
            <div>{formatNum(min)} - {formatNum(max)} Damage</div>
        </div>
    );
}

export default Weapon;
export type { WeaponProps };