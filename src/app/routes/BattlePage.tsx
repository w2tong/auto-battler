import { useState, useRef, useEffect } from "react";
import { useCharacters, useCharactersDispatch, useSelected } from "../../hooks/Characters/CharactersContext";
import BattleComponent from "../../features/Battle/BattleComponent";
import { Battle, BuffId, Character, createEquipmentImport, DebuffId, encounterExp, getRandomEncounter, levelExp, LevelRange, lootTables, Side, startingAbility, StatType } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "../../types/BattleCharacter";
import useInterval from "../../hooks/useInterval";
import { useParams } from "react-router";
import Button from "../../components/Button";
import { useInventoryDispatch } from "../../hooks/Inventory/InventoryContext";
import Switch from "../../components/Switch";

const DEFAULT_DELAY = 1000;
const SPEEDS = {
    '0.5x': 0.5,
    '1x': 1,
    '2x': 2,
    '4x': 4,
    '10x': 10,
};

export default function BattlePage() {
    const param = useParams();
    const level: LevelRange = Number(param.level) as LevelRange;

    const chars = useCharacters();
    const characterDispatch = useCharactersDispatch();
    const inventoryDispatch = useInventoryDispatch();
    const { selected } = useSelected();
    const lsChar = chars[selected];
    // TODO: fix for case where lsChar is undefined (when no character is selected)

    const lsCombatSpeed = localStorage.getItem('combat-speed');
    const [combatSpeed, setCombatSpeed] = useState(lsCombatSpeed ? Number(lsCombatSpeed) : 1);
    useEffect(() => {
        localStorage.setItem('combat-speed', combatSpeed.toString());
    }, [combatSpeed]);

    const lsAutoCombatStart = localStorage.getItem('auto-combat-start');
    const [autoStartCombat, setAutoStartCombat] = useState(lsAutoCombatStart === 'true');
    useEffect(() => {
        localStorage.setItem('auto-combat-start', autoStartCombat.toString());
    }, [autoStartCombat]);

    const [combat, setCombat] = useState<'before' | 'in' | 'after'>('before');

    // Use state to trigger rerenders
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [turn, setTurn] = useState(-1);

    // Use a ref to hold the mutable battle instance
    // TODO: update charRef when switching characters
    const charRef = useRef<Character | null>(lsChar ? new Character({
        name: lsChar.name,
        level: lsChar.level,
        className: lsChar.class,
        attributes: lsChar.attributes,
        statTemplate: {},
        equipment: createEquipmentImport(lsChar.equipment),
        ability: startingAbility[lsChar.class],
        petId: lsChar.pet ?? undefined
    }) : null);
    const battleRef = useRef<Battle | null>(null);

    // Initialize battle on load
    useEffect(() => {
        if (charRef.current) {
            battleRef.current = new Battle([charRef.current], getRandomEncounter(level));
        }
        setTurn(0);
    }, [level]);

    function newBattle() {
        charRef.current = new Character({
            name: lsChar.name,
            level: lsChar.level,
            className: lsChar.class,
            attributes: lsChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(lsChar.equipment),
            ability: startingAbility[lsChar.class],
            petId: lsChar.pet ?? undefined
        });
        battleRef.current = new Battle([charRef.current], getRandomEncounter(level));
        setTurn(0);
        setCombat('before');
    }

    function startCombat() {
        battleRef.current?.startCombat();
        setCombat('in');
    }

    useInterval(() => {
        if (battleRef.current) {
            const turnRes = battleRef.current.nextTurn();
            if (turnRes.combatEnded) {
                setCombat('after');
                if (turnRes.winner && turnRes.winner === Side.Left) {
                    // Add exp/level up
                    const exp = encounterExp[level];
                    let newExp = lsChar.exp + exp;
                    let newLevel = lsChar.level;
                    while (newExp > levelExp[newLevel as LevelRange]) {
                        const expReq = levelExp[newLevel as LevelRange];
                        newExp = newExp - expReq;
                        newLevel += 1;
                    }
                    battleRef.current.log.addExp(lsChar.name, exp);
                    if (newLevel > lsChar.level) battleRef.current.log.addLevelUp(lsChar.name, newLevel);
                    characterDispatch({ type: 'update', index: selected, level: newLevel, exp: newExp });

                    // Add loot
                    const leveledLootTable = lootTables[level];
                    const lootTable = Math.random() <= leveledLootTable.rareChance ? leveledLootTable.rare : leveledLootTable.normal;
                    const itemId = lootTable[Math.floor(Math.random() * lootTable.length)];
                    inventoryDispatch({ type: 'update', itemId });
                    battleRef.current.log.addLoot(lsChar.name, itemId);
                }
            }
            setTurn(t => t + 1); // Force rerender
        }
    }, combat === 'in' ? DEFAULT_DELAY / combatSpeed : null);

    useEffect(() => {
        if (autoStartCombat && combat === 'before') {
            startCombat();
        }
    }, [autoStartCombat, combat]);

    if (isNaN(Number(level))) {
        return <div>Invalid level {level}</div>;
    }

    const battle = battleRef.current;
    if (!lsChar) {
        return 'Select a character to battle.';
    }
    return (
        <div>
            <div>
                <Button onClick={() => newBattle()}>New Battle</Button>
                {combat === 'before' && <Button onClick={() => startCombat()}>Start Battle</Button>}
            </div>

            <div className='flex flex-row'>
                <div className='flex flex-row items-center'>
                    <h2 className=''>Combat Speed: </h2>
                    {Object.entries(SPEEDS).map(([key, val]) => <Button key={key} className={`${val === combatSpeed ? 'bg-button-hover' : ''}`} onClick={() => setCombatSpeed(val)}>{key}</Button>)}
                </div>
                <div className='flex flex-row items-center'>
                    <h2>Auto Start: </h2>
                    <Switch checked={autoStartCombat} onChange={() => setAutoStartCombat(auto => !auto)} />
                </div>
            </div>

            {battle && (
                <BattleComponent
                    left={battle.left.map(char => toBattleCharacter(char))}
                    right={battle.right.map(char => toBattleCharacter(char))}
                    turnOrder={battle.turnOrder.map(char => char.char.name)}
                    turnIndex={battle.turnIndex}
                    combatLog={battle.log.flatLog}
                />
            )}
        </div>
    );
}

function toBattleCharacter(char: Character): BattleCharacter {
    const buffs: Partial<Record<BuffId, number>> = {};
    for (const buffId of Object.values(BuffId)) {
        const stacks = char.statusEffectManager.getBuffStacks(buffId);
        if (stacks > 0) buffs[buffId] = stacks;
    }
    const debuffs: Partial<Record<DebuffId, number>> = {};
    for (const debuffId of Object.values(DebuffId)) {
        const stacks = char.statusEffectManager.getDebuffStacks(debuffId);
        if (stacks > 0) debuffs[debuffId] = stacks;
    }

    return {
        name: char.name,
        level: char.level,
        className: char.className,
        npcId: char.npcId,
        currHealth: char.currentHealth,
        maxHealth: char.stats.maxHealth,
        currMana: char.currentMana,
        manaCost: char.stats.getStat(StatType.ManaCost),
        buffs,
        debuffs
    };
}