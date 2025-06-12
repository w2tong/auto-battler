import { Tier, WeaponType } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "@utils/tierColor";
import { formatNum } from "@utils/stats";
import { Separator } from "@/components/ui/separator";

type WeaponProps = { name: string, type: WeaponType, min: number, max: number, accuracy: number, tier: Tier; };
function Weapon({ name, type, min, max, accuracy, tier }: WeaponProps) {
    return (
        <div>
            <div className={`font-bold ${tierTextColor[tier]}`}>{name}</div>
            <Separator className='my-1' />
            <div>{type}</div>
            <div><span className='font-bold'>{formatNum(accuracy)}</span> Accuracy</div>
            <div><span className='font-bold'>{formatNum(min)} - {formatNum(max)}</span> Damage</div>
        </div >
    );
}

export default Weapon;
export type { WeaponProps };