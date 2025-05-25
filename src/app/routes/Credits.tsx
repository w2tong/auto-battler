import fighterIconUrl from '../../assets/icons/classes/fighter.svg';
import priestIconUrl from '../../assets/icons/classes/priest.svg';
import rangerIconUrl from '../../assets/icons/classes/ranger.svg';
import rogueIconUrl from '../../assets/icons/classes/rogue.svg';
import wizardIconUrl from '../../assets/icons/classes/wizard.svg';

import bleedingIconUrl from '../../assets/icons/status-effects/bleeding.svg';
import blessedIconUrl from '../../assets/icons/status-effects/blessed.svg';
import burningIconUrl from '../../assets/icons/status-effects/burning.svg';
import invisibleIconUrl from '../../assets/icons/status-effects/invisible.svg';
import poisonedIconUrl from '../../assets/icons/status-effects/poisoned.svg';

type CreditProps = {
    src: string,
    alt: string,
    imgName: string,
    imgLink: string,
    artist: Artist,
    license: License,
};
function Credit({ src, alt, imgName, imgLink, artist, license }: CreditProps) {
    return (
        <div className='flex items-center'>
            <span><img className='h-4 inline' src={src} alt={alt} /><a className='font-bold text-tooltip-highlight' href={imgLink}>{imgName}</a> by <a className='font-bold text-tooltip-highlight' href={artist.link}> {artist.name}</a> under <a className='font-bold text-tooltip-highlight' href={license.link}>{license.name}</a>.</span>
        </div>
    );
}

type License = { name: string, link: string; };
const licenses: Record<string, License> = {
    CCBY30: {
        name: 'CC BY 3.0',
        link: 'https://creativecommons.org/licenses/by/3.0/'
    }
};

type Artist = { name: string, link: string; };
const artists: Record<string, Artist> = {
    Lorc: {
        name: 'Lorc',
        link: 'https://lorcblog.blogspot.com/'
    },
    Delapouite: {
        name: 'Delapouite',
        link: 'https://delapouite.com/'
    },
    CarlOlsen: {
        name: 'Carl Olsen',
        link: 'https://x.com/unstoppableCarl'
    }
};

const credits: CreditProps[] = [
    // Classes
    {
        src: fighterIconUrl,
        alt: 'Fighter icon',
        imgName: 'Crossed swords',
        imgLink: 'https://game-icons.net/1x1/lorc/crossed-swords.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: priestIconUrl,
        alt: 'Priest icon',
        imgName: 'Caduceus',
        imgLink: 'https://game-icons.net/1x1/delapouite/caduceus.html',
        artist: artists.Delapouite,
        license: licenses.CCBY30
    },
    {
        src: rangerIconUrl,
        alt: 'Ranger icon',
        imgName: 'High shot',
        imgLink: '',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: rogueIconUrl,
        alt: 'Rogue icon',
        imgName: 'Daggers',
        imgLink: 'https://game-icons.net/1x1/lorc/daggers.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: wizardIconUrl,
        alt: 'Wizard icon',
        imgName: 'Crystal wand',
        imgLink: 'https://game-icons.net/1x1/lorc/crystal-wand.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },

    // Status Effects
    {
        src: bleedingIconUrl,
        alt: 'Bleeding icon',
        imgName: 'Bleeding wound',
        imgLink: 'https://game-icons.net/1x1/lorc/bleeding-wound.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: blessedIconUrl,
        alt: 'Blessed icon',
        imgName: 'Embraced energy',
        imgLink: 'https://game-icons.net/1x1/lorc/embrassed-energy.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: burningIconUrl,
        alt: 'Burning icon',
        imgName: 'Flame',
        imgLink: 'https://game-icons.net/1x1/carl-olsen/flame.html',
        artist: artists.CarlOlsen,
        license: licenses.CCBY30
    },
    {
        src: invisibleIconUrl,
        alt: 'Invisible icon',
        imgName: 'Cloak and Dagger',
        imgLink: 'https://game-icons.net/1x1/lorc/cloak-dagger.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
    },
    {
        src: poisonedIconUrl,
        alt: 'Poisoned icon',
        imgName: 'Poison bottle icon',
        imgLink: 'https://game-icons.net/1x1/lorc/poison-bottle.html',
        artist: artists.Lorc,
        license: licenses.CCBY30
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
