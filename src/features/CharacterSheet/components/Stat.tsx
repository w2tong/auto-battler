import { StatType } from "@wholesome-sisters/auto-battler";
import { formatCharacterSheetStat, formatStatDescriptionVal } from "../../../utils/stats";
import StatTooltip from "../../../components/StatTooltip";

export default function Stat({ stat, num }: { stat: StatType, num: number; }) {
    const { key, val } = formatCharacterSheetStat(stat, num);
    return (
        <div className='w-full flex justify-between'>
            <StatTooltip type={stat} num={formatStatDescriptionVal(stat, num)}>
                <span className='mr-4 text-tooltip-highlight font-medium whitespace-nowrap'>{key}</span>
            </StatTooltip>
            <span>{val}</span>
        </div>
    );
}