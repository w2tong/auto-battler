import { AttributeType, Character, levelExp, LevelRange, StatType } from "@wholesome-sisters/auto-battler";
import Weapon, { WeaponProps } from "./components/Weapon";
import CharacterSheetAttributes from "./components/CharacterSheetAttributes";
import CharacterSheetStats from "./components/CharacterSheetStats";
import CharacterSheetPotion from "./components/CharacterScreenPotion";
import { classTextColor } from "../../utils/classColour";
import AbilitySelector from "./components/AbilitySelector";
import { cn } from "@/utils/utils";
import Pet from "./components/Pet";
import { useToggle } from "usehooks-ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import caretDown from '@assets/ui/caret-down.svg';
import caretUp from '@assets/ui/caret-up.svg';

type CharacterSheetProps = { char: Character, exp: number; };
export default function CharacterSheet({ char, exp }: CharacterSheetProps) {
    // Attributes
    const str = char.attributes[AttributeType.Strength];
    const dex = char.attributes[AttributeType.Dexterity];
    const per = char.attributes[AttributeType.Perception];
    const con = char.attributes[AttributeType.Constitution];
    const int = char.attributes[AttributeType.Intelligence];
    const wis = char.attributes[AttributeType.Wisdom];

    // Weapons
    const mainHand = char.equipment.mainHand;
    const mhDamageRange = char.calcDamageRange({ damageRange: mainHand.damageRange, weaponAttack: true, spellPowerRatio: mainHand.spellPowerRatio });
    const mhProps: WeaponProps = {
        name: mainHand.name,
        type: mainHand.type,
        min: mhDamageRange.min,
        max: mhDamageRange.max,
        accuracy: char.stats.getAccuracy(mainHand.attackType),
        tier: mainHand.tier
    };

    const offHand = char.equipment.offHandWeapon;
    let ohProps: WeaponProps | null = null;
    if (offHand) {
        const ohDamageRange = char.calcDamageRange({ damageRange: offHand.damageRange, weaponAttack: true, spellPowerRatio: offHand.spellPowerRatio });
        ohProps = {
            name: offHand.name,
            type: offHand.type,
            min: ohDamageRange.min,
            max: ohDamageRange.max,
            accuracy: char.stats.getAccuracy(offHand.attackType) + char.stats.getStat(StatType.OffHandAccuracy),
            tier: offHand.tier
        };
    }

    const potion = char.equipment.potion;
    let potionProps = null;
    if (potion) {
        const potHealingRange = char.calcPotionHealingRange(potion?.healingRange);
        potionProps = {
            name: potion.name,
            min: potHealingRange.min,
            max: potHealingRange.max,
            charges: potion.charges,
            tier: potion.tier
        };
    }

    const [petOpen, togglePetOpen] = useToggle(false);

    const classColor = char.className ? classTextColor[char.className] : '';

    return (
        <div className='space-y-6'>
            <div className='w-fit mx-auto sm:mx-0'>
                <h2 className={cn('text-xl font-bold', classColor)}>{char.name}</h2>
                <div>Level {char.level} <b className={classColor}>{char.className}</b></div>
                <div>{exp}/{levelExp[char.level as LevelRange]} Experience</div>
            </div>

            <div className='flex flex-row flex-wrap gap-6 flex-1'>
                <div className='mx-auto sm:mx-0 space-y-2'>
                    <h3 className='text-xl font-bold'>Attributes</h3>
                    <CharacterSheetAttributes level={char.level as LevelRange} attributes={{
                        [AttributeType.Strength]: { base: str.base, bonus: str.bonus },
                        [AttributeType.Dexterity]: { base: dex.base, bonus: dex.bonus },
                        [AttributeType.Perception]: { base: per.base, bonus: per.bonus },
                        [AttributeType.Constitution]: { base: con.base, bonus: con.bonus },
                        [AttributeType.Intelligence]: { base: int.base, bonus: int.bonus },
                        [AttributeType.Wisdom]: { base: wis.base, bonus: wis.bonus },
                    }} />
                </div>
                <div className='space-y-2'>
                    <h3 className='text-xl font-bold text-center sm:text-left'>Stats</h3>
                    <CharacterSheetStats className='flex flex-row flex-wrap flex-1 justify-center sm:justify-start gap-4' stats={{
                        [StatType.MaxHealth]: char.stats.maxHealth,
                        [StatType.HealthPercent]: char.stats.getStat(StatType.HealthPercent),
                        [StatType.Armour]: char.stats.getStat(StatType.Armour),
                        [StatType.Deflection]: char.stats.getStat(StatType.Deflection),
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
                    }} />
                </div>
            </div>

            {char.className &&
                <div className='space-y-2'>
                    <h3 className='text-xl font-bold'>Abilities</h3>
                    <AbilitySelector char={char} className={char.className} />
                </div>
            }

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                    <h3 className='text-xl font-bold'>Weapons</h3>
                    <div className='grid grid-cols-1 xs:grid-cols-2 space-x-0 xs:space-x-2 space-y-2 xs:space-y-0'>
                        <div>
                            <h4 className='text-lg font-bold'>Main-hand</h4>
                            <Weapon
                                name={mhProps.name}
                                type={mhProps.type}
                                min={mhProps.min}
                                max={mhProps.max}
                                accuracy={mhProps.accuracy}
                                tier={mhProps.tier}
                            />
                        </div>
                        {ohProps &&
                            <div>
                                <h4 className='text-lg font-bold'>Off-hand</h4>
                                <Weapon
                                    name={ohProps.name}
                                    type={ohProps.type}
                                    min={ohProps.min}
                                    max={ohProps.max}
                                    accuracy={ohProps.accuracy}
                                    tier={ohProps.tier}
                                />
                            </div>
                        }
                    </div>
                </div>
                {potionProps && <CharacterSheetPotion name={potionProps.name} min={potionProps.min} max={potionProps.max} charges={potionProps.charges} tier={potionProps.tier} />}
            </div>

            {char.pet &&
                <Collapsible open={petOpen} onOpenChange={togglePetOpen}>
                    <CollapsibleTrigger>
                        <h1 className='text-xl font-bold flex flex-row items-center gap-0.5 cursor-pointer'>
                            <span>Pet</span><img className='mt-[2px] w-8 h-8' src={petOpen ? caretUp : caretDown} />
                        </h1>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Pet pet={char.pet} />
                    </CollapsibleContent>
                </Collapsible>

            }
        </div>
    );
};