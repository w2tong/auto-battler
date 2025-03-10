import Character from './Character';
import StatType from './Stats/StatType';
import * as diceModlue from '../dice';

// TODO: add tests for following methods:
/*
hitRoll
blockRoll
calcDamageRange
addMana
addHealth
useMana
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
    const rollDiceSpy = jest.spyOn(diceModlue, 'rollDice');

    describe('50% Crit Chance', () => {
        const char = new Character({
            name: 'Test Char',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.CriticalChance]: { base: 50 }
            },
            equipment: {}
        });

        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(char.critRoll()).toBe(true);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(char.critRoll()).toBe(true);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(char.critRoll()).toBe(true);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(char.critRoll()).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(char.critRoll()).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(char.critRoll()).toBe(false);
        });
    });

    describe('0% Crit Chance', () => {
        const char = new Character({
            name: 'Test Char',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.CriticalChance]: { base: 0 }
            },
            equipment: {}
        });

        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(char.critRoll()).toBe(false);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(char.critRoll()).toBe(false);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(char.critRoll()).toBe(false);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(char.critRoll()).toBe(false);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(char.critRoll()).toBe(false);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(char.critRoll()).toBe(false);
        });
    });

    describe('100% Crit Chance', () => {
        const char = new Character({
            name: 'Test Char',
            level: 1,
            attributes: {},
            statTemplate: {
                [StatType.CriticalChance]: { base: 100 }
            },
            equipment: {}
        });

        test('1 Roll = false', () => {
            rollDiceSpy.mockReturnValue(1);
            expect(char.critRoll()).toBe(true);
        });
        test('10 Roll = false', () => {
            rollDiceSpy.mockReturnValue(10);
            expect(char.critRoll()).toBe(true);
        });
        test('50 Roll = false', () => {
            rollDiceSpy.mockReturnValue(50);
            expect(char.critRoll()).toBe(true);
        });
        test('51 Roll = false', () => {
            rollDiceSpy.mockReturnValue(51);
            expect(char.critRoll()).toBe(true);
        });
        test('75 Roll = false', () => {
            rollDiceSpy.mockReturnValue(75);
            expect(char.critRoll()).toBe(true);
        });
        test('100 Roll = false', () => {
            rollDiceSpy.mockReturnValue(100);
            expect(char.critRoll()).toBe(true);
        });
    });
});