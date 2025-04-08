import { ArmourType, armour } from '../../Equipment/Armour';
import { weapons } from '../../Equipment/Weapon/weapons';
import { createCharacter, createCharacterWithEquipment, createCharacterWithTemplate } from '../../tests/util';
import Character from '../Character';
import ArmourTypeDodgeMultiplier from './ArmourTypeDodgeMultiplier';
import { StatTemplate } from './StatTemplate';
import StatType from './StatType';
import Stats from './Stats';

describe('Default Stats', () => {
    test('Level 1 Max Health is Stats.DEFAULT_MAX_HEALTH', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.MaxHealth]).toStrictEqual({ base: Stats.DEFAULT_MAX_HEALTH, attribute: 0, bonus: 0 });
    });

    test('Level 5 Max Health is DEFAULT_MAX_HEALTH + DEFAULT_MAX_HEALTH/LVL * (LVL-1)', () => {
        const level = 5;
        const char = createCharacter(level);
        expect(char.stats[StatType.MaxHealth]).toStrictEqual({ base: Stats.DEFAULT_MAX_HEALTH + Stats.DEFAULT_MAX_HEALTH_PER_LVL * (level - 1), attribute: 0, bonus: 0 });
    });

    test('Level 1 Dodge is Stats.DEFAULT_DODGE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.Dodge]).toStrictEqual({ base: Stats.DEFAULT_DODGE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Off-hand Hit Chance is Stats.OFF_HAND_HIT_CHANCE_PENALTY', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.OffHandHitChance]).toStrictEqual({ base: Stats.OFF_HAND_HIT_CHANCE_PENALTY, attribute: 0, bonus: 0 });
    });

    test('Level 1 Crit Chance is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.CriticalChance]).toStrictEqual({ base: Stats.DEFAULT_CRIT_CHANCE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Crit Damage is Stats.DEFAULT_CRIT_CHANCE', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.CriticalDamage]).toStrictEqual({ base: Stats.DEFAULT_CRIT_DAMAGE, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana Cost is Stats.DEFAULT_MANA_COST', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaCost]).toStrictEqual({ base: Stats.DEFAULT_MANA_COST, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana On Hit is Stats.DEFAULT_MANA_ON_HIT', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaOnHit]).toStrictEqual({ base: Stats.DEFAULT_MANA_ON_HIT, attribute: 0, bonus: 0 });
    });

    test('Level 1 Mana Regen is Stats.DEFAULT_MANA_COST', () => {
        const char = createCharacter(1);
        expect(char.stats[StatType.ManaRegen]).toStrictEqual({ base: Stats.DEFAULT_MANA_REGEN, attribute: 0, bonus: 0 });
    });
});

describe('Dodge with Armour Type Penalty', () => {
    test('Dodge with no armour is Stats.DEFAULT_DODGE', () => {
        const char = createCharacterWithEquipment(1, {});
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE);
    });

    test('Dodge with Unarmoured Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]', () => {
        const char = createCharacterWithEquipment(1, { armour: armour.robe0 });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Unarmoured]);
    });

    test('Dodge with Light Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]', () => {
        const char = createCharacterWithEquipment(1, { armour: armour.leatherArmour0 });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Light]);
    });

    test('Dodge with Medium Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]', () => {
        const char = createCharacterWithEquipment(1, { armour: armour.mailArmour0 });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Medium]);
    });

    test('Dodge with Heavy Armour is Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]', () => {
        const char = createCharacterWithEquipment(1, { armour: armour.plateArmour0 });
        expect(char.stats.dodge).toBeCloseTo(Stats.DEFAULT_DODGE * ArmourTypeDodgeMultiplier[ArmourType.Heavy]);
    });
});

function create2HCharacter(statTemplate: StatTemplate) {
    return new Character({
        name: '',
        level: 1,
        attributes: {},
        statTemplate,
        equipment: { mainHand: weapons.greatsword0 }
    });
}

describe('Two-Handed Stat Bonuses', () => {
    const twoHandedBonus = 1 + Stats.TWO_HANDED_BONUS;

    test('no bonus, 10 is 10', () => {
        const num = 10;
        const char = createCharacterWithTemplate(1, {
            [StatType.Damage]: { base: num },
            [StatType.MeleeWeaponDamage]: { base: num },
            [StatType.RangedWeaponDamage]: { base: num },
            [StatType.ManaOnHit]: { base: num }
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });

    test('Mana On Hit is Default * twoHandedBonus', () => {
        const char = create2HCharacter({});
        expect(char.stats.manaOnHit).toBeCloseTo(Stats.DEFAULT_MANA_ON_HIT * twoHandedBonus);
    });

    test('0 is 0', () => {
        const char = create2HCharacter({
            [StatType.ManaOnHit]: { base: 0 },
        });
        expect(char.stats.damage).toBe(0);
        expect(char.stats.meleeWeaponDamage).toBe(0);
        expect(char.stats.rangedWeaponDamage).toBe(0);
        expect(char.stats.manaOnHit).toBe(0);
    });

    test('twoHanded, 10 is 15', () => {
        const num = 10;
        const char = create2HCharacter({
            [StatType.Damage]: { base: num },
            [StatType.MeleeWeaponDamage]: { base: num },
            [StatType.RangedWeaponDamage]: { base: num },
            [StatType.ManaOnHit]: { base: num },
        });
        expect(char.stats.damage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.meleeWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.rangedWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.manaOnHit).toBeCloseTo(num * twoHandedBonus);
    });

    test('twoHanded, 100 is 150', () => {
        const num = 100;
        const char = create2HCharacter({
            [StatType.Damage]: { base: num },
            [StatType.MeleeWeaponDamage]: { base: num },
            [StatType.RangedWeaponDamage]: { base: num },
            [StatType.ManaOnHit]: { base: num },
        });
        expect(char.stats.damage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.meleeWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.rangedWeaponDamage).toBeCloseTo(num * twoHandedBonus);
        expect(char.stats.manaOnHit).toBeCloseTo(num * twoHandedBonus);
    });

    test('-10 is -10', () => {
        const num = -10;
        const char = create2HCharacter({
            [StatType.Damage]: { base: num },
            [StatType.MeleeWeaponDamage]: { base: num },
            [StatType.RangedWeaponDamage]: { base: num },
            [StatType.ManaOnHit]: { base: num },
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });

    test('-100 is -100', () => {
        const num = -100;
        const char = create2HCharacter({
            [StatType.Damage]: { base: num },
            [StatType.MeleeWeaponDamage]: { base: num },
            [StatType.RangedWeaponDamage]: { base: num },
            [StatType.ManaOnHit]: { base: num },
        });
        expect(char.stats.damage).toBe(num);
        expect(char.stats.meleeWeaponDamage).toBe(num);
        expect(char.stats.rangedWeaponDamage).toBe(num);
        expect(char.stats.manaOnHit).toBe(num);
    });
});

// TODO: add test cases for dual wielding           

describe('Health %', () => {
    describe('100 health', () => {
        test('100 + 0% is 100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 } });
            expect(char.stats.maxHealth).toEqual(100);
        });

        test('100 + 10% is 110', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: 0.10 } });
            expect(char.stats.maxHealth).toBeCloseTo(110);
        });

        test('100 + 50% is 150', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: 0.50 } });
            expect(char.stats.maxHealth).toBeCloseTo(150);
        });

        test('100 + 100% is 200', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: 1.00 } });
            expect(char.stats.maxHealth).toBeCloseTo(200);
        });

        test('100 + 1000% is 1100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: 10.00 } });
            expect(char.stats.maxHealth).toBeCloseTo(1100);
        });

        test('100 - 10% is 90', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: -0.10 } });
            expect(char.stats.maxHealth).toBeCloseTo(90);
        });

        test('100 - 50% is 50', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: -0.50 } });
            expect(char.stats.maxHealth).toBeCloseTo(50);
        });

        test('100 - 100% is 10', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: -1.00 } });
            expect(char.stats.maxHealth).toBeCloseTo(10);
        });

        test('100 - 1000% is 10', () => {
            const char = createCharacterWithTemplate(1, { [StatType.MaxHealth]: { base: 100 }, [StatType.HealthPercent]: { base: -10.00 } });
            expect(char.stats.maxHealth).toBeCloseTo(10);
        });
    });
});

// TODO: fill out tests
// describe('MeleeWeaponDamagePercent', () => {
// });

// describe('RangedWeaponDamagePercent', () => {
// });

describe('Spell Power %', () => {
    describe('100 SP', () => {
        test('100 + 0% is 100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 } });
            expect(char.stats.spellPower).toEqual(100);
        });

        test('100 + 10% is 110', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: 0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(110);
        });

        test('100 + 50% is 150', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: 0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(150);
        });

        test('100 + 100% is 200', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: 1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(200);
        });

        test('100 + 1000% is 1100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: 10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(1100);
        });

        test('100 - 10% is 90', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: -0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(90);
        });

        test('100 - 50% is 50', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: -0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(50);
        });

        test('100 - 100% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: -1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('100 - 1000% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 100 }, [StatType.SpellPowerPercent]: { base: -10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });
    });

    describe('-100 SP', () => {
        test('-100 + 0% is -100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 } });
            expect(char.stats.spellPower).toEqual(-100);
        });

        test('-100 + 10% is -90', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: 0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(-90);
        });

        test('-100 + 50% is -50', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: 0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(-50);
        });

        test('-100 + -100% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: 1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(-0);
        });

        test('-100 + 1000% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: 10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(-0);
        });

        test('-100 - 10% is 110', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: -0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(-110);
        });

        test('-100 - 50% is -150', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: -0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(-150);
        });

        test('-100 - 100% is -200', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: -1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(-200);
        });

        test('-100 - 1000% is -1100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: -100 }, [StatType.SpellPowerPercent]: { base: -10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(-1100);
        });
    });

    describe('0 SP', () => {
        test('0 + 0% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 } });
            expect(char.stats.spellPower).toEqual(0);
        });

        test('0 + 10% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: 0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 + 50% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: 0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 + 100% is 200', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: 1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 + 1000% is 1100', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: 10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 - 10% is 90', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: -0.10 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 - 50% is 50', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: -0.50 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 - 100% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: -1.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });

        test('0 - 1000% is 0', () => {
            const char = createCharacterWithTemplate(1, { [StatType.SpellPower]: { base: 0 }, [StatType.SpellPowerPercent]: { base: -10.00 } });
            expect(char.stats.spellPower).toBeCloseTo(0);
        });
    });
});

describe('hitChance', () => {
    test('One-hand Weapon', () => {
        const char = createCharacterWithEquipment(1, {
            mainHand: weapons.longsword0
        });
        expect(char.stats.hitChance).toBe(0);
    });
    test('Dual Wield Weapons', () => {
        const char = createCharacterWithEquipment(1, {
            mainHand: weapons.dagger0,
            offHandWeapon: weapons.dagger0
        });
        expect(char.stats.hitChance).toBe(Stats.DUAL_WIELD_HIT_CHANCE_PENALTY);
    });
});