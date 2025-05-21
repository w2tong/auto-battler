import { StatType } from "@wholesome-sisters/auto-battler";
import { formatStat, formatStatDescriptionVal } from "../../../utils/stats";
import StatTooltip from "../../../components/StatTooltip";

export default function Stat({ stat, num }: { stat: StatType, num: number; }) {
    const { key, val } = formatStat(stat, num);
    return (
        <div className='w-full flex justify-between'>
            <StatTooltip type={stat} num={formatStatDescriptionVal(stat, num)}>
                <span className='mr-4 text-tooltip-highlight font-medium'>{key}</span>
            </StatTooltip>
            <span>{val}</span>
        </div>
    );
}