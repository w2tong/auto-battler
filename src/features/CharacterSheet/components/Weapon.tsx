import { WeaponType } from "@wholesome-sisters/auto-battler";

type WeaponProps = { name: string, type: WeaponType, min: number, max: number, accuracy: number; };
function Weapon({ name, type, min, max, accuracy }: WeaponProps) {
    return (
        <div>
            <div>{name} </div>
            <div>{type}</div>
            <div>{Number(accuracy.toFixed(1))} Accuracy</div>
            <div>{Number(min.toFixed(1))}-{Number(max.toFixed(1))} Damage</div>
        </div>
    );
}

export default Weapon;
export type { WeaponProps };