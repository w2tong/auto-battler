import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import InfoIcon from "@components/svgs/InfoIcon";

type InfoTooltip = { content: ReactNode, size: number; };
export default function InfoTooltip({ content, size }: InfoTooltip) {
    return (
        <Tooltip content={content}>
            <InfoIcon className='fill-foreground hover:fill-active-foreground' width={size} height={size} />
        </Tooltip>
    );
}