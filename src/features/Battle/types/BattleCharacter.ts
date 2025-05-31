import { ClassName, NpcId } from "@wholesome-sisters/auto-battler";
import { BuffBar, DebuffBar } from "../../../types/StatusEffectBar";
import CharacterFrameStats from "./CharacterFrameStats";
import CharacterFrameAttributes from "./CharacterFrameAttributes";

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
    attr: CharacterFrameAttributes;
    stats: CharacterFrameStats;
};

export default BattleCharacter;