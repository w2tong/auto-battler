import { useState, useRef, useEffect } from "react";
import { useCharactersDispatch } from "@contexts/Characters/CharactersContext";
import BattleDisplay from "./components/BattleDisplay";
import { abilities, AttributeType, Battle as AutoBattle, Character, createEquipmentImport, encounterExp, getRandomEncounter, levelExp, LevelRange, lootTables, Side, StatType, TurnRes } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "./types/BattleCharacter";
import { useInventoryDispatch } from "@contexts/Inventory/InventoryContext";
import { LocalStorageCharacter, LocalStorageKey } from "../../types/LocalStorage";
import { BuffBar, DebuffBar } from "../../types/StatusEffectBar";
import PauseButton from "./components/PauseButton";
import { useInterval, useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { BATTLE_SPEEDS } from "@/utils/constants";
import BattleSpeed from "./components/BattleSpeed";
import AutoStart from "./components/AutoStart";

const DEFAULT_DELAY = 1000;

export default function Battle({ lsChar, index, encounterLevel }: { lsChar: LocalStorageCharacter, index: number, encounterLevel: LevelRange; }) {
    const characterDispatch = useCharactersDispatch();
    const inventoryDispatch = useInventoryDispatch();

    const [paused, setPaused] = useState<boolean>(false);

    const [battleSpeed, setBattleSpeed] = useLocalStorage<number>(LocalStorageKey.BattleSpeed, BATTLE_SPEEDS['1x']);
    const [autoStart, setAutoStart] = useLocalStorage<boolean>(LocalStorageKey.BattleAutoStart, false);

    const [combat, setCombat] = useState<'before' | 'in' | 'after'>('before');

    // Use state to trigger rerenders
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_turn, setTurn] = useState(-1);

    // Use a ref to hold the mutable battle instance
    const battleRef = useRef<AutoBattle | null>(null);
    const playerLevelRef = useRef<LevelRange>(lsChar.level as LevelRange);

    // Initialize battle on load
    useEffect(() => {
        const char = new Character({
            name: lsChar.name,
            level: playerLevelRef.current,
            className: lsChar.class,
            attributes: lsChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(lsChar.equipment),
            ability: abilities[lsChar.ability],
            petId: lsChar.pet ?? undefined
        });
        battleRef.current = new AutoBattle([char], getRandomEncounter(encounterLevel));
        setTurn(t => t + 1);
        setCombat('before');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    function newBattle() {
        playerLevelRef.current = lsChar.level as LevelRange;
        const char = new Character({
            name: lsChar.name,
            level: playerLevelRef.current,
            className: lsChar.class,
            attributes: lsChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(lsChar.equipment),
            ability: abilities[lsChar.ability],
            petId: lsChar.pet ?? undefined
        });
        battleRef.current = new AutoBattle([char], getRandomEncounter(encounterLevel));
        setTurn(t => t + 1);
        setCombat('before');
    }

    function startCombat() {
        battleRef.current?.startCombat();
        setCombat('in');
    }

    useInterval(() => {
        if (battleRef.current) {
            const battle = battleRef.current;
            let turnRes: TurnRes = { combatEnded: false };

            turnRes = battle.nextTurn();

            if (turnRes.combatEnded) {
                setCombat('after');
                if (turnRes.winner && turnRes.winner === Side.Left) {
                    // Add exp/level up
                    const expGain = encounterExp[encounterLevel];
                    let newExp = lsChar.exp + expGain;
                    let newLevel = lsChar.level;
                    while (newExp > levelExp[newLevel as LevelRange]) {
                        const expReq = levelExp[newLevel as LevelRange];
                        newExp = newExp - expReq;
                        newLevel += 1;
                    }
                    battle.log.addExp(lsChar.name, expGain);
                    if (newLevel > lsChar.level) battle.log.addLevelUp(lsChar.name, newLevel);
                    characterDispatch({ type: 'update', index, level: newLevel, exp: newExp });

                    // Add loot
                    const leveledLootTable = lootTables[encounterLevel];
                    const lootTable = Math.random() <= leveledLootTable.rareChance ? leveledLootTable.rare : leveledLootTable.normal;
                    const itemId = lootTable[Math.floor(Math.random() * lootTable.length)];
                    inventoryDispatch({ type: 'update', itemId });
                    battle.log.addLoot(lsChar.name, itemId);
                }
            }

            // Do turns of dead characters without delay (waiting for interval)
            let char = battle.turnOrder[battle.turnIndex].char;
            while (char.isDead()) {
                turnRes = battle.nextTurn();
                char = battle.turnOrder[battle.turnIndex].char;
                if (turnRes.combatEnded === true) break;
            }

            setTurn(t => t + 1); // Force rerender
        }
    }, combat === 'in' && !paused ? DEFAULT_DELAY / battleSpeed : null);

    useEffect(() => {
        if (autoStart && combat === 'before') {
            startCombat();
        }
    }, [autoStart, combat]);

    const battle = battleRef.current;
    return (
        <div className='flex flex-col justify-center w-full mx-0 xl:mx-auto 2xl:w-[1536px] pt-1'>
            <div className='flex flex-row items-center h-[72px] gap-x-1 sm:gap-x-6 justify-evenly sm:justify-start'>
                <div className='flex flex-col sm:flex-row flex-wrap gap-1'>
                    <Button onClick={() => newBattle()}>New Battle</Button>
                    {combat === 'before' && <Button onClick={() => startCombat()}>Start Battle</Button>}
                </div>
                <PauseButton className='w-12 h-12' paused={paused} onClick={() => setPaused(prev => !prev)} />
                <BattleSpeed speed={battleSpeed} onChange={setBattleSpeed} />
                <AutoStart checked={autoStart} onChange={() => setAutoStart(auto => !auto)} />
            </div>

            {battle && (
                <BattleDisplay
                    left={battle.left.map(char => toBattleCharacter(char))}
                    right={battle.right.map(char => toBattleCharacter(char))}
                    turnOrder={battle.aliveTurnOrder.map(c => { return { name: c.char.name, index: c.index }; })}
                    turnIndex={battle.turnIndex}
                    combatLog={battle.log.flatLog}
                />
            )}
        </div>
    );
}

function toBattleCharacter(char: Character): BattleCharacter {
    const buffs: BuffBar = [];
    for (const buffGroup of Object.values(char.statusEffectManager.buffs)) {
        for (const buff of Object.values(buffGroup)) {
            buffs.push(buff);
        }
    }

    const debuffs: DebuffBar = [];
    for (const debuffGroup of Object.values(char.statusEffectManager.debuffs)) {
        for (const debuff of Object.values(debuffGroup)) {
            debuffs.push(debuff);
        }
    }

    const mainHand = char.equipment.mainHand;
    const mainHandDamage = char.calcDamageRange({ damageRange: mainHand.damageRange, weaponAttack: true, spellPowerRatio: mainHand.spellPowerRatio });

    const offHand = char.equipment.offHandWeapon;
    const offHandDamage = offHand ? char.calcDamageRange({ damageRange: offHand.damageRange, weaponAttack: true, spellPowerRatio: offHand.spellPowerRatio }) : null;

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
        debuffs,
        attr: {
            [AttributeType.Strength]: char.attributes.strength,
            [AttributeType.Dexterity]: char.attributes.dexterity,
            [AttributeType.Constitution]: char.attributes.constitution,
            [AttributeType.Perception]: char.attributes.perception,
            [AttributeType.Intelligence]: char.attributes.intelligence,
            [AttributeType.Wisdom]: char.attributes.wisdom
        },
        stats: {
            [StatType.Accuracy]: char.stats.getAccuracy(char.equipment.mainHand.attackType),
            [StatType.Armour]: char.stats.getStat(StatType.Armour),
            [StatType.ArmourPenetration]: char.stats.getStat(StatType.ArmourPenetration),
            [StatType.Deflection]: char.stats.getStat(StatType.Deflection),
            [StatType.Dodge]: char.stats.dodge,
        },
        mainHandDamage,
        offHandDamage,
        onHit: char.equipment.mainHand.onHit ? char.equipment.mainHand.onHit.description : null,
        ability: char.ability ? { name: char.ability.name, description: char.ability.description(char) } : null
    };
}