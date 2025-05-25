import { ClassName } from '@wholesome-sisters/auto-battler';
import fighterIconURL from '../assets/icons/classes/fighter.svg';
import rangerIconURL from '../assets/icons/classes/ranger.svg';
import rogueIconURL from '../assets/icons/classes/rogue.svg';
import priestIconURL from '../assets/icons/classes/priest.svg';
import wizardIconURL from '../assets/icons/classes/wizard.svg';

type ClassIconProps = {
    class: ClassName;
    width: number;
    height: number;
};

const ClassIcons: { [key in ClassName]: { src: string; alt: string; } } = {
    [ClassName.Fighter]: {
        src: fighterIconURL,
        alt: 'Fighter icon'
    },
    [ClassName.Ranger]: {
        src: rangerIconURL,
        alt: 'Ranger icon'
    },
    [ClassName.Rogue]: {
        src: rogueIconURL,
        alt: 'Rogue icon'
    },
    [ClassName.Priest]: {
        src: priestIconURL,
        alt: 'Priest icon'
    },
    [ClassName.Wizard]: {
        src: wizardIconURL,
        alt: 'Wizard icon'
    }
} as const;

export default function ClassIcon(props: ClassIconProps) {
    const classIcon = ClassIcons[props.class];
    return (
        <img src={classIcon.src} alt={classIcon.alt} width={props.width} height={props.height} />
    );
}