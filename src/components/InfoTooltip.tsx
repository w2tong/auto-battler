import { ReactNode } from "react";
import Tooltip from "./Tooltip";

export default function InfoTooltip({ content }: { content: ReactNode; }) {
    return (
        <Tooltip contentClassName='max-w-60' content={content}>
            <b className='text-tooltip-highlight'>(?)</b>
        </Tooltip>
    );
}