import { StatType } from "@wholesome-sisters/auto-battler";

const statFormattingRules: { [stat in StatType]?: { key: string; format: (num: number) => string; } } = {
    [StatType.BlockChance]: { key: StatType.BlockChance, format: (num) => `${num}%` },
    [StatType.CriticalChance]: { key: StatType.CriticalChance, format: (num) => `${num}%` },
    [StatType.CriticalDamage]: { key: StatType.CriticalDamage, format: (num) => `${num * 100}%` },
    [StatType.DamagePercent]: { key: "Damage", format: (num) => `${num * 100}%` },
    [StatType.HealthPercent]: { key: "Health", format: (num) => `${(num * 100)}%` },
    [StatType.PotionEffectiveness]: { key: StatType.PotionEffectiveness, format: (num) => `${num * 100}%` },
    [StatType.SpellPowerPercent]: { key: "Spell Power", format: (num) => `${num * 100}%` },
};

function formatStat(stat: StatType, num: number): { key: string, val: string; } {
    const rule = statFormattingRules[stat];
    if (rule) return { key: rule.key, val: rule.format(num) };
    // Default formatting for unhandled stat types
    return { key: stat, val: num.toString() };
}

export { formatStat };