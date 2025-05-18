import { useState, useRef } from "react";
import { useCharacters, useSelected } from "../../hooks/Characters/CharactersContext";
import BattleComponent from "../../features/Battle/BattleComponent";
import { Battle, Character, createEquipmentImport, getRandomEncounter, LevelRange, startingAbility, StatType } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "../../types/BattleCharacter";
import useInterval from "../../hooks/useInterval";
import { useParams } from "react-router";
import Button from "../../components/Button";

export default function BattlePage() {
    const { level } = useParams();

    const chars = useCharacters();
    const { selected } = useSelected();
    const lsChar = chars[selected];

    // Use a ref to hold the mutable battle instance
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
    const battleRef = useRef<Battle>(new Battle([char], getRandomEncounter(Number(level) as LevelRange)));

    function handleStartCombat() {
        battleRef.current.startCombat();
        setCombat('in');
    }

    // Use state to trigger rerenders
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [turn, setTurn] = useState(0);
    const [combat, setCombat] = useState<'before' | 'in' | 'after'>('before');
    // TODO: add slider or buttons to change combat speed
    const [delay, setDelay] = useState<number>(1000);

    useInterval(() => {
        if (battleRef.current) {
            const turnRes = battleRef.current.nextTurn();
            if (turnRes.combatEnded) {
                // Add exp and loot
                setCombat('after');
            }
            setTurn(t => t + 1); // Force rerender
        }
    }, combat === 'in' ? delay : null);

    if (isNaN(Number(level))) {
        return <div>Invalid level {level}</div>;
    }

    const battle = battleRef.current;
    return (
        <div>
            {combat === 'before' && <Button onClick={() => handleStartCombat()}>Start Battle</Button>}
            <BattleComponent
                left={battle.left.map(char => toBattleCharacter(char))}
                right={battle.right.map(char => toBattleCharacter(char))}
                turnOrder={battle.turnOrder.map(char => char.char.name)}
                turnIndex={battle.turnIndex}
                combatLog={battle.log.flatLog}
            />
        </div>
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