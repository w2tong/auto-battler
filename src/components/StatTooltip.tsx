import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { StatDescriptions, StatType } from "@wholesome-sisters/auto-battler";
import { Separator } from "@components//ui/separator";

export default function StatTooltip({ children, type, num, display = true }: { children: ReactNode, type: StatType, num: number, display?: boolean; }) {
    const content =
        <div className='w-max max-w-60 text-pretty space-y-1'>
            <div className='font-bold'>{type}</div>
            <Separator />
            <p className='whitespace-pre-wrap'>{StatDescriptions[type](num)}</p>
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}