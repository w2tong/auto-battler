import { ArmourId, HandsId, HeadId, ItemId, NeckId, PotionId, RingId, ShieldId, WaistId, WeaponId } from '@wholesome-sisters/auto-battler';
import Icon from '../types/Icon';

// Armour
import robeArmourIconUrl from '@assets/icons/items/armour/robe.svg';
import leatherArmourIconUrl from '@assets/icons/items/armour/leather.svg';
import chainmailArmourIconUrl from '@assets/icons/items/armour/chainmail.svg';
import plateArmourIconUrl from '@assets/icons/items/armour/plate.svg';

// Hands
import dualWieldGlovesIconUrl from '@assets/icons/items/hands/dual-wield-gloves.png';
import oneHandGlovesIconUrl from '@assets/icons/items/hands/one-hand-gloves.png';
import twoHandGlovesIconUrl from '@assets/icons/items/hands/two-hand-gloves.png';

// Head
import hoodIconUrl from '@assets/icons/items/heads/hood.svg';
import leatherHelmetIconUrl from '@assets/icons/items/heads/leather-helmet.png';
import mailCoifIconUrl from '@assets/icons/items/heads/mail-coif.png';
import plateHelmetIconUrl from '@assets/icons/items/heads/plate-helmet.svg';

// Neck
import blackNecklaceIconUrl from '@assets/icons/items/neck/black-necklace.svg';
import blueNecklaceIconUrl from '@assets/icons/items/neck/blue-necklace.svg';
import greenNecklaceIconUrl from '@assets/icons/items/neck/green-necklace.svg';
import orangeNecklaceIconUrl from '@assets/icons/items/neck/orange-necklace.svg';
import purpleNecklaceIconUrl from '@assets/icons/items/neck/purple-necklace.svg';
import redNecklaceIconUrl from '@assets/icons/items/neck/red-necklace.svg';

// Potion
import healingPotionIconUrl from '@assets/icons/items/potion/healing-potion.png';

// Ring
import blueRingIconUrl from '@assets/icons/items/ring/blue-ring.svg';
import greenRingIconUrl from '@assets/icons/items/ring/green-ring.svg';
import greyRingIconUrl from '@assets/icons/items/ring/grey-ring.svg';
import orangeRingIconUrl from '@assets/icons/items/ring/orange-ring.svg';
import purpleRingIconUrl from '@assets/icons/items/ring/purple-ring.svg';
import redRingIconUrl from '@assets/icons/items/ring/red-ring.svg';
import tealRingIconUrl from '@assets/icons/items/ring/teal-ring.svg';
import thornsRingIconUrl from '@assets/icons/items/ring/thorns-ring.svg';
import yellowRingIconUrl from '@assets/icons/items/ring/yellow-ring.svg';

// Shield
import roundShieldIconUrl from '@assets/icons/items/shields/round-shield.svg';
import spikedShieldIconUrl from '@assets/icons/items/shields/spiked-shield.svg';
import towerShieldIconUrl from '@assets/icons/items/shields/tower-shield.png';

// Waist
import greenPotBeltIconUrl from '@assets/icons/items/waist/green-pot-belt.png';
import multiRedPotBeltIconUrl from '@assets/icons/items/waist/multi-red-pot-belt.png';
import redPotBeltIconUrl from '@assets/icons/items/waist/red-pot-belt.png';

// Weapon
import biteIconUrl from '@assets/icons/items/weapons/bite.svg';
import daggerIconUrl from '@assets/icons/items/weapons/dagger.svg';
import fistIconUrl from '@assets/icons/items/weapons/fist.svg';
import greatswordIconUrl from '@assets/icons/items/weapons/greatsword.svg';
import longbowIconUrl from '@assets/icons/items/weapons/longbow.svg';
import longswordIconUrl from '@assets/icons/items/weapons/longsword.png';
import maceIconUrl from '@assets/icons/items/weapons/mace.svg';
import poisonBiteIconUrl from '@assets/icons/items/weapons/poison-bite.svg';
import quarterstaffIconUrl from '@assets/icons/items/weapons/quarterstaff.svg';
import wandIconUrl from '@assets/icons/items/weapons/wand.svg';

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

// Neck
const strengthNecklaceIcon: Icon = { src: redNecklaceIconUrl, alt: 'Strength Necklace icon' };
const dexterityNecklaceIcon: Icon = { src: greenNecklaceIconUrl, alt: 'Dexterity Necklace icon' };
const perceptionNecklaceIcon: Icon = { src: blackNecklaceIconUrl, alt: 'Perception Necklace icon' };
const constitutionNecklaceIcon: Icon = { src: orangeNecklaceIconUrl, alt: 'Constitution Necklace icon' };
const intelligenceNecklaceIcon: Icon = { src: blueNecklaceIconUrl, alt: 'Intelligence Necklace icon' };
const wisdomNecklaceIcon: Icon = { src: purpleNecklaceIconUrl, alt: 'Wisdom Necklace icon' };

// Potions
const healingPotionIcon: Icon = { src: healingPotionIconUrl, alt: 'Healing Potion icon' };

// Ring
// try to have these somewhat match necks
const accuracyRingIcon: Icon = { src: greyRingIconUrl, alt: 'Accuracy Ring icon' }; // black
const damageRingIcon: Icon = { src: redRingIconUrl, alt: 'Damage Ring icon' }; // red
const critChanceRingIcon: Icon = { src: yellowRingIconUrl, alt: 'Critical Chance Ring icon' };
const critDamageRingIcon: Icon = { src: orangeRingIconUrl, alt: 'Critical Damage Ring icon' };
const dodgeRingIcon: Icon = { src: greenRingIconUrl, alt: 'Dodge Ring icon' }; // green
const thornsRingIcon: Icon = { src: thornsRingIconUrl, alt: 'Thorns Ring icon' };
const mpHitRingIcon: Icon = { src: purpleRingIconUrl, alt: 'Mana Hit Ring icon' }; // purple
const mpRegenRingIcon: Icon = { src: blueRingIconUrl, alt: 'Mana Regen Ring icon' }; // blue
const mpCostRingIcon: Icon = { src: tealRingIconUrl, alt: 'Mana Cost Ring icon' }; // teal

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
const quarterstaffIcon: Icon = { src: quarterstaffIconUrl, alt: 'Quarterstaff icon' };
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

// Neck
const neckIconMap: Record<NeckId, Icon> = {
    strNeck0: strengthNecklaceIcon,
    strNeck1: strengthNecklaceIcon,
    strNeck2: strengthNecklaceIcon,
    dexNeck0: dexterityNecklaceIcon,
    dexNeck1: dexterityNecklaceIcon,
    dexNeck2: dexterityNecklaceIcon,
    perNeck0: perceptionNecklaceIcon,
    perNeck1: perceptionNecklaceIcon,
    perNeck2: perceptionNecklaceIcon,
    conNeck0: constitutionNecklaceIcon,
    conNeck1: constitutionNecklaceIcon,
    conNeck2: constitutionNecklaceIcon,
    intNeck0: intelligenceNecklaceIcon,
    intNeck1: intelligenceNecklaceIcon,
    intNeck2: intelligenceNecklaceIcon,
    wisNeck0: wisdomNecklaceIcon,
    wisNeck1: wisdomNecklaceIcon,
    wisNeck2: wisdomNecklaceIcon,
};

// Potion
const potionIconsMap: Record<PotionId, Icon> = {
    healingPotion0: healingPotionIcon,
    healingPotion1: healingPotionIcon,
    healingPotion2: healingPotionIcon,
    healingPotion3: healingPotionIcon,
    healingPotion4: healingPotionIcon,
};

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
    poisonbite2: poisonBiteIcon,
    poisonbite3: poisonBiteIcon,
    poisonbite4: poisonBiteIcon,
    poisonbite5: poisonBiteIcon,

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
    ...neckIconMap,
    ...potionIconsMap,
    ...shieldIconMap,
    ...ringIconMap,
    ...waistIconMap,
    ...weaponIconMap,
};

export { itemIconMap };