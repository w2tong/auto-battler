import { ClassName } from '@wholesome-sisters/auto-battler';
import classIconMap from '../utils/classIconMap';

type ClassIconProps = {
    class: ClassName;
    width: number;
    height: number;
};

export default function ClassIcon(props: ClassIconProps) {
    const classIcon = classIconMap[props.class];
    return (
        <img src={classIcon.src} alt={classIcon.alt} width={props.width} height={props.height} />
    );
}