import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { StatDescriptions, StatType } from "@wholesome-sisters/auto-battler";

export default function StatTooltip({ children, type, num, display = true }: { children: ReactNode, type: StatType, num: number, display?: boolean; }) {
    const content =
        <div className='w-60'>
            <div className='font-bold'>{type}</div>
            <div>{StatDescriptions[type](num)}</div>
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}