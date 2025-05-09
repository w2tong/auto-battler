import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { StatDescriptions, StatType } from "@wholesome-sisters/auto-battler";

export default function StatTooltip({ children, type, val, display = true }: { children: ReactNode, type: StatType, val: number, display?: boolean; }) {
    const content =
        <div className='w-60'>
            {StatDescriptions[type](val)}
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}