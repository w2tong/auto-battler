import { ClassName } from "@wholesome-sisters/auto-battler";

const classTextColor: Record<ClassName, string> = {
    [ClassName.Fighter]: 'text-fighter',
    [ClassName.Priest]: 'text-priest',
    [ClassName.Ranger]: 'text-ranger',
    [ClassName.Rogue]: 'text-rogue',
    [ClassName.Wizard]: 'text-wizard',
} as const;

export { classTextColor };