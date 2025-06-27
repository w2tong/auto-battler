import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import infoIcon from '@assets/ui/info.svg';

type InfoTooltip = { content: ReactNode, size: number; };
export default function InfoTooltip({ content, size }: InfoTooltip) {
    return (
        <Tooltip contentClassName='max-w-80' content={content}>
            <b className='text-tooltip-highlight'>
                <img src={infoIcon} alt="info" width={size} height={size} />
            </b>
        </Tooltip>
    );
}