import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BATTLE_SPEEDS } from "@/utils/constants";
import { cn } from "@/utils/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

type BattleSpeedProps = {
    speed: number;
    onChange: (speed: number) => void;
    className?: string;
};

export default function BattleSpeed({ speed, onChange, className }: BattleSpeedProps) {
    return (
        <SelectGroup className={cn('flex flex-col sm:flex-row items-center gap-x-2', className)}>
            <SelectLabel className='text-lg font-bold'>Speed</SelectLabel>
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
        </SelectGroup>
    );
}