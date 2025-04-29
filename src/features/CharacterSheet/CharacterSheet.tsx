// import { CharacterInfo, EquipmentItemIds, createEquipment, levelExp, newPlayerChar } from '@wholesome-sisters/auto-battler';
// import { Character } from '../character-select/character-select-option';
// import { useEffect, useState } from 'react';

import { AttributeType, ClassName, levelExp, StatType } from "@wholesome-sisters/auto-battler";
import Weapon, { WeaponProps } from "./components/Weapon";

// type CharacterSheetProps = {
//     character: Character;
//     equipmentItemIds: EquipmentItemIds;
// }

// export default function CharacterSheet(props: CharacterSheetProps) {
export default function CharacterSheet(
    { name, level, className, exp, attributes, stats, mainHand, offHand }:
        { name: string, level: number, className: ClassName, exp: number, attributes: { [attr in AttributeType]: number }, stats: { [stat in StatType]: number }, mainHand: WeaponProps, offHand?: WeaponProps; }
) {
    // const { character, equipmentItemIds } = props;
    // const info: CharacterInfo = newPlayerChar('', { name: character.name, level: character.level, class: character.class }, createEquipment(equipmentItemIds)).info();

    return (
        <div>
            <h1>Character Sheet</h1>
            <h2>{name}</h2>
            <div>Level {level} {className}</div>
            <div>{exp}/{levelExp[level]} Experience</div>

            <br />

            <div className='flex flex-row space-x-10'>
                <div>
                    <h2>Attributes</h2>
                    <div>Strength: {attributes[AttributeType.Strength]}</div>
                    <div>Dexterity: {attributes[AttributeType.Dexterity]}</div>
                    <div>Perception: {attributes[AttributeType.Perception]}</div>
                    <div>Constitution: {attributes[AttributeType.Constitution]}</div>
                    <div>Intelligence: {attributes[AttributeType.Intelligence]}</div>
                    <div>Wisdom: {attributes[AttributeType.Wisdom]}</div>
                </div>
                <div>
                    <h2>Stats</h2>
                    <div>Health: {stats[StatType.MaxHealth]}</div>
                    <div>Armour: {stats[StatType.Armour]}</div>
                    <div>Deflection: {stats[StatType.Deflection]}</div>
                    <div>Dodge: {stats[StatType.Dodge]}</div>
                    <div>Status Resistance: {stats[StatType.StatusResistance]}</div>
                    <div>Thorns: {stats[StatType.Thorns]}</div>

                    <div>Block Chance: {stats[StatType.BlockChance]}</div>
                    <div>Block Power: {stats[StatType.BlockPower]}</div>

                    <div>Accuracy: {stats[StatType.Accuracy]}</div>
                    <div>Off-hand Accuracy: {stats[StatType.OffHandAccuracy]}</div>
                    <div>Melee Accuracy: {stats[StatType.Accuracy]}</div>
                    <div>Ranged Accuracy: {stats[StatType.RangedAccuracy]}</div>

                    <div>Damage: {stats[StatType.Damage]}</div>
                    <div>Damage Percent: {stats[StatType.DamagePercent]}</div>

                    <div>Critical Chance: {stats[StatType.CriticalChance]}</div>
                    <div>Critical Damage: {stats[StatType.CriticalDamage]}</div>

                    <div>Armour Penetration: {stats[StatType.ArmourPenetration]}</div>
                    <div>Dodge Reduction: {stats[StatType.DodgeReduction]}</div>


                    <div>Spell Accuracy: {stats[StatType.SpellAccuracy]}</div>
                    <div>Spell Power: {stats[StatType.SpellPower]}</div>

                    <div>Mana Cost: {stats[StatType.ManaCost]}</div>
                    <div>Starting Mana: {stats[StatType.StartingMana]}</div>
                    <div>Mana Regen: {stats[StatType.ManaRegen]}</div>
                    <div>Mana On Hit: {stats[StatType.ManaOnHit]}</div>

                    <div>Initiative: {stats[StatType.Initiative]}</div>

                    <div>Potion Charges: {stats[StatType.PotionCharges]}</div>
                    <div>Potion Healing: {stats[StatType.PotionHealing]}</div>
                    <div>Potion Effectiveness: {stats[StatType.PotionEffectiveness]}</div>
                </div>
            </div>

            <br />

            <div>
                <h2>Weapons</h2>
                <div className='flex flex-row'>
                    <div>
                        <h3>Main-hand</h3>
                        <Weapon name={mainHand.name} type={mainHand.type} min={mainHand.min} max={mainHand.max} accuracy={mainHand.accuracy} />
                    </div>
                    {offHand &&
                        <div>
                            <h3>Off-hand</h3>
                            <Weapon name={offHand.name} type={offHand.type} min={offHand.min} max={offHand.max} accuracy={offHand.accuracy} />
                        </div>
                    }
                </div>
            </div>

            {/* {info.potion ?
                <>
                    <br />
                    <CharacterSheetPotion potion={info.potion} potionEFf={info.potionEffectiveness} />
                </>
                : null
            } */}

        </div>
    );
}