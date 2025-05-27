import { useState, useRef, useEffect, useCallback } from "react";
import { useCharactersDispatch } from "../../hooks/Characters/CharactersContext";
import BattleDisplay from "./components/BattleDisplay";
import { Battle, BuffId, Character, DebuffId, encounterExp, getRandomEncounter, levelExp, LevelRange, lootTables, Side, StatType } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "../../types/BattleCharacter";
import useInterval from "../../hooks/useInterval";
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

export default function BattleWrapper({ char, exp, index, level }: { char: Character, exp: number, index: number, level: LevelRange; }) {
    const characterDispatch = useCharactersDispatch();
    const inventoryDispatch = useInventoryDispatch();

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
    const [_turn, setTurn] = useState(-1);

    // Use a ref to hold the mutable battle instance
    const battleRef = useRef<Battle | null>(null);

    const newBattle = useCallback(function newBattle() {
        battleRef.current = new Battle([char], getRandomEncounter(level));
        setTurn(t => t + 1);
        setCombat('before');
    }, [char, level]);

    // Initialize battle on load
    useEffect(() => {
        newBattle();
    }, [newBattle]);

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
                    const expGain = encounterExp[level];
                    let newExp = exp + expGain;
                    let newLevel = char.level;
                    while (newExp > levelExp[newLevel as LevelRange]) {
                        const expReq = levelExp[newLevel as LevelRange];
                        newExp = newExp - expReq;
                        newLevel += 1;
                    }
                    battleRef.current.log.addExp(char.name, exp);
                    if (newLevel > char.level) battleRef.current.log.addLevelUp(char.name, newLevel);
                    characterDispatch({ type: 'update', index, level: newLevel, exp: newExp });

                    // Add loot
                    const leveledLootTable = lootTables[level];
                    const lootTable = Math.random() <= leveledLootTable.rareChance ? leveledLootTable.rare : leveledLootTable.normal;
                    const itemId = lootTable[Math.floor(Math.random() * lootTable.length)];
                    inventoryDispatch({ type: 'update', itemId });
                    battleRef.current.log.addLoot(char.name, itemId);
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

    const battle = battleRef.current;
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
                <BattleDisplay
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