import { ClassName } from '@wholesome-sisters/auto-battler';
import classIconMap from '@utils/classIconMap';
import { cn } from '@/utils/utils';

type ClassIconProps = {
    charClass: ClassName;
    className?: string;
    variant?: 'square' | 'circle';
};

export default function ClassIcon({ charClass, className, variant = 'square' }: ClassIconProps) {
    const classIcon = classIconMap[charClass];
    return (
        <img className={cn(
            variant === 'circle' && 'rounded-full',
            className
        )}
            src={classIcon.src}
            alt={classIcon.alt}
        />
    );
}