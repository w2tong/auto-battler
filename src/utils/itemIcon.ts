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


// This type will be a union of all the literal 'name' values in equips
// TODO: add NeckId when implemented
type ItemId = WeaponId | ArmourId | HandsId | HeadId | PotionId | RingId | ShieldId | WaistId;

const itemIconMap: Record<ItemId, string> = {
    // Armour
    robe0: robeArmourIconUrl,
    robe1: robeArmourIconUrl,
    robe2: robeArmourIconUrl,
    robe3: robeArmourIconUrl,
    robe4: robeArmourIconUrl,
    robe5: robeArmourIconUrl,
    leatherArmour0: leatherArmourIconUrl,
    leatherArmour1: leatherArmourIconUrl,
    leatherArmour2: leatherArmourIconUrl,
    leatherArmour3: leatherArmourIconUrl,
    leatherArmour4: leatherArmourIconUrl,
    leatherArmour5: leatherArmourIconUrl,
    mailArmour0: chainmailArmourIconUrl,
    mailArmour1: chainmailArmourIconUrl,
    mailArmour2: chainmailArmourIconUrl,
    mailArmour3: chainmailArmourIconUrl,
    mailArmour4: chainmailArmourIconUrl,
    mailArmour5: chainmailArmourIconUrl,
    plateArmour0: plateArmourIconUrl,
    plateArmour1: plateArmourIconUrl,
    plateArmour2: plateArmourIconUrl,
    plateArmour3: plateArmourIconUrl,
    plateArmour4: plateArmourIconUrl,
    plateArmour5: plateArmourIconUrl,

    // Heads
    clothHood0: hoodIconUrl,
    clothHood1: hoodIconUrl,
    clothHood2: hoodIconUrl,
    // helmet0: '',
    // helmet1: '',
    helmet2: plateHelmentIconUrl,

    // Shields
    buckler0: roundShieldIconUrl,
    buckler1: roundShieldIconUrl,
    buckler2: roundShieldIconUrl,
    buckler3: roundShieldIconUrl,
    buckler4: roundShieldIconUrl,
    buckler5: roundShieldIconUrl,
    spikedShield0: spikedShieldIconUrl,
    spikedShield1: spikedShieldIconUrl,
    spikedShield2: spikedShieldIconUrl,
    spikedShield3: spikedShieldIconUrl,
    spikedShield4: spikedShieldIconUrl,
    spikedShield5: spikedShieldIconUrl,

    // Weapons
    dagger0: daggerIconUrl,
    dagger1: daggerIconUrl,
    dagger2: daggerIconUrl,
    dagger3: daggerIconUrl,
    dagger4: daggerIconUrl,
    dagger5: daggerIconUrl,

    mace0: maceIconUrl,
};

export { type ItemId, itemIconMap };