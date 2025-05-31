import { StatType } from "@wholesome-sisters/auto-battler";

type CharacterFrameStats = {
    [StatType.Accuracy]: number;
    [StatType.Dodge]: number;
    [StatType.Armour]: number;
};

export default CharacterFrameStats;