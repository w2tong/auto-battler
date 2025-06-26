import { Character, StatType } from "@wholesome-sisters/auto-battler";
import AbilityCard from "./AbilityCard";
import CharacterSheetStats from "./CharacterSheetStats";
import { Separator } from "@/components/ui/separator";
import Weapon, { WeaponProps } from "./Weapon";
import { cn } from "@/utils/utils";

type PetProps = { pet: Character; };
export default function Pet({ pet }: PetProps) {
    // Weapons
    const mainHand = pet.equipment.mainHand;
    const mhDamageRange = pet.calcDamageRange({ damageRange: mainHand.damageRange, weaponAttack: true, spellPowerRatio: mainHand.spellPowerRatio });
    const mhProps: WeaponProps = {
        name: mainHand.name,
        type: mainHand.type,
        min: mhDamageRange.min,
        max: mhDamageRange.max,
        accuracy: pet.stats.getAccuracy(mainHand.attackType),
        tier: mainHand.tier
    };

    const offHand = pet.equipment.offHandWeapon;
    let ohProps: WeaponProps | null = null;
    if (offHand) {
        const ohDamageRange = pet.calcDamageRange({ damageRange: offHand.damageRange, weaponAttack: true, spellPowerRatio: offHand.spellPowerRatio });
        ohProps = {
            name: offHand.name,
            type: offHand.type,
            min: ohDamageRange.min,
            max: ohDamageRange.max,
            accuracy: pet.stats.getAccuracy(offHand.attackType) + pet.stats.getStat(StatType.OffHandAccuracy),
            tier: offHand.tier
        };
    }

    return (
        <div className='space-y-6'>

            <div>
                <h3 className='text-xl font-bold'>{pet.name}</h3>
                <p className='text-base'>Pets inherit 50% of the owner's stats from attributes and items.</p>
            </div>

            <Separator />

            <div className='space-y-2'>
                <h4 className='text-lg font-bold text-center sm:text-left'>Stats</h4>
                <CharacterSheetStats className='flex flex-row flex-wrap flex-1 justify-center sm:justify-start gap-4' stats={pet.stats} />
            </div>

            {
                pet.ability &&
                <>
                    <Separator />

                    <div className='space-y-2'>
                        <h4 className='text-lg font-bold'>Ability</h4>
                        <AbilityCard ability={pet.ability} description={pet.ability.description(pet)} />
                    </div>
                </>
            }

            <div className='space-y-2'>
                <h3 className='text-xl font-bold'>Weapons</h3>
                <div className={cn('grid grid-cols-1 space-x-0 xs:space-x-2 space-y-2 xs:space-y-0', offHand && 'xs:grid-cols-2')}>
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
        </div>
    );
}
