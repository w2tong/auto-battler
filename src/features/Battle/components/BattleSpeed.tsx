import { Button } from "@/components/ui/button";
import { BATTLE_SPEEDS } from "@/utils/constants";
import { cn } from "@/utils/utils";

type BattleSpeedProps = {
    speed: number;
    onClick: (speed: number) => void;
};

export default function BattleSpeed({ speed, onClick }: BattleSpeedProps) {
    return (
        <div className='flex flex-row items-center'>
            <h2 className=''>Combat Speed: </h2>
            {Object.entries(BATTLE_SPEEDS).map(([key, val], i) =>
                <Button
                    key={key}
                    className={cn(
                        i === 0 ? 'rounded-l-md' : 'rounded-l-none',
                        i === Object.values(BATTLE_SPEEDS).length - 1 ? 'rounded-r-md' : 'rounded-r-none',
                        val === speed && 'bg-primary/50 text-secondary-foreground'
                    )}
                    onClick={() => onClick(val)}
                >
                    {key}
                </Button>
            )}
        </div>
    );
}