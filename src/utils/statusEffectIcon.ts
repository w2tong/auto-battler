import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";
import Icon from "../types/Icon";

import blessedIconUrl from '../assets/icons/status-effects/blessed.svg';
import invisbleIconUrl from '../assets/icons/status-effects/invisible.svg';

import bleedingIconUrl from '../assets/icons/status-effects/bleeding.svg';
import burningIconUrl from '../assets/icons/status-effects/burning.svg';
import frozenIconUrl from '../assets/icons/status-effects/bleeding.svg';
import poisonedIconUrl from '../assets/icons/status-effects/poisoned.svg';

const buffIconMap: Record<BuffId, Icon> = {
    [BuffId.Blessed]: { src: blessedIconUrl, alt: 'Blessed icon' },
    [BuffId.Invisible]: { src: invisbleIconUrl, alt: 'Invisible icon' },
};
const debuffIconMap: Record<DebuffId, Icon> = {
    [DebuffId.Bleeding]: { src: bleedingIconUrl, alt: 'Bleeding icon' },
    [DebuffId.Burning]: { src: burningIconUrl, alt: 'Burning icon' },
    [DebuffId.Frozen]: { src: frozenIconUrl, alt: 'Frozen icon' },
    [DebuffId.Poisoned]: { src: poisonedIconUrl, alt: 'Poisoned icon' },
};

export { buffIconMap, debuffIconMap };