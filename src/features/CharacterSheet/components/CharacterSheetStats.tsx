import { StatType } from "@wholesome-sisters/auto-battler";
import Stat from "./Stat";

export default function CharacterSheetStats({ stats }: { stats: { [stat in StatType]: number }; }) {
    return (
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
    );
}