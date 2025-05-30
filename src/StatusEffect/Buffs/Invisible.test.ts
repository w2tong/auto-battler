import Battle from '../../Battle/Battle';
import Character from '../../Character/Character';
import { createTestCharacter } from '../../tests/util';
import { getCharBattleId } from '../../util';
import BuffId from '../BuffId';

let char: Character;
let source1: Character;
let source2: Character;

beforeEach(() => {
    char = createTestCharacter({});
    source1 = createTestCharacter({});
    source2 = createTestCharacter({});
    new Battle([char, source1, source2], []);
});

describe('Invisible - 1 source', () => {
    test('0 stacks', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 0);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toBeUndefined();
    });

    test('1 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('10 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('100 stack', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 100);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(100);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});

describe('Invisible - 2 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});

describe('Invisible - 3 sources', () => {
    test('Invisible - 1 stack each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 1);
        char.statusEffectManager.addBuff(BuffId.Invisible, source2, 1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(1);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source2)].stacks).toBe(1);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });

    test('Invisible - 10 stacks each', () => {
        char.statusEffectManager.addBuff(BuffId.Invisible, char, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source1, 10);
        char.statusEffectManager.addBuff(BuffId.Invisible, source2, 10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(char)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source1)].stacks).toBe(10);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]![getCharBattleId(source2)].stacks).toBe(10);

        char.statusEffectManager.onAttack(true);
        expect(char.statusEffectManager.buffs[BuffId.Invisible]).toStrictEqual({});
    });
});