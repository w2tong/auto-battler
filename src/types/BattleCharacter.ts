import { ClassName, NpcId } from "@wholesome-sisters/auto-battler";
import { BuffBar, DebuffBar } from "./StatusEffectBar";
import CharacterFrameStats from "./CharacterFrameStats";

type BattleCharacter = {
    name: string,
    level: number,
    className: ClassName | null,
    npcId: NpcId | null,
    currHealth: number,
    maxHealth: number,
    currMana: number,
    manaCost: number,
    buffs: BuffBar,
    debuffs: DebuffBar;
    stats: CharacterFrameStats;
};

export default BattleCharacter;