import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import infoIcon from '@assets/ui/info.svg';

export default function InfoTooltip({ content }: { content: ReactNode; }) {
    return (
        <Tooltip contentClassName='max-w-80' content={content}>
            <b className='text-tooltip-highlight'>
                <img src={infoIcon} alt="info" className="w-6 h-6 inline" />
            </b>
        </Tooltip>
    );
}