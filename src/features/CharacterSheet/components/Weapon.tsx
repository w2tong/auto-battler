import { Tier, WeaponType } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "../../../utils/tierColor";

type WeaponProps = { name: string, type: WeaponType, min: number, max: number, accuracy: number, tier: Tier; };
function Weapon({ name, type, min, max, accuracy, tier }: WeaponProps) {
    return (
        <div>
            <div className={`font-bold ${tierTextColor[tier]}`}>{name}</div>
            <hr />
            <div>{type}</div>
            <div>{Number(accuracy.toFixed(1))} Accuracy</div>
            <div>{Number(min.toFixed(1))} - {Number(max.toFixed(1))} Damage</div>
        </div>
    );
}

export default Weapon;
export type { WeaponProps };