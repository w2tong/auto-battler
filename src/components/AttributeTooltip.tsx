import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { Attributes, AttributeStatScaling, AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import { formatItemStat } from "@utils/stats";

export default function AttributeTooltip({ children, type, num, display = true }: { children: ReactNode, type: AttributeType, num: number, display?: boolean; }) {
    const content =
        <div className='whitespace-nowrap'>
            <div className='font-bold'>{type}</div>
            {Object.entries(AttributeStatScaling[type]).map(([stat, scaling], i) => {
                const value = scaling * (num - Attributes.DEFAULT_VALUE);
                const textColor = value > 0 ? 'text-positive' : value < 0 ? 'text-negative' : '';
                const { key, val } = formatItemStat(stat as StatType, value);
                return (<div className={textColor} key={i}>{`${val} ${key}`}</div>);
            }
            )}
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}