import playIconUrl from '../assets/play.svg';
import pauseIconUrl from '../assets/pause.svg';
import { cn } from "@utils/utils";
import { Button } from '@/components/ui/button';

type PauseButtonProps = { paused: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement>, className?: string; };
export default function PauseButton({ paused, onClick, className }: PauseButtonProps) {
    return (
        <Button onClick={onClick} className={cn('p-2.5', className)}>
            {paused ?
                <img src={playIconUrl} alt='Play icon' /> :
                <img src={pauseIconUrl} alt='Pause icon' />
            }
        </Button>
    );
}

