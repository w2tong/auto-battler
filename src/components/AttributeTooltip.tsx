import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { Attributes, AttributeStatScaling, AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import { formatItemStat } from "@utils/stats";
import { Separator } from "@components/ui/separator";

export default function AttributeTooltip({ children, type, base, bonus, display = true }: { children: ReactNode, type: AttributeType, base: number, bonus: number, display?: boolean; }) {
    const content =
        <div className='whitespace-nowrap space-y-1'>
            <div className='font-bold'>{type}</div>
            <Separator />
            <div>
                <div><b>Base</b>: {base}</div>
                <div><b>Bonus</b>: {bonus}</div>
            </div>
            <Separator />
            <div>
                {Object.entries(AttributeStatScaling[type]).map(([stat, scaling], i) => {
                    const value = scaling * (base + bonus - Attributes.DEFAULT_VALUE);
                    const textColor = value > 0 ? 'text-positive' : value < 0 ? 'text-negative' : '';
                    const { key, val } = formatItemStat(stat as StatType, value);
                    return (<div className={textColor} key={i}>{`${val} ${key}`}</div>);
                })}
            </div>
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}