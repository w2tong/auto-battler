import { WeaponType } from "@wholesome-sisters/auto-battler";

type WeaponProps = { name: string, type: WeaponType, min: number, max: number, accuracy: number; };
function Weapon({ name, type, min, max, accuracy }: WeaponProps) {
    return (
        <div>
            <div>{name} </div>
            <div>{type}</div>
            <div>{accuracy} Accuracy</div>
            <div>{min}-{max} Damage</div>
        </div>
    );
}

export default Weapon;
export type { WeaponProps };