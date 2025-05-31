import { ArmourId, HandsId, HeadId, PotionId, RingId, ShieldId, WaistId, WeaponId } from '@wholesome-sisters/auto-battler';
import Icon from '../types/Icon';

// Armour
import robeArmourIconUrl from '../assets/icons/items/armour/robe.svg';
import leatherArmourIconUrl from '../assets/icons/items/armour/leather.svg';
import chainmailArmourIconUrl from '../assets/icons/items/armour/chainmail.svg';
import plateArmourIconUrl from '../assets/icons/items/armour/plate.svg';

// Hands
import dualWieldGlovesIconUrl from '../assets/icons/items/hands/dual-wield-gloves.png';
import oneHandGlovesIconUrl from '../assets/icons/items/hands/one-hand-gloves.png';
import twoHandGlovesIconUrl from '../assets/icons/items/hands/two-hand-gloves.png';

// Head
import hoodIconUrl from '../assets/icons/items/heads/hood.svg';
import leatherHelmetIconUrl from '../assets/icons/items/heads/leather-helmet.png';
import mailCoifIconUrl from '../assets/icons/items/heads/mail-coif.png';
import plateHelmetIconUrl from '../assets/icons/items/heads/plate-helmet.svg';

// Potion
import healingPotionIconUrl from '../assets/icons/items/potion/healing-potion.png';

// Ring
import blackRingIconUrl from '../assets/icons/items/ring/black-ring.png';
import blueRingIconUrl from '../assets/icons/items/ring/blue-ring.png';
import greyRingIconUrl from '../assets/icons/items/ring/grey-ring.png';
import orangeRingIconUrl from '../assets/icons/items/ring/orange-ring.png';
import purpleRingIconUrl from '../assets/icons/items/ring/purple-ring.png';
import redRingIconUrl from '../assets/icons/items/ring/red-ring.png';
import shieldRingIconUrl from '../assets/icons/items/ring/shield-ring.png';
import tealRingIconUrl from '../assets/icons/items/ring/teal-ring.png';
import thornsRingIconUrl from '../assets/icons/items/ring/thorns-ring.png';

// Shield
import roundShieldIconUrl from '../assets/icons/items/shields/round-shield.svg';
import spikedShieldIconUrl from '../assets/icons/items/shields/spiked-shield.svg';
import towerShieldIconUrl from '../assets/icons/items/shields/tower-shield.png';

// Waist
import greenPotBeltIconUrl from '../assets/icons/items/waist/green-pot-belt.png';
import multiRedPotBeltIconUrl from '../assets/icons/items/waist/multi-red-pot-belt.png';
import redPotBeltIconUrl from '../assets/icons/items/waist/red-pot-belt.png';

// Weapon
import biteIconUrl from '../assets/icons/items/weapons/bite.svg';
import daggerIconUrl from '../assets/icons/items/weapons/dagger.svg';
import fistIconUrl from '../assets/icons/items/weapons/fist.svg';
import greatswordIconUrl from '../assets/icons/items/weapons/greatsword.svg';
import longbowIconUrl from '../assets/icons/items/weapons/longbow.svg';
import longswordIconUrl from '../assets/icons/items/weapons/longsword.png';
import maceIconUrl from '../assets/icons/items/weapons/mace.svg';
import poisonBiteIconUrl from '../assets/icons/items/weapons/poison-bite.svg';
import quarterIconUrl from '../assets/icons/items/weapons/quarterstaff.png';
import wandIconUrl from '../assets/icons/items/weapons/wand.svg';

// This type will be a union of all the literal 'name' values in equips
// TODO: add NeckId when implemented
type ItemId = WeaponId | ArmourId | HandsId | HeadId | PotionId | RingId | ShieldId | WaistId;

// Armour
const robeIcon: Icon = { src: robeArmourIconUrl, alt: 'Robe icon' };
const leatherArmourIcon: Icon = { src: leatherArmourIconUrl, alt: 'Leather Armour icon' };
const chainmailArmourIcon: Icon = { src: chainmailArmourIconUrl, alt: 'Chainmail Armour icon' };
const plateArmourIcon: Icon = { src: plateArmourIconUrl, alt: 'Plate Armour icon' };

// Hands
const dualWieldGlovesIcon: Icon = { src: dualWieldGlovesIconUrl, alt: 'Dual-Wield Gloves icon' };
const oneHandGlovesIcon: Icon = { src: oneHandGlovesIconUrl, alt: 'One-hand Gloves icon' };
const twoHandGlovesIcon: Icon = { src: twoHandGlovesIconUrl, alt: 'Two-hand Gloves icon' };

// Head
const hoodIcon: Icon = { src: hoodIconUrl, alt: 'Cloth Hood icon' };
const leatherHelmetIcon: Icon = { src: leatherHelmetIconUrl, alt: 'Mail Coif icon' };
const mailCoifIcon: Icon = { src: mailCoifIconUrl, alt: 'Mail Coif icon' };
const plateHelmetIcon: Icon = { src: plateHelmetIconUrl, alt: 'Plate Helmet icon' };

// Potions
const healingPotionIcon: Icon = { src: healingPotionIconUrl, alt: 'Healing Potion icon' };

// Ring
const accuracyRingIcon: Icon = { src: redRingIconUrl, alt: 'Accuracy Ring icon' };
const damageRingIcon: Icon = { src: orangeRingIconUrl, alt: 'Damage Ring icon' };
const critChanceRingIcon: Icon = { src: blackRingIconUrl, alt: 'Critical Chance Ring icon' };
const critDamageRingIcon: Icon = { src: greyRingIconUrl, alt: 'Critical Damage icon' };
const dodgeRingIcon: Icon = { src: shieldRingIconUrl, alt: 'Dodge Ring icon' }; // TODO replace this icon
const thornsRingIcon: Icon = { src: thornsRingIconUrl, alt: 'Thorns Ring icon' };
const mpHitRingIcon: Icon = { src: purpleRingIconUrl, alt: 'Mana Hit icon' };
const mpRegenRingIcon: Icon = { src: blueRingIconUrl, alt: 'Mana Regen icon' };
const mpCostRingIcon: Icon = { src: tealRingIconUrl, alt: 'Mana Cost Ring icon' };

// Shield
const roundShieldIcon: Icon = { src: roundShieldIconUrl, alt: 'Round Shield icon' };
const spikedShieldIcon: Icon = { src: spikedShieldIconUrl, alt: 'Spiked Shield icon' };
const towerShieldIcon: Icon = { src: towerShieldIconUrl, alt: 'Tower Shield icon' };

// Waist
const greenPotBeltIcon: Icon = { src: greenPotBeltIconUrl, alt: 'Green Pot Belt icon' };
const multiRedPotBeltIcon: Icon = { src: multiRedPotBeltIconUrl, alt: 'Multi Red Pot Belt icon' };
const redPotBeltIcon: Icon = { src: redPotBeltIconUrl, alt: 'Red Pot Belt icon' };

// Weapons
const biteIcon: Icon = { src: biteIconUrl, alt: 'Bite icon' };
const daggerIcon: Icon = { src: daggerIconUrl, alt: 'Dagger icon' };
const fistIcon: Icon = { src: fistIconUrl, alt: 'Fist icon' };
const greatswordIcon: Icon = { src: greatswordIconUrl, alt: 'Greatsword icon' };
const longbowIcon: Icon = { src: longbowIconUrl, alt: 'Longbow icon' };
const longswordIcon: Icon = { src: longswordIconUrl, alt: 'Longsword icon' };
const maceIcon: Icon = { src: maceIconUrl, alt: 'Mace icon' };
const poisonBiteIcon: Icon = { src: poisonBiteIconUrl, alt: 'Poison bite icon' };
const quarterstaffIcon: Icon = { src: quarterIconUrl, alt: 'Quarterstaff icon' };
const wandIcon: Icon = { src: wandIconUrl, alt: 'Wand icon' };



// Maps
// Armour
const armourIconMap: Record<ArmourId, Icon> = {
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
};

// Hands
const handsIconMap: Record<HandsId, Icon> = {
    dwGloves0: dualWieldGlovesIcon,
    dwGloves1: dualWieldGlovesIcon,
    dwGloves2: dualWieldGlovesIcon,

    ohGloves0: oneHandGlovesIcon,
    ohGloves1: oneHandGlovesIcon,
    ohGloves2: oneHandGlovesIcon,

    thGloves0: twoHandGlovesIcon,
    thGloves1: twoHandGlovesIcon,
    thGloves2: twoHandGlovesIcon,
} as const;

// Head
const headIconsMap: Record<HeadId, Icon> = {
    clothHood0: hoodIcon,
    clothHood1: hoodIcon,
    clothHood2: hoodIcon,
    helmet0: leatherHelmetIcon,
    helmet1: mailCoifIcon,
    helmet2: plateHelmetIcon,
} as const;

// Ring
const ringIconMap: Record<RingId, Icon> = {
    accRing0: accuracyRingIcon,
    accRing1: accuracyRingIcon,
    accRing2: accuracyRingIcon,

    dmgRing0: damageRingIcon,
    dmgRing1: damageRingIcon,
    dmgRing2: damageRingIcon,

    critRing0: critChanceRingIcon,
    critRing1: critChanceRingIcon,
    critRing2: critChanceRingIcon,

    critDmgRing0: critDamageRingIcon,
    critDmgRing1: critDamageRingIcon,
    critDmgRing2: critDamageRingIcon,

    dodgeRing0: dodgeRingIcon,
    dodgeRing1: dodgeRingIcon,
    dodgeRing2: dodgeRingIcon,

    thornsRing0: thornsRingIcon,
    thornsRing1: thornsRingIcon,
    thornsRing2: thornsRingIcon,

    mpHitRing0: mpHitRingIcon,
    mpHitRing1: mpHitRingIcon,
    mpHitRing2: mpHitRingIcon,

    mpRegenRing0: mpRegenRingIcon,
    mpRegenRing1: mpRegenRingIcon,
    mpRegenRing2: mpRegenRingIcon,

    mpCostRing0: mpCostRingIcon,
    mpCostRing1: mpCostRingIcon,
    mpCostRing2: mpCostRingIcon,
};

// Potion
const potionIconsMap: Record<PotionId, Icon> = {
    healingPotion0: healingPotionIcon,
    healingPotion1: healingPotionIcon,
    healingPotion2: healingPotionIcon,
    healingPotion3: healingPotionIcon,
    healingPotion4: healingPotionIcon,
};

// Shield
const shieldIconMap: Record<ShieldId, Icon> = {
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

    towerShield0: towerShieldIcon,
    towerShield1: towerShieldIcon,
    towerShield2: towerShieldIcon,
    towerShield3: towerShieldIcon,
    towerShield4: towerShieldIcon,
    towerShield5: towerShieldIcon,
};

// Waist
const waistIconMap: Record<WaistId, Icon> = {
    effBelt0: greenPotBeltIcon,
    effBelt1: greenPotBeltIcon,
    effBelt2: greenPotBeltIcon,
    effBelt3: greenPotBeltIcon,

    healBelt0: redPotBeltIcon,
    healBelt1: redPotBeltIcon,
    healBelt2: redPotBeltIcon,
    healBelt3: redPotBeltIcon,

    chargesBelt0: multiRedPotBeltIcon,
    chargesBelt1: multiRedPotBeltIcon,
};

// Weapon
const weaponIconMap: Record<WeaponId, Icon> = {
    bite0: biteIcon,

    dagger0: daggerIcon,
    dagger1: daggerIcon,
    dagger2: daggerIcon,
    dagger3: daggerIcon,
    dagger4: daggerIcon,
    dagger5: daggerIcon,

    fist: fistIcon,

    greatsword0: greatswordIcon,
    greatsword1: greatswordIcon,
    greatsword2: greatswordIcon,
    greatsword3: greatswordIcon,
    greatsword4: greatswordIcon,
    greatsword5: greatswordIcon,

    // Longbows
    longbow0: longbowIcon,
    longbow1: longbowIcon,
    longbow2: longbowIcon,
    longbow3: longbowIcon,
    longbow4: longbowIcon,
    longbow5: longbowIcon,

    longsword0: longswordIcon,
    longsword1: longswordIcon,
    longsword2: longswordIcon,
    longsword3: longswordIcon,
    longsword4: longswordIcon,
    longsword5: longswordIcon,

    mace0: maceIcon,
    mace1: maceIcon,
    mace2: maceIcon,
    mace3: maceIcon,
    mace4: maceIcon,
    mace5: maceIcon,

    poisonbite0: poisonBiteIcon,
    poisonbite1: poisonBiteIcon,

    quarterstaff0: quarterstaffIcon,
    quarterstaff1: quarterstaffIcon,
    quarterstaff2: quarterstaffIcon,
    quarterstaff3: quarterstaffIcon,
    quarterstaff4: quarterstaffIcon,
    quarterstaff5: quarterstaffIcon,

    wand0: wandIcon,
    wand1: wandIcon,
    wand2: wandIcon,
    wand3: wandIcon,
    wand4: wandIcon,
    wand5: wandIcon,
} as const;

const itemIconMap: Record<ItemId, Icon> = {
    ...armourIconMap,
    ...handsIconMap,
    ...headIconsMap,
    ...potionIconsMap,
    ...shieldIconMap,
    ...ringIconMap,
    ...waistIconMap,
    ...weaponIconMap,
};

export { type ItemId, itemIconMap };