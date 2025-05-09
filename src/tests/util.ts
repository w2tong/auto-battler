import Ability from '../Ability/Ability';
import AttackType from '../AttackType';
import BaseAttributes from '../Character/Attributes/BaseAttributes';
import Character from '../Character/Character';
import { PetId } from '../Character/Pet';
import Stat from '../Character/Stats/Stat';
import Stats from '../Character/Stats/Stats';
import { StatTemplate } from '../Character/Stats/StatTemplate';
import StatType from '../Character/Stats/StatType';
import DamageType from '../DamageType';
import { Amulet } from '../Equipment/Amulet';
import { Armour, ArmourType } from '../Equipment/Armour';
import { Belt } from '../Equipment/Belt';
import { EquipmentImport } from '../Equipment/Equipment';
import { Hands } from '../Equipment/Hands';
import { Head } from '../Equipment/Head';
import { ItemType } from '../Equipment/Item';
import { Potion } from '../Equipment/Potion';
import { Ring } from '../Equipment/Ring';
import { Weapon, WeaponType } from '../Equipment/Weapon/Weapon';

function createTestCharacter({ level = 1, attributes = {}, statTemplate = {}, equipment = { mainHand: test1HWeapon }, ability, petId, options }: {
    level?: number, attributes?: BaseAttributes, statTemplate?: StatTemplate, equipment?: EquipmentImport, ability?: Ability, petId?: PetId, options?: { currHealthPc?: number, currManaPc?: number; };
}): Character {
    return new Character({
        name: '',
        level,
        attributes,
        statTemplate,
        equipment,
        ability,
        petId,
        options
    });
}

// function createTestStats(stats: { [key in StatType]?: Stat }) {
//     const equipment: Equipment = {
//         mainHand: test1HWeapon
//     };
//     const stats = new Stats({
//         template: {},
//         attributes: new Attributes({}, {}),
//         equipment: {},
//         level: 1
//     });
// }

function createTestStats(stats: { [key in StatType]?: Stat }, level: number = 1) {
    const res: { [key in StatType]?: Stat } = {
        [StatType.CriticalChance]: { base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0 },
        [StatType.CriticalDamage]: { base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0 },
        [StatType.Dodge]: { base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0 },
        [StatType.ManaCost]: { base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0 },
        [StatType.ManaOnHit]: { base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0 },
        [StatType.ManaRegen]: { base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0 },
        [StatType.MaxHealth]: { base: Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1), attribute: 0, bonus: 0 },
    };

    for (const [key, val] of Object.entries(stats)) {
        res[key as StatType] = val;
    }

    for (const stat of Object.values(StatType)) {
        if (!stats[stat]) stats[stat] = { base: 0, attribute: 0, bonus: 0 };
    }
    return res;
}

const test1HWeapon: Weapon = {
    id: '',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    img: '',
    type: WeaponType.Longsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 0, max: 0, bonus: 0 },
};
const test2HWeapon: Weapon = {
    id: '',
    itemType: ItemType.Weapon,
    name: '',
    tier: 0,
    img: '',
    type: WeaponType.Greatsword,
    attackType: AttackType.MeleeWeapon,
    damageType: DamageType.Physical,
    damageRange: { min: 0, max: 0, bonus: 0 },
};
const testHead: Head = {
    id: '',
    itemType: ItemType.Head,
    name: '',
    tier: 0,
    img: ''
};
const testAmulet: Amulet = {
    id: '',
    itemType: ItemType.Amulet,
    name: '',
    tier: 0,
    img: ''
};
const testArmour: Armour = {
    id: '',
    itemType: ItemType.Armour,
    name: '',
    tier: 0,
    img: '',
    type: ArmourType.Unarmoured,
};
const testHands: Hands = {
    id: '',
    itemType: ItemType.Hands,
    name: '',
    tier: 0,
    img: ''
};
const testBelt: Belt = {
    id: '',
    itemType: ItemType.Belt,
    name: '',
    tier: 0,
    img: ''
};
const testRing: Ring = {
    id: '',
    itemType: ItemType.Ring,
    name: '',
    tier: 0,
    img: '',
};
const testPotion: Potion = {
    id: '',
    itemType: ItemType.Potion,
    name: '',
    tier: 0,
    img: '',
    dice: { num: 2, sides: 4 },
    bonus: 2,
    charges: 1
};

export { createTestCharacter, createTestStats, test1HWeapon, test2HWeapon, testHead, testAmulet, testArmour, testHands, testBelt, testRing, testPotion };