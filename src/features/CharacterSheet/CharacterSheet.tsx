// import { CharacterInfo, EquipmentItemIds, createEquipment, levelExp, newPlayerChar } from '@wholesome-sisters/auto-battler';
// import { Character } from '../character-select/character-select-option';
// import { useEffect, useState } from 'react';

import { AttributeType, ClassName, levelExp, LevelRange, StatType } from "@wholesome-sisters/auto-battler";
import Weapon, { WeaponProps } from "./components/Weapon";
import CharacterSheetAttributes from "./components/CharacterSheetAttributes";
import CharacterSheetStats from "./components/CharacterSheetStats";

// type CharacterSheetProps = {
//     character: Character;
//     equipmentItemIds: EquipmentItemIds;
// }

// export default function CharacterSheet(props: CharacterSheetProps) {
export default function CharacterSheet(
    { name, level, className, exp, attributes, stats, mainHand, offHand }:
        { name: string, level: number, className: ClassName, exp: number, attributes: { [attr in AttributeType]: { base: number, bonus: number; } }, stats: { [stat in StatType]: number }, mainHand: WeaponProps, offHand?: WeaponProps; }
) {
    // const { character, equipmentItemIds } = props;
    // const info: CharacterInfo = newPlayerChar('', { name: character.name, level: character.level, class: character.class }, createEquipment(equipmentItemIds)).info();

    return (
        <div>
            <h2>Character Sheet</h2>
            <h3>{name}</h3>
            <div>Level {level} {className}</div>
            <div>{exp}/{levelExp[level as LevelRange]} Experience</div>

            <br />

            <div className='flex flex-row space-x-10'>
                <CharacterSheetAttributes level={level as LevelRange} attributes={attributes} />
                <CharacterSheetStats stats={stats} />
            </div>

            <br />

            <div>
                <h3>Weapons</h3>
                <div className='flex flex-row space-x-2'>
                    <div>
                        <h3>Main-hand</h3>
                        <Weapon name={mainHand.name} type={mainHand.type} min={mainHand.min} max={mainHand.max} accuracy={mainHand.accuracy} damageType={mainHand.damageType} tier={mainHand.tier} />
                    </div>
                    {offHand &&
                        <div>
                            <h3>Off-hand</h3>
                            <Weapon name={offHand.name} type={offHand.type} min={offHand.min} max={offHand.max} accuracy={offHand.accuracy} damageType={offHand.damageType} tier={offHand.tier} />
                        </div>
                    }
                </div>
            </div>

            <div>PH - ABILITY GOES HERE</div>

            {
                <div>PH - POTION GOES HERE</div>
                /* {info.potion ?
                    <>
                        <br />
                        <CharacterSheetPotion potion={info.potion} potionEFf={info.potionEffectiveness} />
                    </>
                    : null
                } */
            }

        </div>
    );
}