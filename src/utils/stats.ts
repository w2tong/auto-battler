import { StatType } from "@wholesome-sisters/auto-battler";

function format(num: number, { prefix = '', suffix = '', multiplier = 1 }: { prefix?: string; suffix?: string; multiplier?: number; } = {}): string {
    return `${prefix}${Number((num * multiplier).toFixed(1))}${suffix}`;
}

const statFormattingRules: { [stat in StatType]?: { key: string; format: (num: number) => string; } } = {
    [StatType.BlockChance]: { key: StatType.BlockChance, format: num => format(num, { suffix: '%' }) },
    [StatType.CriticalChance]: { key: StatType.CriticalChance, format: num => format(num, { suffix: '%' }) },
    [StatType.CriticalDamage]: { key: StatType.CriticalDamage, format: num => format(num, { suffix: '%', multiplier: 100 }) },
    [StatType.DamagePercent]: { key: "Damage", format: num => format(num, { suffix: '%', multiplier: 100 }) },
    [StatType.HealthPercent]: { key: "Health", format: num => format(num, { suffix: '%', multiplier: 100 }) },
    [StatType.PotionEffectiveness]: { key: StatType.PotionEffectiveness, format: num => format(num, { suffix: '%', multiplier: 100 }) },
    [StatType.SpellPowerPercent]: { key: "Spell Power", format: num => format(num, { suffix: '%', multiplier: 100 }) },
};

function formatStat(stat: StatType, num: number): { key: string, val: string; } {
    const rule = statFormattingRules[stat];
    if (rule) return { key: rule.key, val: rule.format(num) };
    // Default formatting for unhandled stat types
    return { key: stat, val: format(num) };
}

export { formatStat };