import Character from '../Character/Character';
import { geOutgoingStatusEffectId, getCharBattleId } from '../util';
import Buff from './Buff';
import BuffId from './BuffId';
import buffs from './buffs';
import Debuff from './Debuff';
import DebuffId from './DebuffId';
import debuffs from './debuffs';

export default class StatusEffectManager {
    private char: Character;
    private buffs: { [id in BuffId]?: Buff } = {};
    private debuffs: { [id in DebuffId]?: Debuff } = {};

    private outgoingBuffs: { [key: string]: Buff } = {};
    private outgoingDebuffs: { [key: string]: Debuff } = {};

    constructor(char: Character) {
        this.char = char;
    }

    getBuffStacks(id: BuffId) {
        return this.buffs[id]?.stacks ?? 0;
    }

    getStatusEffectString(statusEffects: { [id in BuffId]?: Buff } | { [id in DebuffId]?: Debuff }) {
        const arr: string[] = [];
        for (const statusEffect of Object.values(statusEffects)) {
            arr.push(`${statusEffect.symbol}(${statusEffect.stacks})`);
        }
        return arr.join(' ');
    }

    getBuffString(): string {
        return this.getStatusEffectString(this.buffs);
    }

    getDebuffString(): string {
        return this.getStatusEffectString(this.debuffs);
    }

    addBuff(id: BuffId, source: Character, stacks: number) {
        if (!this.buffs[id]) this.buffs[id] = new buffs[id](this.char);
        const buff = this.buffs[id];
        if (!buff) return;
        buff.add(getCharBattleId(source), source, stacks);

        source.statusEffectManager.addOutgoingBuff(id, this.char, buff);
    }

    addDebuff(id: DebuffId, source: Character, stacks: number) {
        if (!this.debuffs[id]) this.debuffs[id] = new debuffs[id](this.char);
        const debuff = this.debuffs[id];
        if (!debuff) return;
        debuff.add(getCharBattleId(source), source, stacks);

        source.statusEffectManager.addOutgoingDebuff(id, this.char, debuff);
    }

    addOutgoingBuff(id: BuffId, char: Character, ref: Buff) {
        this.outgoingBuffs[geOutgoingStatusEffectId(id, char)] = ref;
    }
    addOutgoingDebuff(id: DebuffId, char: Character, ref: Debuff) {
        this.outgoingDebuffs[geOutgoingStatusEffectId(id, char)] = ref;
    }

    removeOutgoingBuff(id: BuffId, char: Character) {
        delete this.outgoingBuffs[geOutgoingStatusEffectId(id, char)];
    }
    removeOutgoingDebuff(id: DebuffId, char: Character) {
        delete this.outgoingDebuffs[geOutgoingStatusEffectId(id, char)];
    }

    onTurnStart() {
        for (const buff of Object.values(this.buffs)) buff.onTurnStart();
        for (const debuff of Object.values(this.debuffs)) debuff.onTurnStart();

        for (const buff of Object.values(this.buffs)) buff.onSourceTurnStart(this.char);
        for (const debuff of Object.values(this.debuffs)) debuff.onSourceTurnStart(this.char);
    }

    onTurnEnd() {
        for (const buff of Object.values(this.buffs)) buff.onTurnEnd();
        for (const debuff of Object.values(this.debuffs)) debuff.onTurnEnd();

        for (const buff of Object.values(this.buffs)) buff.onSourceTurnEnd(this.char);
        for (const debuff of Object.values(this.debuffs)) debuff.onSourceTurnEnd(this.char);
    }

    onAttack(hit: boolean) {
        for (const buff of Object.values(this.buffs)) buff.onAttack(hit);
        for (const debuff of Object.values(this.debuffs)) debuff.onAttack(hit);
    }
}