import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";

export type BuffBar = Partial<Record<BuffId, number>>;
export type DebuffBar = Partial<Record<DebuffId, number>>;