import { ClassName } from '../Character/Classes/classes';
import { armour } from './Armour';
import { Equipment } from './Equipment';
import { shields } from './Shield';
import { weapons } from './Weapon';

const defaultEquipment: {[name in ClassName]: Equipment} = {
    [ClassName.Fighter]: {
        mainHand: weapons.longsword0,
        offHandShield: shields.buckler0,
        armour: armour.plateArmour0
    },
    [ClassName.Rogue]: {
        mainHand: weapons.dagger0,
        offHandWeapon: weapons.dagger0,
        armour: armour.leatherArmour0
    },
    [ClassName.Wizard]: {
        mainHand: weapons.wand0,
        offHandShield: shields.buckler0,
        armour: armour.robe0
    }
};

export default defaultEquipment;