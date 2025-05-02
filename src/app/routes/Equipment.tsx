import { AttributeType, Character, createEquipmentImport, StatType } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "../../features/CharacterSheet/CharacterSheet";
import { WeaponProps } from "../../features/CharacterSheet/components/Weapon";
import { useCharacters, useSelected } from "../../hooks/Characters/CharactersContext";

function Equipment() {
    const characters = useCharacters();
    const { selected } = useSelected();
    const selectedChar = characters[selected];

    if (!selectedChar) {
        return (
            <>
                Select a character.
            </>
        );
    }

    const char = new Character({
        name: selectedChar.name,
        level: selectedChar.level,
        className: selectedChar.class,
        attributes: selectedChar.attributes,
        statTemplate: {},
        equipment: createEquipmentImport(selectedChar.equipment)
    });

    const mainHand = char.equipment.mainHand;
    const { min, max } = char.calcDamageRange({
        damageRange: mainHand.damageRange,
        weaponAttack: true,
        spellPowerRatio: mainHand.spellPowerRatio
    });

    const mainHandProps: WeaponProps = {
        name: mainHand.name,
        type: mainHand.type,
        min,
        max,
        accuracy: char.stats.getAccuracy(mainHand.attackType)
    };

    const offHand = char.equipment.offHandWeapon;
    let offHandProps: WeaponProps | undefined;
    if (offHand) {
        const { min, max } = char.calcDamageRange({
            damageRange: offHand.damageRange,
            weaponAttack: true,
            spellPowerRatio: offHand.spellPowerRatio
        });
        offHandProps = {
            name: offHand.name,
            type: offHand.type,
            min,
            max,
            accuracy: char.stats.getAccuracy(offHand.attackType) + char.stats.getStat(StatType.OffHandAccuracy)
        };
    }

    return (
        <>
            <div>
                This is the Equipment page.
                {/* TODO: change this to use char variable */}
                <CharacterSheet name={char.name} level={char.level} className={selectedChar.class} exp={50}
                    attributes={{
                        [AttributeType.Strength]: char.attributes.strength,
                        [AttributeType.Dexterity]: char.attributes.dexterity,
                        [AttributeType.Perception]: char.attributes.perception,
                        [AttributeType.Constitution]: char.attributes.constitution,
                        [AttributeType.Intelligence]: char.attributes.intelligence,
                        [AttributeType.Wisdom]: char.attributes.wisdom
                    }}
                    stats={{
                        [StatType.MaxHealth]: char.stats.maxHealth,
                        [StatType.HealthPercent]: char.stats.getStat(StatType.HealthPercent),
                        [StatType.Armour]: char.stats.getStat(StatType.Armour),
                        [StatType.Deflection]: char.stats.getStat(StatType.Armour),
                        [StatType.Dodge]: char.stats.dodge,
                        [StatType.StatusResistance]: char.stats.getStat(StatType.StatusResistance),
                        [StatType.Thorns]: char.stats.getStat(StatType.Thorns),
                        // Block
                        [StatType.BlockChance]: char.stats.getStat(StatType.BlockChance),
                        [StatType.BlockPower]: char.stats.getStat(StatType.BlockPower),

                        // Accuracy
                        [StatType.Accuracy]: char.stats.getStat(StatType.Accuracy),
                        [StatType.OffHandAccuracy]: char.stats.getStat(StatType.OffHandAccuracy),
                        [StatType.MeleeAccuracy]: char.stats.getStat(StatType.MeleeAccuracy),
                        [StatType.RangedAccuracy]: char.stats.getStat(StatType.RangedAccuracy),

                        // Damage
                        [StatType.Damage]: char.stats.getStat(StatType.Damage),
                        [StatType.DamagePercent]: char.stats.getStat(StatType.DamagePercent),

                        // Critical
                        [StatType.CriticalChance]: char.stats.getStat(StatType.CriticalChance),
                        [StatType.CriticalDamage]: char.stats.getStat(StatType.CriticalDamage),

                        // Defense Reduction
                        [StatType.ArmourPenetration]: char.stats.getStat(StatType.ArmourPenetration),
                        [StatType.DodgeReduction]: char.stats.getStat(StatType.DodgeReduction),

                        // Spell
                        [StatType.SpellAccuracy]: char.stats.getStat(StatType.SpellAccuracy),
                        [StatType.SpellPower]: char.stats.spellPower,
                        [StatType.SpellPowerPercent]: char.stats.getStat(StatType.SpellPowerPercent),

                        // Mana
                        [StatType.ManaCost]: char.stats.getStat(StatType.ManaCost),
                        [StatType.StartingMana]: char.stats.getStat(StatType.StartingMana),
                        [StatType.ManaRegen]: char.stats.getStat(StatType.ManaRegen),
                        [StatType.ManaOnHit]: char.stats.getStat(StatType.ManaOnHit),

                        // Initiative
                        [StatType.Initiative]: char.stats.getStat(StatType.Initiative),

                        // Potion
                        [StatType.PotionCharges]: char.stats.getStat(StatType.PotionCharges),
                        [StatType.PotionHealing]: char.stats.getStat(StatType.PotionHealing),
                        [StatType.PotionEffectiveness]: char.stats.getStat(StatType.PotionEffectiveness),
                    }}
                    mainHand={mainHandProps}
                    offHand={offHandProps}
                />
            </div>
        </>
    );
}

export default Equipment;