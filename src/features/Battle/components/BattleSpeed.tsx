import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BATTLE_SPEEDS } from "@/utils/constants";
import { cn } from "@/utils/utils";

type BattleSpeedProps = {
    speed: number;
    onChange: (speed: number) => void;
    className?: string;
};

export default function BattleSpeed({ speed, onChange, className }: BattleSpeedProps) {
    return (
        <div className={cn('flex flex-col sm:flex-row items-center', className)}>
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