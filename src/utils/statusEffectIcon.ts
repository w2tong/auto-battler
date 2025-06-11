import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";
import Icon from "../types/Icon";

import blessedIconUrl from '@assets/icons/status-effects/blessed.svg';
import invisbleIconUrl from '@assets/icons/status-effects/invisible.svg';
import envenomWeaponIconUrl from '@assets/icons/status-effects/envenom-weapon.svg';
import shieldWallIconUrl from '@assets/icons/status-effects/shield-wall.svg';

import bleedingIconUrl from '@assets/icons/status-effects/bleeding.svg';
import burningIconUrl from '@assets/icons/status-effects/burning.svg';
import frozenIconUrl from '@assets/icons/status-effects/frozen.svg';
import poisonedIconUrl from '@assets/icons/status-effects/poisoned.svg';
import stunnedIconUrl from '@assets/icons/status-effects/stunned.svg';
import smoteIconUrl from '@assets/icons/status-effects/smote.svg';

const buffIconMap: Record<BuffId, Icon> = {
    [BuffId.Blessed]: { src: blessedIconUrl, alt: 'Blessed icon' },
    [BuffId.Invisible]: { src: invisbleIconUrl, alt: 'Invisible icon' },
    [BuffId.EnvenomWeapon]: { src: envenomWeaponIconUrl, alt: 'Envenom Weapon icon' },
    [BuffId.ShieldWall]: { src: shieldWallIconUrl, alt: 'Shield Wall icon' },
};
const debuffIconMap: Record<DebuffId, Icon> = {
    [DebuffId.Bleeding]: { src: bleedingIconUrl, alt: 'Bleeding icon' },
    [DebuffId.Burning]: { src: burningIconUrl, alt: 'Burning icon' },
    [DebuffId.Frozen]: { src: frozenIconUrl, alt: 'Frozen icon' },
    [DebuffId.Poisoned]: { src: poisonedIconUrl, alt: 'Poisoned icon' },
    [DebuffId.Stunned]: { src: stunnedIconUrl, alt: 'Stunned icon' },
    [DebuffId.Smote]: { src: smoteIconUrl, alt: 'Smote icon' },
};

export { buffIconMap, debuffIconMap };