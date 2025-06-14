import AttackType from '../../../types/AttackType';
import StatType from '../../../Character/Stats/StatType';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type GreatswordId = 'greatsword0' | 'greatsword1' | 'greatsword2' | 'greatsword3' | 'greatsword4' | 'greatsword5';

const greatswords: { [id in GreatswordId]: Weapon } = {
    greatsword0: {
        id: 'greatsword0',
        itemType: ItemType.Weapon,
        name: 'Greatsword',
        tier: 0,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 0 },
        stats: {
            [StatType.ArmourPenetration]: 10
        }
    },
    greatsword1: {
        id: 'greatsword1',
        itemType: ItemType.Weapon,
        name: 'Greatsword +1',
        tier: 1,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 2 },
        stats: {
            [StatType.ArmourPenetration]: 12
        }
    },
    greatsword2: {
        id: 'greatsword2',
        itemType: ItemType.Weapon,
        name: 'Greatsword +2',
        tier: 2,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 4 },
        stats: {
            [StatType.ArmourPenetration]: 14
        }
    },
    greatsword3: {
        id: 'greatsword3',
        itemType: ItemType.Weapon,
        name: 'Greatsword +3',
        tier: 3,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 6 },
        stats: {
            [StatType.ArmourPenetration]: 16
        }
    },
    greatsword4: {
        id: 'greatsword4',
        itemType: ItemType.Weapon,
        name: 'Greatsword +4',
        tier: 4,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 8 },
        stats: {
            [StatType.ArmourPenetration]: 18
        }
    },
    greatsword5: {
        id: 'greatsword5',
        itemType: ItemType.Weapon,
        name: 'Greatsword +5',
        tier: 5,

        type: WeaponType.Greatsword,
        attackType: AttackType.MeleeWeapon,
        damageRange: { min: 4, max: 8, bonus: 10 },
        stats: {
            [StatType.ArmourPenetration]: 20
        }
    },
} as const;

export { GreatswordId, greatswords };