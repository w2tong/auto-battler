import { ReactNode } from "react";
import Tooltip from "./Tooltip";

export default function InfoTooltip({ content }: { content: ReactNode; }) {
    return (
        <Tooltip className='max-w-60' content={content}>
            <b>(?)</b>
        </Tooltip>
    );
}