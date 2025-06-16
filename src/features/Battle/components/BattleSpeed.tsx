import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BATTLE_SPEEDS } from "@/utils/constants";

type BattleSpeedProps = {
    speed: number;
    onChange: (speed: number) => void;
};

export default function BattleSpeed({ speed, onChange }: BattleSpeedProps) {
    return (
        <div className='flex flex-row items-center flex-wrap'>
            <p className='text-xl font-bold'>Speed: </p>

            <Select value={speed.toString()} onValueChange={val => onChange(Number(val))}>
                <SelectTrigger className='w-[80px]'>
                    <SelectValue placeholder='Speed' />
                </SelectTrigger>
                <SelectContent className='w-[80px]'>
                    {Object.entries(BATTLE_SPEEDS).map(([key, val]) => (
                        <SelectItem key={key} value={val.toString()}>{key}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}