// import { CharacterInfo, EquipmentItemIds, createEquipment, levelExp, newPlayerChar } from '@wholesome-sisters/auto-battler';
// import { Character } from '../character-select/character-select-option';
// import { useEffect, useState } from 'react';

import { AttributeType, ClassName, levelExp, LevelRange, StatType } from "@wholesome-sisters/auto-battler";
import Weapon, { WeaponProps } from "./components/Weapon";
import Attributes from "./components/Attributes";
import Stat from "./components/Stat";

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
            <h1>Character Sheet</h1>
            <h2>{name}</h2>
            <div>Level {level} {className}</div>
            <div>{exp}/{levelExp[level as LevelRange]} Experience</div>

            <br />

            <div className='flex flex-row space-x-10'>
                <Attributes level={level} attributes={attributes} />
                <div>
                    <h2>Stats</h2>
                    <Stat stat={StatType.MaxHealth} num={stats[StatType.MaxHealth]} />
                    <Stat stat={StatType.Armour} num={stats[StatType.Armour]} />
                    <Stat stat={StatType.Deflection} num={stats[StatType.Deflection]} />
                    <Stat stat={StatType.Dodge} num={stats[StatType.Dodge]} />
                    {/* <Stat stat={StatType.StatusResistance} num={stats[StatType.StatusResistance]} /> */}
                    <Stat stat={StatType.Thorns} num={stats[StatType.Thorns]} />

                    <Stat stat={StatType.BlockChance} num={stats[StatType.BlockChance]} />
                    <Stat stat={StatType.BlockPower} num={stats[StatType.BlockPower]} />

                    <Stat stat={StatType.Accuracy} num={stats[StatType.Accuracy]} />
                    <Stat stat={StatType.OffHandAccuracy} num={stats[StatType.OffHandAccuracy]} />
                    <Stat stat={StatType.MeleeAccuracy} num={stats[StatType.MeleeAccuracy]} />
                    <Stat stat={StatType.RangedAccuracy} num={stats[StatType.RangedAccuracy]} />

                    <Stat stat={StatType.Damage} num={stats[StatType.Damage]} />
                    <Stat stat={StatType.DamagePercent} num={stats[StatType.DamagePercent]} />

                    <Stat stat={StatType.CriticalChance} num={stats[StatType.CriticalChance]} />
                    <Stat stat={StatType.CriticalDamage} num={stats[StatType.CriticalDamage]} />

                    <Stat stat={StatType.ArmourPenetration} num={stats[StatType.ArmourPenetration]} />
                    <Stat stat={StatType.DodgeReduction} num={stats[StatType.DodgeReduction]} />

                    <Stat stat={StatType.SpellAccuracy} num={stats[StatType.SpellAccuracy]} />
                    <Stat stat={StatType.SpellPower} num={stats[StatType.SpellPower]} />

                    <Stat stat={StatType.ManaCost} num={stats[StatType.ManaCost]} />
                    <Stat stat={StatType.StartingMana} num={stats[StatType.StartingMana]} />
                    <Stat stat={StatType.ManaRegen} num={stats[StatType.ManaRegen]} />
                    <Stat stat={StatType.ManaOnHit} num={stats[StatType.ManaOnHit]} />

                    <Stat stat={StatType.Initiative} num={stats[StatType.Initiative]} />

                    <Stat stat={StatType.PotionCharges} num={stats[StatType.PotionCharges]} />
                    <Stat stat={StatType.PotionHealing} num={stats[StatType.PotionHealing]} />
                    <Stat stat={StatType.PotionEffectiveness} num={stats[StatType.PotionEffectiveness]} />
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