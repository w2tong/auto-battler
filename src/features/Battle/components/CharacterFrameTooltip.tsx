import { ReactNode } from "react";
import Tooltip from "../../../components/Tooltip";
import { AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import CharacterFrameStats from "../types/CharacterFrameStats";
import CharacterFrameAttributes from "../types/CharacterFrameAttributes";
import { formatNum } from "../../../utils/stats";

type CharacterFrameTooltipProps = { name: string, attr: CharacterFrameAttributes, stats: CharacterFrameStats, children: ReactNode; };
export default function CharacterFrameTooltip({ name, attr, stats, children }: CharacterFrameTooltipProps) {
    const content =
        <div>
            <b>{name}</b>
            <hr />
            <p className='flex flex-row space-x-2'>
                <span>{attr[AttributeType.Strength]} STR</span>
                <span>{attr[AttributeType.Dexterity]} DEX</span>
                <span>{attr[AttributeType.Constitution]} CON</span>
                <span>{attr[AttributeType.Perception]} PER</span>
                <span>{attr[AttributeType.Intelligence]} INT</span>
                <span>{attr[AttributeType.Wisdom]} WIS</span>
            </p>
            <hr />
            <p>{formatNum(stats[StatType.Accuracy])} {[StatType.Accuracy]}</p>
            <p>{formatNum(stats[StatType.Dodge])}% {[StatType.Dodge]}</p>
            <p>{formatNum(stats[StatType.Armour])} {[StatType.Armour]}</p>
            <p>{formatNum(stats[StatType.Deflection])} {[StatType.Deflection]}</p>
        </div>;

    return (
        <Tooltip className='w-full' content={content}>
            {children}
        </Tooltip>
    );
}