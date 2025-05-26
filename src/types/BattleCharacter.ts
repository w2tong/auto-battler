import { ClassName, NpcId } from "@wholesome-sisters/auto-battler";

type BattleCharacter = {
    name: string,
    level: number,
    className: ClassName | null,
    npcId: NpcId | null,
    currHealth: number,
    maxHealth: number,
    currMana: number,
    manaCost: number,
    buffs: string,
    debuffs: string;
};

export default BattleCharacter;