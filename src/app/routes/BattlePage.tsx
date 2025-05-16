import { useState } from "react";
import Button from "../../components/Button";
import { useCharacters, useSelected } from "../../hooks/Characters/CharactersContext";
import Battle from "../../features/Battle/Battle";
import { Battle as AutoBattlerBattle, Character, createEquipmentImport, getRandomEncounter, LevelRange, startingAbility, StatType } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "../../types/BattleCharacter";

export default function BattlePage() {
    const chars = useCharacters();
    const { selected } = useSelected();
    const lsChar = chars[selected];

    const [levelInput, setLevelInput] = useState<number>(lsChar.level);
    function handleLevelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let level = Number(e.target.value);
        if (level > 20) level = 20;
        else if (level < 1) level = 1;
        setLevelInput(() => Number(level));
    }

    const [battle, setBattle] = useState<AutoBattlerBattle | null>(null);

    function initBattle() {
        const char = new Character({
            name: lsChar.name,
            level: lsChar.level,
            className: lsChar.class,
            attributes: lsChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(lsChar.equipment),
            ability: startingAbility[lsChar.class],
            petId: lsChar.pet ?? undefined
        });

        const battle = new AutoBattlerBattle([char], getRandomEncounter(levelInput as LevelRange));
        setBattle(battle);
    }

    return (
        <>
            {battle ?
                <Battle
                    left={battle.left.map(char => toBattleCharacter(char))}
                    right={battle.right.map(char => toBattleCharacter(char))}
                    turnOrder={battle.turnOrder.map(char => char.char.name)}
                    turnIndex={battle.turnIndex}
                    combatLog={battle.log.flatLog}
                /> :
                // <div>Battle PH</div> :
                <div className='flex flex-col'>
                    <h1>Battle</h1>
                    <div>
                        <Button onClick={() => initBattle()}>Normal Encounter</Button>
                        <input
                            type='number'
                            value={levelInput}
                            min={1}
                            max={20}
                            onChange={handleLevelInputChange}
                        />
                    </div>
                    <Button disabled>Boss Encounter</Button>
                </div>
            }

        </>
    );
}

function toBattleCharacter(char: Character): BattleCharacter {
    return {
        name: char.name,
        className: char.className,
        level: char.level,
        currHealth: char.currentHealth,
        maxHealth: char.stats.maxHealth,
        currMana: char.currentMana,
        manaCost: char.stats.getStat(StatType.ManaCost),
        buffs: '', // PH
        debuffs: ''
    };
}