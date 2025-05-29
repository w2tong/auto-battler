import { StatType } from "@wholesome-sisters/auto-battler";

function formatNum(num: number, multiplier = 1): number {
    return Number((num * multiplier).toFixed(1));
}

function format(num: number, { signed = false, percent = false, multiplier = 1 }: { signed?: boolean; percent?: boolean; multiplier?: number; } = {}): string {
    return `${signed && num > 0 ? '+' : ''}${formatNum(num, multiplier)}${percent ? '%' : ''}`;
}

function formatSigned(num: number, { percent = false, multiplier = 1 }: { percent?: boolean; multiplier?: number; } = {}): string {
    return format(num, { signed: true, percent, multiplier });
};

const characterSheetStatFormattingRules: { [stat in StatType]?: { key: string; format: (num: number) => string; } } = {
    [StatType.Accuracy]: {
        key: StatType.Accuracy,
        format: num => format(num, { signed: true })
    },
    [StatType.BlockChance]: {
        key: StatType.BlockChance,
        format: num => format(num, { percent: true })
    },
    [StatType.CriticalChance]: {
        key: StatType.CriticalChance,
        format: num => format(num, { percent: true })
    },
    [StatType.CriticalDamage]: {
        key: StatType.CriticalDamage,
        format: num => format(num, { percent: true, multiplier: 100 })
    },
    [StatType.Damage]: {
        key: "Damage",
        format: num => format(num, { signed: true })
    },
    [StatType.DamagePercent]: {
        key: "Damage",
        format: num => format(num, { signed: true, percent: true, multiplier: 100 })
    },
    [StatType.Dodge]: {
        key: StatType.Dodge,
        format: num => format(num, { percent: true })
    },
    [StatType.HealthPercent]: {
        key: "Max Health",
        format: num => format(num, { percent: true, multiplier: 100 })
    },
    [StatType.PotionCharges]: {
        key: StatType.PotionCharges,
        format: num => format(num, { signed: true })
    },
    [StatType.PotionEffectiveness]: {
        key: StatType.PotionEffectiveness,
        format: num => format(num, { signed: true, percent: true, multiplier: 100 })
    },
    [StatType.PotionHealing]: {
        key: StatType.PotionHealing,
        format: num => format(num, { signed: true })
    },
    [StatType.SpellPowerPercent]: {
        key: "Spell Power",
        format: num => format(num, { percent: true, multiplier: 100 })
    },
};

function formatCharacterSheetStat(stat: StatType, num: number): { key: string, val: string; } {
    const rule = characterSheetStatFormattingRules[stat];
    if (rule) return { key: rule.key, val: rule.format(num) };
    // Default formatting for unhandled stat types
    return { key: stat, val: format(num) };
}

const itemStatFormattingRules: { [stat in StatType]?: { key: string; format: (num: number) => string; } } = {
    [StatType.BlockChance]: {
        key: StatType.BlockChance,
        format: num => formatSigned(num, { percent: true })
    },
    [StatType.CriticalDamage]: {
        key: StatType.CriticalDamage,
        format: num => formatSigned(num, { percent: true, multiplier: 100 })
    },
    [StatType.DamagePercent]: {
        key: "Damage",
        format: num => formatSigned(num, { percent: true, multiplier: 100 })
    },
    [StatType.Dodge]: {
        key: StatType.Dodge,
        format: num => formatSigned(num, { percent: true })
    },
    [StatType.HealthPercent]: {
        key: "Max Health",
        format: num => formatSigned(num, { percent: true, multiplier: 100 })
    },
    [StatType.PotionEffectiveness]: {
        key: StatType.PotionEffectiveness,
        format: num => formatSigned(num, { percent: true, multiplier: 100 })
    },
    [StatType.SpellPowerPercent]: {
        key: "Spell Power",
        format: num => formatSigned(num, { percent: true, multiplier: 100 })
    },
};

function formatItemStat(stat: StatType, num: number): { key: string, val: string; } {
    const rule = itemStatFormattingRules[stat];
    if (rule) return { key: rule.key, val: rule.format(num) };
    // Default formatting for unhandled stat types
    return { key: stat, val: formatSigned(num) };
}

const descriptionFormattingRules: { [stat in StatType]?: (num: number) => number; } = {
    [StatType.CriticalDamage]: num => formatNum(num, 100),
    [StatType.DamagePercent]: num => formatNum(num, 100),
    [StatType.HealthPercent]: num => formatNum(num, 100),
    [StatType.PotionEffectiveness]: num => formatNum(num, 100),
    [StatType.SpellPowerPercent]: num => formatNum(num, 100),
};

function formatStatDescriptionVal(stat: StatType, num: number): number {
    const rule = descriptionFormattingRules[stat];
    if (rule) return rule(num);
    return formatNum(num);
};

export { formatNum, formatCharacterSheetStat, formatItemStat, formatStatDescriptionVal };