import { ReactNode } from "react";
import Tooltip from "../../../components/Tooltip";
import { StatType } from "@wholesome-sisters/auto-battler";
import CharacterFrameStats from "../../../types/CharacterFrameStats";

type CharacterFrameTooltipProps = { name: string, stats: CharacterFrameStats, children: ReactNode; };
export default function CharacterFrameTooltip({ name, stats, children }: CharacterFrameTooltipProps) {
    const content =
        <div>
            <b>{name}</b>
            <p>{stats[StatType.Accuracy]} {[StatType.Accuracy]}</p>
            <p>{stats[StatType.Dodge]} {[StatType.Dodge]}</p>
            <p>{stats[StatType.Armour]} {[StatType.Armour]}</p>
        </div>;

    return (
        <Tooltip content={content}>
            {children}
        </Tooltip>
    );
}