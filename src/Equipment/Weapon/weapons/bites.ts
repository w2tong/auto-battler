import AttackType from '../../../AttackType';
import Character from '../../../Character/Character';
import DamageType from '../../../DamageType';
import DebuffId from '../../../StatusEffect/DebuffId';
import { ItemType } from '../../Item';
import { type Weapon, WeaponType } from '../Weapon';

type BiteId = 'poisonbite0' | 'poisonbite1';

const bites: { [id in BiteId]: Weapon } = {
    poisonbite0: {
        id: 'poisonbite0',
        itemType: ItemType.Weapon,
        name: 'Poison Bite',
        tier: 0,
        img: '',

        type: WeaponType.Unarmed,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 1, max: 3, bonus: 0 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(DebuffId.Poisoned, self, 2);
            },
            description: 'Inflict 1 Poison on hit.'
        }
    },
    poisonbite1: {
        id: 'poisonbite1',
        itemType: ItemType.Weapon,
        name: 'Poison Bite +1',
        tier: 1,
        img: '',

        type: WeaponType.Unarmed,
        attackType: AttackType.MeleeWeapon,
        damageType: DamageType.Physical,
        damageRange: { min: 1, max: 3, bonus: 1 },
        onHit: {
            func: (self: Character, target: Character) => {
                target.statusEffectManager.addDebuff(DebuffId.Poisoned, self, 2);
            },
            description: 'Inflict 2 Poison on hit.'
        }
    }
} as const;

export { BiteId, bites };