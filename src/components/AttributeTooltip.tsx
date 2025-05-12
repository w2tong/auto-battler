import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { Attributes, AttributeStatScaling, AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import { formatStat } from "../utils/stats";

export default function AttributeTooltip({ children, type, num, display = true }: { children: ReactNode, type: AttributeType, num: number, display?: boolean; }) {
    const content =
        <div className='whitespace-nowrap'>
            <div className='font-bold'>{type}</div>
            {Object.entries(AttributeStatScaling[type]).map(([stat, scaling]) => {
                const { key, val } = formatStat(stat as StatType, scaling * (num - Attributes.DEFAULT_VALUE));
                return (<div>{`${val} ${key}`}</div>);
            }
            )}
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}