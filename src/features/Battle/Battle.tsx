import { useState, useRef, useEffect } from "react";
import { useCharactersDispatch } from "../../hooks/Characters/CharactersContext";
import BattleDisplay from "./components/BattleDisplay";
import { AttributeType, Battle, Character, createEquipmentImport, encounterExp, getRandomEncounter, levelExp, LevelRange, lootTables, Side, startingAbility, StatType } from "@wholesome-sisters/auto-battler";
import BattleCharacter from "./types/BattleCharacter";
import useInterval from "../../hooks/useInterval";
import Button from "../../components/Button";
import { useInventoryDispatch } from "../../hooks/Inventory/InventoryContext";
import Switch from "../../components/Switch";
import { LocalStorageCharacter } from "../../types/LocalStorage";
import { cn } from "../../utils/utils";
import { BuffBar, DebuffBar } from "../../types/StatusEffectBar";

const DEFAULT_DELAY = 1000;
const SPEEDS = {
    '0.5x': 0.5,
    '1x': 1,
    '2x': 2,
    '4x': 4,
    '10x': 10,
};

export default function BattleWrapper({ lsChar, index, encounterLevel }: { lsChar: LocalStorageCharacter, index: number, encounterLevel: LevelRange; }) {
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
            ability: startingAbility[lsChar.class],
            petId: lsChar.pet ?? undefined
        });
        battleRef.current = new Battle([char], getRandomEncounter(encounterLevel));
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
            ability: startingAbility[lsChar.class],
            petId: lsChar.pet ?? undefined
        });
        battleRef.current = new Battle([char], getRandomEncounter(encounterLevel));
        setTurn(t => t + 1);
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
                    const expGain = encounterExp[encounterLevel];
                    let newExp = lsChar.exp + expGain;
                    let newLevel = lsChar.level;
                    while (newExp > levelExp[newLevel as LevelRange]) {
                        const expReq = levelExp[newLevel as LevelRange];
                        newExp = newExp - expReq;
                        newLevel += 1;
                    }
                    battleRef.current.log.addExp(lsChar.name, lsChar.exp);
                    if (newLevel > lsChar.level) battleRef.current.log.addLevelUp(lsChar.name, newLevel);
                    characterDispatch({ type: 'update', index, level: newLevel, exp: newExp });

                    // Add loot
                    const leveledLootTable = lootTables[encounterLevel];
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
                    {Object.entries(SPEEDS).map(([key, val], i) =>
                        <Button
                            key={key}
                            className={cn(i === 0 && 'rounded-l-xl', i === Object.values(SPEEDS).length - 1 && 'rounded-r-xl', val === combatSpeed && 'bg-button-hover')}
                            onClick={() => setCombatSpeed(val)}
                        >
                            {key}
                        </Button>
                    )}
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
            [StatType.Dodge]: char.stats.dodge,
            [StatType.Armour]: char.stats.getStat(StatType.Armour),
            [StatType.Deflection]: char.stats.getStat(StatType.Deflection),
        },
        mainHandDamage,
        offHandDamage,
        onHit: char.equipment.mainHand.onHit ? char.equipment.mainHand.onHit.description : null,
        ability: char.ability ? { name: char.ability.name, description: char.ability.description(char) } : null
    };
}