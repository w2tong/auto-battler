import { NpcId } from "@wholesome-sisters/auto-battler";
import Icon from "../types/Icon";

import fighterIconUrl from '../assets/icons/classes/fighter.svg';
import rogueIconUrl from '../assets/icons/classes/rogue.svg';
import wizardIconUrl from '../assets/icons/classes/wizard.svg';

import goblinIconUrl from '../assets/icons/npcs/goblin.svg';
import orcIconUrl from '../assets/icons/npcs/orc.svg';
import ogreIconUrl from '../assets/icons/npcs/ogre.svg';
import ratIconUrl from '../assets/icons/npcs/rat.svg';
import zombieIconUrl from '../assets/icons/npcs/zombie.svg';

import wolfIconUrl from '../assets/icons/npcs/wolf.svg';

const goblinIcon: Icon = { src: goblinIconUrl, alt: 'Goblin icon' };

const npcIconMap: Record<NpcId, Icon> = {
    fighter: { src: fighterIconUrl, alt: 'Fighter icon' },
    rogue: { src: rogueIconUrl, alt: 'Rogue icon' },
    wizard: { src: wizardIconUrl, alt: 'Wizard icon' },

    goblinFighter: goblinIcon,
    goblinRogue: goblinIcon,
    orcFighter: { src: orcIconUrl, alt: 'Orc icon' },
    ogreFighter: { src: ogreIconUrl, alt: 'Ogre icon' },
    rat: { src: ratIconUrl, alt: 'Rat icon' },
    zombie: { src: zombieIconUrl, alt: 'Zombie icon' },

    wolf: { src: wolfIconUrl, alt: 'Wolf icon' },
};

export { npcIconMap };