import { createTestCharacter, createTestStats } from '../tests/util';
import AttributeStatScaling from './Attributes/AttributeStatScaling';
import AttributeType from './Attributes/AttributeType';
import { createPet, PET_STAT_RATIO, PetId, petTemplates } from './Pet';
import Stats from './Stats/Stats';
import StatType from './Stats/StatType';

describe('createPet', () => {
    test('no stats', () => {
        const char = createTestCharacter({});
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 }
        }, char.level));
    });

    // Attributes
    test('100 Weapon Skill', () => {
        const num = 100;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.WeaponSkill]: num
            }
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 },
            [StatType.Accuracy]: { base: 0, attribute: 0, bonus: AttributeStatScaling.WeaponSkill[StatType.Accuracy] * num * PET_STAT_RATIO }
        }, char.level));
    });
    test('100 Dexterity', () => {
        const num = 100;
        const char = createTestCharacter({
            attributes: {
                [AttributeType.Dexterity]: num
            }
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: 0 },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 },
            [StatType.Dodge]: { base: Stats.DEFAULT_DODGE, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.Dodge] * num * PET_STAT_RATIO },
            [StatType.RangedWeaponDamagePercent]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.RangedWeaponDamagePercent] * num * PET_STAT_RATIO },
            [StatType.MeleeWeaponDamagePercent]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.MeleeWeaponDamagePercent] * num * PET_STAT_RATIO },
            [StatType.Initiative]: { base: 0, attribute: 0, bonus: AttributeStatScaling.Dexterity[StatType.Initiative] * num * PET_STAT_RATIO }
        }, char.level));
    });

    // Bonus (from equipment)
    test('100 Damage', () => {
        const num = 100;
        const char = createTestCharacter({});
        char.stats.addItemStats({
            [StatType.Damage]: 100
        });
        const pet = createPet(char, PetId.Wolf);

        expect(pet.stats).toMatchObject(createTestStats({
            [StatType.Damage]: { base: 0, attribute: 0, bonus: num * PET_STAT_RATIO },
            [StatType.MaxHealth]: { base: petTemplates[PetId.Wolf].statTemplate[StatType.MaxHealth]!.base, attribute: 0, bonus: 0 }
        }));
    });
});