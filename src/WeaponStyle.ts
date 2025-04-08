import { Weapon, WeaponTypeProperties } from './Equipment/Weapon';

enum WeaponStyle {
    DualWield = 'Dual Wield',
    TwoHanded = 'Two-Handed',
    OneHanded = 'One-Handed',
    Ranged = 'Ranged'
}

function getWeaponStyle({ mainHand, offHand }: { mainHand?: Weapon, offHand?: Weapon }): WeaponStyle {
    if (mainHand && offHand) {
        return WeaponStyle.DualWield;
    }
    else if (mainHand && WeaponTypeProperties[mainHand.type].twoHanded) {
        return WeaponStyle.TwoHanded;
    }
    else {
        return WeaponStyle.OneHanded;
    }
}

export default WeaponStyle;
export { getWeaponStyle };