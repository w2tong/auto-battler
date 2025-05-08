import { StatType } from "@wholesome-sisters/auto-battler";
import { formatStat } from "../../../utils/stats";

export default function Stat({ stat, num }: { stat: StatType, num: number; }) {
    const { key, val } = formatStat(stat, num);
    return (
        <div className='w-full flex justify-between'>
            <span className='mr-4'>{key}</span> <span>{val}</span>
        </div>
    );
}