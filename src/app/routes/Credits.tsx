import fighterIconUrl from '../../assets/icons/classes/fighter.svg';
import priestIconUrl from '../../assets/icons/classes/priest.svg';
import rangerIconUrl from '../../assets/icons/classes/ranger.svg';
import rogueIconUrl from '../../assets/icons/classes/rogue.svg';
import wizardIconUrl from '../../assets/icons/classes/wizard.svg';

import burningIconUrl from '../../assets/icons/statuseffects/burning.svg';

type CreditProps = {
    src: string,
    alt: string,
    name: string,
    href: string,
    artist: string;
};
function Credit({ src, alt, name, href, artist }: CreditProps) {
    return (
        <div className='flex items-center'>
            <span><img className='h-4 inline' src={src} alt={alt} />{name} by <a className='font-bold text-tooltip-highlight' href={href}> {artist}.</a></span>
        </div>
    );
}

const credits: CreditProps[] = [
    // Classes
    {
        src: fighterIconUrl,
        alt: 'Fighter icon',
        name: 'Crossed swords icon',
        href: 'https://lorcblog.blogspot.com/',
        artist: 'Lorc'
    },
    {
        src: priestIconUrl,
        alt: 'Priest icon',
        name: 'Caduceus icon',
        href: 'https://delapouite.com/',
        artist: 'Delapouite'
    },
    {
        src: rangerIconUrl,
        alt: 'Ranger icon',
        name: 'High shot icon',
        href: 'https://lorcblog.blogspot.com/',
        artist: 'Lorc'
    },
    {
        src: rogueIconUrl,
        alt: 'Rogue icon',
        name: 'Daggers icon',
        href: 'https://lorcblog.blogspot.com/',
        artist: 'Lorc'
    },
    {
        src: wizardIconUrl,
        alt: 'Wizard icon',
        name: 'Crystal wand icon',
        href: 'https://lorcblog.blogspot.com/',
        artist: 'Lorc'
    },

    // Status Effects
    {
        src: burningIconUrl,
        alt: 'Burning icon',
        name: 'Flame icon',
        href: 'https://x.com/unstoppableCarl',
        artist: 'Carl Olsen'
    }
];

export default function Credits() {
    return (
        <div>
            Credits
            {Object.values(credits).map(props => <Credit {...props} />)}
        </div>
    );
}
