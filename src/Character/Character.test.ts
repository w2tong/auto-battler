import Character from './Character';
import * as diceModlue from '../dice';
import StatType from './Stats/StatType';
import BuffId from '../StatusEffect/BuffId';
import Battle from '../Battle';
import AttackType from '../AttackType';
import DamageRange from '../DamageRange';
import { ItemType } from '../Equipment/Item';
import { Potion } from '../Equipment/Potion';

// TODO: add tests for following methods:
/*
Character constructor
attack
*/

describe('calcCritDamage', () => {
    // 10 DMG
    test('10 * 100% crit dmg = 10', () => {
        expect(Character.calcCritDamage(10, 1.00)).toEqual(10);
    });
    test('10 * 110% crit dmg = 11', () => {
        expect(Character.calcCritDamage(10, 1.10)).toEqual(11);
    });
    test('10 * 150% crit dmg = 15', () => {
        expect(Character.calcCritDamage(10, 1.50)).toEqual(15);
    });
    test('10 * 200% crit dmg = 20', () => {
        expect(Character.calcCritDamage(10, 2.00)).toEqual(20);
    });

    test('10 * 90% crit dmg = 9', () => {
        expect(Character.calcCritDamage(10, 0.90)).toEqual(9);
    });
    test('10 * 50% crit dmg = 5', () => {
        expect(Character.calcCritDamage(10, 0.50)).toEqual(5);
    });
    test('10 * 10% crit dmg = 1', () => {
        expect(Character.calcCritDamage(10, 0.10)).toEqual(1);
    });
    test('10 * 0% crit dmg = 0', () => {
        expect(Character.calcCritDamage(10, 0.00)).toEqual(0);
    });
    test('10 * -100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(10, -1.00)).toEqual(0);
    });

    // 0 DMG
    test('0 * 100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 1.00)).toEqual(0);
    });
    test('0 * 200% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 2.00)).toEqual(0);
    });
    test('0 * 50% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 0.50)).toEqual(0);
    });
    test('0 * 0% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, 0.00)).toEqual(0);
    });
    test('0 * -100% crit dmg = 0', () => {
        expect(Character.calcCritDamage(0, -1.00)).toEqual(0);
    });
});

describe('calcDamageAfterDeflection', () => {
    // 10 DMG
    test('10 - 0 deflection = 10', () => {
        expect(Character.calcDamageAfterDeflection(10, 0)).toEqual(10);
    });
    test('10 - 1 deflection = 9', () => {
        expect(Character.calcDamageAfterDeflection(10, 1)).toEqual(9);
    });
    test('10 - 5 deflection = 5', () => {
        expect(Character.calcDamageAfterDeflection(10, 5)).toEqual(5);
    });
    test('10 - 10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, 10)).toEqual(0);
    });
    test('10 - 100 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, 100)).toEqual(0);
    });

    test('10 - -1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -1)).toEqual(11);
    });
    test('10 - -10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -10)).toEqual(20);
    });
    test('10 - -100 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(10, -100)).toEqual(110);
    });

    // 0 DMG
    test('0 - 0 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 0)).toEqual(0);
    });
    test('0 - 1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 1)).toEqual(0);
    });
    test('0 - 10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, 10)).toEqual(0);
    });
    test('0 - -1 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, -1)).toEqual(0);
    });
    test('0 - -10 deflection = 0', () => {
        expect(Character.calcDamageAfterDeflection(0, -10)).toEqual(0);
    });
});

describe('calcDamageAfterArmour', () => {
    describe('10 DMG', () => {
        describe('0 Armour', () => {
            test('0 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 0, 0)).toBe(10);
            });
            test('1 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 0, 1)).toBe(10);
            });
            test('10 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 0, 10)).toBe(10);
            });
        });
        describe('10 Armour', () => {
            test('0 pen = 9', () => {
                expect(Character.calcDamageAfterArmour(10, 10, 0)).toBe(9);
            });
            test('1 pen = 9.1', () => {
                expect(Character.calcDamageAfterArmour(10, 10, 1)).toBe(9.1);
            });
            test('10 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 10, 10)).toBe(10);
            });
            test('100 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 10, 100)).toBe(10);
            });
        });
        describe('50 Armour', () => {
            test('0 pen = 5', () => {
                expect(Character.calcDamageAfterArmour(10, 50, 0)).toBe(5);
            });
            test('1 pen = 5.1', () => {
                expect(Character.calcDamageAfterArmour(10, 50, 1)).toBe(5.1);
            });
            test('10 pen = 7', () => {
                expect(Character.calcDamageAfterArmour(10, 50, 10)).toBe(6);
            });
            test('50 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 50, 50)).toBe(10);
            });
            test('100 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 50, 100)).toBe(10);
            });
        });
        describe('100 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 100, 0)).toBe(0);
            });
            test('1 pen = 0.1', () => {
                expect(Character.calcDamageAfterArmour(10, 100, 1)).toBeCloseTo(0.1);
            });
            test('10 pen = 1', () => {
                expect(Character.calcDamageAfterArmour(10, 100, 10)).toBeCloseTo(1);
            });
            test('50 pen = 5', () => {
                expect(Character.calcDamageAfterArmour(10, 100, 50)).toBe(5);
            });
            test('100 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 100, 100)).toBe(10);
            });
        });
        describe('1000 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 0)).toBe(0);
            });
            test('1 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 1)).toBeCloseTo(0);
            });
            test('10 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 10)).toBeCloseTo(0);
            });
            test('50 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 50)).toBe(0);
            });
            test('100 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 100)).toBe(0);
            });
            test('1000 pen = 10', () => {
                expect(Character.calcDamageAfterArmour(10, 1000, 1000)).toBe(10);
            });
        });
        describe('-50 Armour', () => {
            test('0 pen = 15', () => {
                expect(Character.calcDamageAfterArmour(10, -50, 0)).toBe(15);
            });
            test('10 pen = 15', () => {
                expect(Character.calcDamageAfterArmour(10, -50, 10)).toBeCloseTo(15);
            });
            test('50 pen = 15', () => {
                expect(Character.calcDamageAfterArmour(10, -50, 50)).toBe(15);
            });
            test('100 pen = 15', () => {
                expect(Character.calcDamageAfterArmour(10, -50, 100)).toBe(15);
            });
        });
    });

    describe('0 DMG', () => {
        describe('0 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 0, 0)).toBe(0);
            });
            test('1 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 0, 1)).toBe(0);
            });
            test('10 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 0, 10)).toBe(0);
            });
        });
        describe('50 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 50, 0)).toBe(0);
            });
            test('10 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 50, 10)).toBe(0);
            });
            test('50 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 50, 50)).toBe(0);
            });
            test('100 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 50, 100)).toBe(0);
            });
        });
        describe('100 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 100, 0)).toBe(0);
            });
            test('10 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 100, 10)).toBe(0);
            });
            test('50 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 100, 50)).toBe(0);
            });
            test('100 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, 100, 100)).toBe(0);
            });
        });
        describe('-50 Armour', () => {
            test('0 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, -50, 0)).toBe(0);
            });
            test('10 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, -50, 10)).toBe(0);
            });
            test('50 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, -50, 50)).toBe(0);
            });
            test('100 pen = 0', () => {
                expect(Character.calcDamageAfterArmour(0, -50, 100)).toBe(0);
            });
        });
    });
});

describe('calcDamageAfterBlock', () => {
    describe('10 DMG', () => {
        test('0 Block Power = 10', () => {
            expect(Character.calcDamageAfterBlock(10, 0)).toBe(10);
        });
        test('1 Block Power = 9', () => {
            expect(Character.calcDamageAfterBlock(10, 1)).toBe(9);
        });
        test('5 Block Power = 5', () => {
            expect(Character.calcDamageAfterBlock(10, 5)).toBe(5);
        });
        test('10 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(10, 10)).toBe(0);
        });
        test('100 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(10, 100)).toBe(0);
        });
        test('-10 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(10, -10)).toBe(10);
        });
    });

    describe('0 DMG', () => {
        test('0 Block Power= 0', () => {
            expect(Character.calcDamageAfterBlock(0, 0)).toBe(0);
        });
        test('1 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(0, 1)).toBe(0);
        });
        test('5 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(0, 5)).toBe(0);
        });
        test('10 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(0, 10)).toBe(0);
        });
        test('100 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(0, 100)).toBe(0);
        });
        test('-10 Block Power = 0', () => {
            expect(Character.calcDamageAfterBlock(0, -10)).toBe(0);
        });
    });
});

describe('critRoll', () => {
    let rollDiceSpy: jest.SpyInstance;
    beforeEach(() => {
        rollDiceSpy = jest.spyOn(diceModlue, 'rollDice');
    });
    afterEach(() => {
        rollDiceSpy.mockRestore();
    });

    describe('0% Crit Chance', () => {
        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(Character.critRoll(0)).toBe(false);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(Character.critRoll(0)).toBe(false);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(Character.critRoll(0)).toBe(false);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(Character.critRoll(0)).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(Character.critRoll(0)).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(Character.critRoll(0)).toBe(false);
        });
    });

    describe('50% Crit Chance', () => {
        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(Character.critRoll(50)).toBe(true);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(Character.critRoll(50)).toBe(true);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(Character.critRoll(50)).toBe(true);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(Character.critRoll(50)).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(Character.critRoll(50)).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(Character.critRoll(50)).toBe(false);
        });
    });

    describe('100% Crit Chance', () => {
        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(Character.critRoll(100)).toBe(true);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(Character.critRoll(100)).toBe(true);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(Character.critRoll(100)).toBe(true);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(Character.critRoll(100)).toBe(true);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(Character.critRoll(100)).toBe(true);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(Character.critRoll(100)).toBe(true);
        });
    });
});

describe('blockRoll', () => {
    let rollDiceSpy: jest.SpyInstance;
    beforeEach(() => {
        rollDiceSpy = jest.spyOn(diceModlue, 'rollDice');
    });
    afterEach(() => {
        rollDiceSpy.mockRestore();
    });

    describe('0% Block Chance', () => {
        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(1);
            expect(Character.blockRoll(0)).toBe(false);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(10);
            expect(Character.blockRoll(0)).toBe(false);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(50);
            expect(Character.blockRoll(0)).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(75);
            expect(Character.blockRoll(0)).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(100);
            expect(Character.blockRoll(0)).toBe(false);
        });
    });

    describe('50% Block Chance', () => {
        test('1 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(1);
            expect(Character.blockRoll(50)).toBe(true);
        });
        test('10 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(10);
            expect(Character.blockRoll(50)).toBe(true);
        });
        test('50 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(50);
            expect(Character.blockRoll(50)).toBe(true);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(51);
            expect(Character.blockRoll(50)).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(75);
            expect(Character.blockRoll(50)).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValueOnce(100);
            expect(Character.blockRoll(50)).toBe(false);
        });
    });

    describe('100% Block Chance', () => {
        test('1 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(1);
            expect(Character.blockRoll(100)).toBe(true);
        });
        test('10 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(10);
            expect(Character.blockRoll(100)).toBe(true);
        });
        test('50 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(50);
            expect(Character.blockRoll(100)).toBe(true);
        });
        test('75 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(75);
            expect(Character.blockRoll(100)).toBe(true);
        });
        test('100 Roll = true', () => {
            rollDiceSpy.mockReturnValueOnce(100);
            expect(Character.blockRoll(100)).toBe(true);
        });
    });
});

describe('useAbilityMana', () => {
    test('20 Starting Mana - 0 Mana Cost = 20', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: 0 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(20);
    });
    test('20 Starting Mana - 5 Mana Cost = 15', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: 5 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(15);
    });
    test('20 Starting Mana - 10 Mana Cost = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: 10 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(10);
    });
    test('20 Starting Mana - 20 Mana Cost = 0', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: 20 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(0);
    });
    test('20 Starting Mana - 25 Mana Cost = -5', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: 25 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(-5);
    });
    test('20 Starting Mana - -10 Mana Cost = 20', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 20 },
                [StatType.ManaCost]: { base: -10 }
            },
            equipment: {}
        });
        char.useAbilityMana();
        expect(char.currentMana).toBe(20);
    });
});

describe('addMana', () => {
    test('10 + 0 = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 10 },
            },
            equipment: {}
        });
        char.addMana(0);
        expect(char.currentMana).toBe(10);
    });
    test('0 + 10 = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 0 },
            },
            equipment: {}
        });
        char.addMana(10);
        expect(char.currentMana).toBe(10);
    });
    test('10 + 100 = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 10 },
            },
            equipment: {}
        });
        char.addMana(100);
        expect(char.currentMana).toBe(110);
    });
    test('10 + 10000 = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 10 },
            },
            equipment: {}
        });
        char.addMana(10000);
        expect(char.currentMana).toBe(10010);
    });
    test('0 + -100 = 0', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 0 },
            },
            equipment: {}
        });
        char.addMana(-100);
        expect(char.currentMana).toBe(0);
    });
    test('10 + -100 = 10', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.StartingMana]: { base: 10 },
            },
            equipment: {}
        });
        char.addMana(-100);
        expect(char.currentMana).toBe(10);
    });
});

describe('addHealth', () => {
    test('50/100 Health + 0 = 50 Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {},
            options: {
                currHealthPc: 0.5
            }
        });
        char.addHealth(0);
        expect(char.currentHealth).toBe(50);
    });
    test('50/100 Health + 10 = 60 Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {},
            options: {
                currHealthPc: 0.5
            }
        });
        char.addHealth(10);
        expect(char.currentHealth).toBe(60);
    });
    test('50/100 Health + 10 = 100 Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {},
            options: {
                currHealthPc: 0.5
            }
        });
        char.addHealth(50);
        expect(char.currentHealth).toBe(100);
    });
    test('50/100 Health + 10 = 100 Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {},
            options: {
                currHealthPc: 0.5
            }
        });
        char.addHealth(100);
        expect(char.currentHealth).toBe(100);
    });
    test('50/100 Health + -10 = 50 Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {},
            options: {
                currHealthPc: 0.5
            }
        });
        char.addHealth(-10);
        expect(char.currentHealth).toBe(50);
    });
});

describe('isDead', () => {
    test('Stat Template - 0 Max Health = true', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 0 }
            },
            equipment: {}
        });
        expect(char.isDead()).toBeTruthy();
    });
    test('Stat Template - 1 Max Health = false', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 1 }
            },
            equipment: {}
        });
        expect(char.isDead()).toBeFalsy();
    });
    test('Options - currHealthPc: 0 = true', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {},
            equipment: {},
            options: { currHealthPc: 0 }
        });
        expect(char.isDead()).toBeTruthy();
    });
    test('Options currHealthPc: 1 = false', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {},
            equipment: {},
            options: { currHealthPc: 1 }
        });
        expect(char.isDead()).toBeFalsy();
    });

    test('20 Max Health, Take 20 Damage = true', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 20,
            armourPenetration: 0
        });
        expect(char.isDead()).toBeTruthy();
    });

    test('20 Max Health, Take 10 Damage = false', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 20,
            armourPenetration: 0
        });
        expect(char.isDead()).toBeTruthy();
    });

    test('20 Max Health, Take 0 Damage', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 0,
            armourPenetration: 0
        });
        expect(char.isDead()).toBeFalsy();
    });

    test('20 Max Health, Take 25 Damage', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 25,
            armourPenetration: 0
        });
        expect(char.isDead()).toBeTruthy();
    });
});

describe('takeDamage', () => {
    test('20 Max Health - 10 Damage = 10 Current Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 10,
            armourPenetration: 0
        });
        expect(char.currentHealth).toBe(10);
    });

    test('20 Max Health - 20 Damage = 0 Current Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 20,
            armourPenetration: 0
        });
        expect(char.currentHealth).toBe(0);
    });

    test('20 Max Health - 25 Damage = -5 Current Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: 25,
            armourPenetration: 0
        });
        expect(char.currentHealth).toBe(-5);
    });

    test('20 Max Health - -10 Damage = 20 Current Health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 20 },
                [StatType.Armour]: { base: 0 },
                [StatType.Deflection]: { base: 0 }
            },
            equipment: {}
        });
        char.takeDamage({
            source: '',
            damage: -10,
            armourPenetration: 0
        });
        expect(char.currentHealth).toBe(20);
    });
});

describe('isInvisible', () => {
    test('new char = false', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {},
            equipment: {}
        });

        expect(char.isInvisible()).toBeFalsy();
    });
    test('new char, add buff = true', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {},
            equipment: {}
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const battle = new Battle([char], []);
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        expect(char.isInvisible()).toBeTruthy();
    });
    test('new char, add buff = true', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {},
            equipment: {}
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const battle = new Battle([char], []);
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
    });
});

describe('usePotion', () => {
    let mathRandomSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
    });

    let testPotion: Potion;
    beforeEach(() => {
        testPotion = {
            id: 'test',
            itemType: ItemType.Potion,
            name: 'Test Healing Potion',
            tier: 1,
            img: 'potion-red.png',
            dice: { num: 2, sides: 4 },
            bonus: 2,
            charges: 1
        };
    });

    test('Use potion with full health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {
                potion: testPotion
            }
        });
        expect(char.currentHealth).toBe(100);
        char.usePotion();
        expect(char.currentHealth).toBe(100);
        expect(char.equipment.potion?.charges).toBe(1);
    });

    test('Use potion with 50/100 health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {
                potion: testPotion
            },
            options: {
                currHealthPc: 0.5
            }
        });
        expect(char.currentHealth).toBe(50);
        char.usePotion();
        expect(char.currentHealth).toBeCloseTo(58);
    });

    test('Use potion twice with 50/100 health', () => {
        const char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 }
            },
            equipment: {
                potion: testPotion
            },
            options: {
                currHealthPc: 0.5
            }
        });
        expect(char.currentHealth).toBe(50);
        char.usePotion();
        expect(char.currentHealth).toBeCloseTo(58);
        char.usePotion();
        expect(char.currentHealth).toBeCloseTo(66);
    });
});

describe('hitRoll', () => {
    // Test Char
    // Melee Hit Chance = 10 + 5 = 15
    // Ranged Hit Chance = 10 + 10 = 20
    // Spell Hit Chance = 10 + 15 = 25
    // Melee Off-Hand Hit Chance = 10 + 5 - 20 = -5
    // Ranged Off-Hand Hit Chance = 10 + 10 - 20 = 0
    // Spell Off-Hand Hit Chance = 10 + 15 - 20 = 5

    // Target
    // Dodge Chance = 50 - 10 = 40
    const char = new Character({
        name: 'Test Char',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.HitChance]: { base: 10 },
            [StatType.MeleeHitChance]: { base: 5 },
            [StatType.RangedHitChance]: { base: 10 },
            [StatType.SpellHitChance]: { base: 15 },
            [StatType.OffHandHitChance]: { base: -20 },
            [StatType.DodgeReduction]: { base: 10 },
        },
        equipment: {}
    });
    let target: Character;

    describe('Normal Target', () => {
        beforeEach(() => {
            target = new Character({
                name: 'Target',
                level: 1,
                attributes: {},
                statTemplate: {
                    [StatType.Dodge]: { base: 50 }
                },
                equipment: {}
            });
        });

        describe('rollDice 1 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(1);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 5 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(5);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 15', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(15);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 20', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(20);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 25', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(25);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 35', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(35);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 40', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(40);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 45', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(45);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 96 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(96);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 100 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(100);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });
    });

    describe('High Dodge Target', () => {
        beforeEach(() => {
            target = new Character({
                name: 'Target',
                level: 1,
                attributes: {},
                statTemplate: {
                    [StatType.Dodge]: { base: 1000 }
                },
                equipment: {}
            });
        });

        describe('rollDice 1 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(1);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 5 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(5);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 6', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(6);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 95', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(95);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 96 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(96);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 100 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(100);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

    });

    describe('0% Dodge Target', () => {
        beforeEach(() => {
            target = new Character({
                name: 'Target',
                level: 1,
                attributes: {},
                statTemplate: {
                    [StatType.Dodge]: { base: 0 }
                },
                equipment: {}
            });
        });

        describe('rollDice 1 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(1);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack = false', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 5 (Always false)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(5);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeFalsy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeFalsy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeFalsy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeFalsy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeFalsy();
            });
        });

        describe('rollDice 6', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(6);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 95', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(95);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 96 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(96);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

        describe('rollDice 100 (Always true)', () => {
            let rollDiceSpy: jest.SpyInstance;
            beforeEach(() => {
                rollDiceSpy = jest.spyOn(diceModlue, 'rollDice').mockReturnValue(100);
            });
            afterEach(() => {
                rollDiceSpy.mockRestore();
            });

            test('Melee Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon })).toBeTruthy();
            });
            test('Ranged Weapon Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon })).toBeTruthy();
            });
            test('Spell Main-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell })).toBeTruthy();
            });
            test('Melee Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.MeleeWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Ranged Weapon Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.RangedWeapon, isOffHand: true })).toBeTruthy();
            });
            test('Spell Off-Hand Attack', () => {
                expect(char.hitRoll({ target, attackType: AttackType.Spell, isOffHand: true })).toBeTruthy();
            });
        });

    });
});

describe('calcDamage', () => {
    const char = new Character({
        name: '',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Damage]: { base: 1 },
            [StatType.DamagePercent]: { base: 0.2 },
            [StatType.MeleeWeaponDamage]: { base: 2 },
            [StatType.MeleeWeaponDamagePercent]: { base: 0.3 },
            [StatType.RangedWeaponDamage]: { base: 3 },
            [StatType.RangedWeaponDamagePercent]: { base: 0.2 },
            [StatType.SpellPower]: { base: 10 },
            [StatType.SpellPowerPercent]: { base: 0.1 },
            [StatType.OffHandDamage]: { base: 1 }
        },
        equipment: {}
    });

    test('Melee weapon main-hand attack', () => {
        const damage = char.calcDamage({
            attackType: AttackType.MeleeWeapon,
            damage: 10
        });

        expect(damage).toEqual(19.5); // (10 + 1 + 2) * 1.5
    });

    test('Melee weapon off-hand attack', () => {
        const damage = char.calcDamage({
            attackType: AttackType.MeleeWeapon,
            damage: 10,
            isOffHand: true
        });

        expect(damage).toBeCloseTo(21); // (10 + 1 + 2 + 1) * 1.5
    });

    test('Ranged weapon main-hand attack', () => {
        const damage = char.calcDamage({
            attackType: AttackType.RangedWeapon,
            damage: 10
        });

        expect(damage).toBeCloseTo(19.6); // (10 + 1 + 3) * 1.4
    });

    test('Ranged weapon off-hand attack', () => {
        const damage = char.calcDamage({
            attackType: AttackType.RangedWeapon,
            damage: 5,
            isOffHand: true
        });

        expect(damage).toBeCloseTo(14); // (5 + 1 + 3 + 1) * 1.4
    });

    test('Spell main-hand attack', () => {
        const damage = char.calcDamage({
            attackType: AttackType.Spell,
            damage: 20,
            spellPowerRatio: 0.5
        });

        expect(damage).toBeCloseTo(31.8); // (20 + 1 + (10 * 1.1 * 0.5)) * 1.2
    });

    test('Melee weapon main-hand sneak attack (0 stacks)', () => {
        const damage = char.calcDamage({
            attackType: AttackType.MeleeWeapon,
            damage: 10,
            invisibleStacks: 0
        });

        expect(damage).toEqual(19.5); // (10 + 1 + 2 + 0) * 1.5
    });

    test('Melee weapon main-hand sneak attack (1 stack)', () => {
        const damage = char.calcDamage({
            attackType: AttackType.MeleeWeapon,
            damage: 10,
            invisibleStacks: 1
        });

        expect(damage).toEqual(25.5); // (10 + 1 + 2 + 4) * 1.5
    });

    test('Melee weapon main-hand sneak attack (10 stacks)', () => {
        const damage = char.calcDamage({
            attackType: AttackType.MeleeWeapon,
            damage: 10,
            invisibleStacks: 10
        });

        expect(damage).toEqual(79.5); // (10 + 1 + 2 + 40) * 1.5
    });
});

describe('calcDamageRange', () => {
    const char = new Character({
        name: '',
        level: 1,
        attributes: {},
        statTemplate: {
            [StatType.Damage]: { base: 1 },
            [StatType.DamagePercent]: { base: 0.2 },
            [StatType.MeleeWeaponDamage]: { base: 2 },
            [StatType.MeleeWeaponDamagePercent]: { base: 0.3 },
            [StatType.RangedWeaponDamage]: { base: 3 },
            [StatType.RangedWeaponDamagePercent]: { base: 0.2 },
            [StatType.SpellPower]: { base: 10 },
            [StatType.SpellPowerPercent]: { base: 0.1 },
            [StatType.OffHandDamage]: { base: 1 }
        },
        equipment: {}
    });

    test('Melee weapon main-hand attack', () => {
        const damageRange: DamageRange = { min: 10, max: 20, bonus: 5 };
        const { min, max } = char.calcDamageRange({
            attackType: AttackType.MeleeWeapon,
            damageRange,
            isOffHand: false
        });

        expect(min).toEqual(27); // (10 + 5 + 1 + 2) * 1.5
        expect(max).toEqual(42); // (20 + 5 + 1 + 2) * 1.5
    });

    test('Melee weapon off-hand attack', () => {
        const damageRange: DamageRange = { min: 10, max: 20, bonus: 5 };
        const { min, max } = char.calcDamageRange({
            attackType: AttackType.MeleeWeapon,
            damageRange,
            isOffHand: true
        });

        expect(min).toBeCloseTo(28.5); // (10 + 5 + 1 + 2 + 1) * 1.5
        expect(max).toBeCloseTo(43.5); // (20 + 5 + 1 + 2 + 1) * 1.5
    });

    test('Ranged weapon main-hand attack', () => {
        const damageRange: DamageRange = { min: 10, max: 20, bonus: 5 };
        const { min, max } = char.calcDamageRange({
            attackType: AttackType.RangedWeapon,
            damageRange,
            isOffHand: false
        });

        expect(min).toBeCloseTo(26.6); // (10 + 5 + 1 + 3) * 1.4
        expect(max).toBeCloseTo(40.6); // (20 + 5 + 1 + 3) * 1.4
    });

    test('Ranged weapon off-hand attack', () => {
        const damageRange: DamageRange = { min: 5, max: 10, bonus: 5 };
        const { min, max } = char.calcDamageRange({
            attackType: AttackType.RangedWeapon,
            damageRange,
            isOffHand: true
        });

        expect(min).toBeCloseTo(21); // (5 + 5 + 1 + 3 + 1) * 1.4
        expect(max).toBeCloseTo(28); // (10 + 5 + 1 + 3 + 1) * 1.4
    });

    test('Spell main-hand attack', () => {
        const damageRange: DamageRange = { min: 20, max: 30, bonus: 2 };
        const { min, max } = char.calcDamageRange({
            attackType: AttackType.Spell,
            damageRange,
            spellPowerRatio: 0.5,
            isOffHand: false
        });

        expect(min).toBeCloseTo(34.2); // (20 + 2 + 1 + (10 * 1.1 * 0.5)) * 1.2
        expect(max).toBeCloseTo(46.2); // (30 + 2 + 1 + (10 * 1.1 * 0.5)) * 1.2
    });
});

describe('attack', () => {
    let char: Character;
    let target: Character;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let battle: Battle;
    const damageRange: DamageRange = { min: 5, max: 5, bonus: 0 };

    beforeEach(() => {
        char = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.Damage]: { base: 1 },
                [StatType.MeleeWeaponDamage]: { base: 2 },
                [StatType.RangedWeaponDamage]: { base: 3 },
                [StatType.SpellPower]: { base: 10 },
                [StatType.OffHandDamage]: { base: 1 },
                [StatType.DamagePercent]: { base: 0.2 },
                [StatType.MeleeWeaponDamagePercent]: { base: 0.3 },
                [StatType.RangedWeaponDamagePercent]: { base: 0.2 },
                [StatType.CriticalDamage]: { base: 2 },
            },
            equipment: {}
        });

        target = new Character({
            name: '',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.MaxHealth]: { base: 100 },
                [StatType.Dodge]: { base: 0 },
                [StatType.BlockPower]: { base: 5 },
            },
            equipment: {}
        });

        battle = new Battle([char], [target]);
    });

    let mathRandomSpy: jest.SpyInstance;
    let critRollSpy: jest.SpyInstance;
    let blockRollSpy: jest.SpyInstance;
    beforeEach(() => {
        mathRandomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        critRollSpy = jest.spyOn(Character, 'critRoll').mockReturnValue(true);
        blockRollSpy = jest.spyOn(Character, 'blockRoll').mockReturnValue(true);
    });
    afterEach(() => {
        mathRandomSpy.mockRestore();
        critRollSpy.mockRestore();
        blockRollSpy.mockRestore();
    });

    // TODO: add test for Invisible
    // TODO: add test for different attack types
    test('Melee Main-hand Weapon Attack', () => {
        char.attack({
            target,
            attackType: AttackType.MeleeWeapon,
            damageRange,
            spellPowerRatio: 0.2
        });
        expect(target.currentHealth).toBe(75); // (5 + 1 + 2 + 2) * 1.5 * 2 - 5 = 25
    });

    test('Melee Off-hand Weapon Attack', () => {
        char.attack({
            target,
            attackType: AttackType.MeleeWeapon,
            damageRange,
            spellPowerRatio: 0.2,
            isOffHand: true
        });
        expect(target.currentHealth).toBe(72); // (5 + 1 + 2 + 2 + 1) * 1.5 * 2 - 5 = 28
    });

    test('Melee Main-hand Weapon Sneak Attack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        char.attack({
            target,
            attackType: AttackType.MeleeWeapon,
            damageRange,
            spellPowerRatio: 0.2
        });
        expect(target.currentHealth).toBe(63); // (5 + 1 + 2 + 2 + 4) * 1.5 * 2 - 5 = 37
        expect(char.statusEffectManager.buffs[BuffId.Invisible]?.instances).toEqual({});
    });

    // TOOD: add tests for no block/no crit
});