import { AttributeType, Character, levelExp, LevelRange, StatType } from "@wholesome-sisters/auto-battler";
import Weapon, { WeaponProps } from "./components/Weapon";
import CharacterSheetAttributes from "./components/CharacterSheetAttributes";
import CharacterSheetStats from "./components/CharacterSheetStats";
import CharacterSheetPotion from "./components/CharacterScreenPotion";
import { classTextColor } from "../../utils/classColour";
import AbilitySelector from "./components/AbilitySelector";
import { cn } from "@/utils/utils";
import Pet from "./components/Pet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import AttributeInfoTooltip from "./components/AttributeInfoTooltip";

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

    const classColor = char.className ? classTextColor[char.className] : '';

    return (
        <div className='space-y-6'>
            <div className='w-fit mx-auto sm:mx-0'>
                <h2 className={cn('text-xl font-bold', classColor)}>{char.name}</h2>
                <div>Level {char.level} <b className={classColor}>{char.className}</b></div>
                <div>{exp}/{levelExp[char.level as LevelRange]} Experience</div>
            </div>

            <Separator />

            <div className='flex flex-row flex-wrap gap-6 flex-1'>
                <div className='mx-auto sm:mx-0 space-y-2'>
                    <div className='flex flex-row items-center gap-1'>
                        <h3 className='text-xl font-bold'>Attributes</h3>
                        <AttributeInfoTooltip />
                    </div>
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
                    <CharacterSheetStats className='flex flex-row flex-wrap flex-1 justify-center sm:justify-start gap-4' stats={char.stats} />
                </div>
            </div>

            {char.className &&
                <>
                    <Separator />
                    <div className='space-y-2'>
                        <h3 className='text-xl font-bold'>Abilities</h3>
                        <AbilitySelector char={char} className={char.className} />
                    </div>
                </>
            }

            <Separator />

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
                <>
                    <Separator />
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='justify-start items-center cursor-pointer gap-2'>
                                <h3 className='text-lg font-bold'>Pet</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Pet pet={char.pet} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            }
        </div>
    );
};