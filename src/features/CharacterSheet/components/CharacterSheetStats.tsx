import { Stats, StatType } from "@wholesome-sisters/auto-battler";
import Stat from "./Stat";
import { cn } from "@/utils/utils";

const COL_WIDTH = 'w-[184px]';
const H4_CLASSES = 'text-md font-bold';

// Commented stats are currently have no source from items/abilities/talents
type CharacterSheetStats = { stats: Stats, className?: string; };
export default function CharacterSheetStats({ stats, className }: CharacterSheetStats) {
    const blockChance = stats.getStat(StatType.BlockChance);
    const blockPower = stats.getStat(StatType.BlockPower);

    return (
        <div className={cn('text-base', className)}>
            <div className={COL_WIDTH}>
                <h4 className={H4_CLASSES}>Defensive</h4>
                <Stat stat={StatType.MaxHealth} num={stats.maxHealth} />
                <Stat stat={StatType.Armour} num={stats.getStat(StatType.Armour)} />
                <Stat stat={StatType.Deflection} num={stats.getStat(StatType.Deflection)} />
                <Stat stat={StatType.Dodge} num={stats.dodge} />
                {/* <Stat stat={StatType.StatusResistance} num={stats.getStat(StatType.StatusResistance)} /> */}
                <Stat stat={StatType.Thorns} num={stats.getStat(StatType.Thorns)} />
                {blockChance !== 0 && blockPower !== 0 &&
                    <>
                        <Stat stat={StatType.BlockChance} num={blockChance} />
                        <Stat stat={StatType.BlockPower} num={blockPower} />
                    </>
                }
            </div>

            <div className={COL_WIDTH}>
                <h4 className={H4_CLASSES}>Offensive</h4>
                <Stat stat={StatType.Accuracy} num={stats.getStat(StatType.Accuracy)} />
                <Stat stat={StatType.OffHandAccuracy} num={stats.getStat(StatType.OffHandAccuracy)} />
                {/* <Stat stat={StatType.MeleeAccuracy} num={stats.getStat(StatType.MeleeAccuracy)} />
            <Stat stat={StatType.RangedAccuracy} num={stats.getStat(StatType.RangedAccuracy} /> */}

                <Stat stat={StatType.Damage} num={stats.damage} />
                <Stat stat={StatType.DamagePercent} num={stats.getStat(StatType.DamagePercent)} />

                {/* <Stat stat={StatType.SpellAccuracy} num={stats.getStat(StatType.SpellAccuracy)} /> */}
                <Stat stat={StatType.SpellPower} num={stats.spellPower} />

                <Stat stat={StatType.CriticalChance} num={stats.critChance} />
                <Stat stat={StatType.CriticalDamage} num={stats.critDamage} />

                <Stat stat={StatType.ArmourPenetration} num={stats.getStat(StatType.ArmourPenetration)} />
                {/* <Stat stat={StatType.DodgeReduction} num={stats.getStat(StatType.DodgeReduction)} /> */}
            </div>

            <div className={COL_WIDTH}>
                <h4 className={H4_CLASSES}>Mana</h4>
                <Stat stat={StatType.ManaCost} num={stats.getStat(StatType.ManaCost)} />
                <Stat stat={StatType.StartingMana} num={stats.getStat(StatType.StartingMana)} />
                <Stat stat={StatType.ManaRegen} num={stats.getStat(StatType.ManaRegen)} />
                <Stat stat={StatType.ManaOnHit} num={stats.manaOnHit} />
            </div>

            <div className={COL_WIDTH}>
                <h4 className={H4_CLASSES}>Other</h4>
                <Stat stat={StatType.Initiative} num={stats.getStat(StatType.Initiative)} />

                <Stat stat={StatType.PotionCharges} num={stats.getStat(StatType.PotionCharges)} />
                <Stat stat={StatType.PotionHealing} num={stats.getStat(StatType.PotionHealing)} />
                <Stat stat={StatType.PotionEffectiveness} num={stats.getStat(StatType.PotionEffectiveness)} />
            </div>
        </div>
    );
}