type BattleCharacter = {
    name: string,
    className: string | null,
    level: number,
    currHealth: number,
    maxHealth: number,
    currMana: number,
    manaCost: number,
    buffs: string,
    debuffs: string;
};

export default BattleCharacter;