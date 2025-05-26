import { ArmourId, HandsId, HeadId, PotionId, RingId, ShieldId, WaistId, WeaponId } from '@wholesome-sisters/auto-battler';

import robeArmourIconUrl from '../assets/icons/items/armour/robe.svg';
import leatherArmourIconUrl from '../assets/icons/items/armour/leather.svg';
import chainmailArmourIconUrl from '../assets/icons/items/armour/chainmail.svg';
import plateArmourIconUrl from '../assets/icons/items/armour/plate.svg';

import hoodIconUrl from '../assets/icons/items/heads/hood.svg';
import plateHelmentIconUrl from '../assets/icons/items/heads/plate-helmet.svg';

import roundShieldIconUrl from '../assets/icons/items/shields/round-shield.svg';
import spikedShieldIconUrl from '../assets/icons/items/shields/spiked-shield.svg';

import daggerIconUrl from '../assets/icons/items/weapons/dagger.svg';
import maceIconUrl from '../assets/icons/items/weapons/mace.svg';
import Icon from '../types/Icon';


// This type will be a union of all the literal 'name' values in equips
// TODO: add NeckId when implemented
type ItemId = WeaponId | ArmourId | HandsId | HeadId | PotionId | RingId | ShieldId | WaistId;

const robeIcon: Icon = { src: robeArmourIconUrl, alt: 'Robe icon' };
const leatherArmourIcon: Icon = { src: leatherArmourIconUrl, alt: 'Leather Armour icon' };
const chainmailArmourIcon: Icon = { src: chainmailArmourIconUrl, alt: 'Chainmail Armour icon' };
const plateArmourIcon: Icon = { src: plateArmourIconUrl, alt: 'Plate Armour icon' };
const hoodIcon: Icon = { src: hoodIconUrl, alt: 'Cloth Hood icon' };
const plateHelmetIcon: Icon = { src: plateHelmentIconUrl, alt: 'Plate Helmet icon' };
const roundShieldIcon: Icon = { src: roundShieldIconUrl, alt: 'Round Shield icon' };
const spikedShieldIcon: Icon = { src: spikedShieldIconUrl, alt: 'Spiked Shield icon' };
const daggerIcon: Icon = { src: daggerIconUrl, alt: 'Dagger icon' };
const maceIcon: Icon = { src: maceIconUrl, alt: 'Mace icon' };

const itemIconMap: Record<ItemId, Icon> = {
    // Armour
    robe0: robeIcon,
    robe1: robeIcon,
    robe2: robeIcon,
    robe3: robeIcon,
    robe4: robeIcon,
    robe5: robeIcon,
    leatherArmour0: leatherArmourIcon,
    leatherArmour1: leatherArmourIcon,
    leatherArmour2: leatherArmourIcon,
    leatherArmour3: leatherArmourIcon,
    leatherArmour4: leatherArmourIcon,
    leatherArmour5: leatherArmourIcon,
    mailArmour0: chainmailArmourIcon,
    mailArmour1: chainmailArmourIcon,
    mailArmour2: chainmailArmourIcon,
    mailArmour3: chainmailArmourIcon,
    mailArmour4: chainmailArmourIcon,
    mailArmour5: chainmailArmourIcon,
    plateArmour0: plateArmourIcon,
    plateArmour1: plateArmourIcon,
    plateArmour2: plateArmourIcon,
    plateArmour3: plateArmourIcon,
    plateArmour4: plateArmourIcon,
    plateArmour5: plateArmourIcon,

    // Heads
    clothHood0: hoodIcon,
    clothHood1: hoodIcon,
    clothHood2: hoodIcon,
    // helmet0: '',
    // helmet1: '',
    helmet2: plateHelmetIcon,

    // Shields
    buckler0: roundShieldIcon,
    buckler1: roundShieldIcon,
    buckler2: roundShieldIcon,
    buckler3: roundShieldIcon,
    buckler4: roundShieldIcon,
    buckler5: roundShieldIcon,
    spikedShield0: spikedShieldIcon,
    spikedShield1: spikedShieldIcon,
    spikedShield2: spikedShieldIcon,
    spikedShield3: spikedShieldIcon,
    spikedShield4: spikedShieldIcon,
    spikedShield5: spikedShieldIcon,

    // Weapons
    dagger0: daggerIcon,
    dagger1: daggerIcon,
    dagger2: daggerIcon,
    dagger3: daggerIcon,
    dagger4: daggerIcon,
    dagger5: daggerIcon,

    mace0: maceIcon,
};

export { type ItemId, itemIconMap };