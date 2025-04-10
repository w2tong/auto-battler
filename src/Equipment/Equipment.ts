import { Amulet, amulets } from './Amulet';
import { Armour, ArmourId, armour } from './Armour';
import { Belt, BeltId, belts } from './Belt';
import { Hands, HandsId, hands } from './Hands';
import { Head, HeadId, heads } from './Head';
import { ItemType } from './Item';
import { Potion, PotionId, potions } from './Potion';
import { Ring, RingId, rings } from './Ring';
import { Shield, ShieldId, shields } from './Shield';
import { Weapon, WeaponId, WeaponTypeProperties, weapons } from './Weapon';

type Equip = Weapon | Shield | Armour | Head | Hands | Ring | Potion | Belt | Amulet;
const equips: { [key: string]: Equip } = { ...weapons, ...shields, ...armour, ...heads, ...hands, ...rings, ...potions, ...belts, ...amulets } as const;

type Equipment = {
    mainHand?: Weapon;
    offHandWeapon?: Weapon;
    offHandShield?: Shield;
    armour?: Armour;
    head?: Head;
    hands?: Hands;
    ring1?: Ring;
    ring2?: Ring;
    potion?: Potion;
    belt?: Belt;
    amulet?: Amulet;
}

type EquipmentItemIds = {
    mainHand: string | null
    offHand: string | null
    head: string | null
    amulet: string | null
    armour: string | null
    hands: string | null
    belt: string | null
    ring1: string | null
    ring2: string | null
    potion: string | null
}

enum EquipSlot {
    MainHand = 'Main Hand',
    OffHand = 'Off Hand',
    Head = 'Head',
    Armour = 'Armour',
    Hands = 'Hands',
    Belt = 'Belt',
    Ring1 = 'Ring 1',
    Ring2 = 'Ring 2',
    Potion = 'Potion',
    Amulet = 'Amulet'
}

function isValidEquip(itemId: string, slot: EquipSlot): boolean {
    const item = equips[itemId];
    if (!item) return false;

    if (slot === EquipSlot.MainHand) {
        return item.itemType === ItemType.Weapon;
    }
    else if (slot === EquipSlot.OffHand) {
        if (item.itemType === ItemType.Weapon) {
            const { twoHanded, light } = WeaponTypeProperties[item.type];
            return twoHanded === false && light === true;
        }
        return item.itemType === ItemType.Shield;
    }
    else if (slot === EquipSlot.Armour) {
        return item.itemType === ItemType.Armour;
    }
    else if (slot === EquipSlot.Head) {
        return item.itemType === ItemType.Head;
    }
    else if (slot === EquipSlot.Hands) {
        return item.itemType === ItemType.Hands;
    }
    else if (slot === EquipSlot.Ring1 || slot === EquipSlot.Ring2) {
        return item.itemType === ItemType.Ring;
    }
    else if (slot === EquipSlot.Potion) {
        return item.itemType === ItemType.Potion;
    }
    else if (slot === EquipSlot.Belt) {
        return item.itemType === ItemType.Belt;
    }
    else if (slot === EquipSlot.Amulet) {
        return item.itemType === ItemType.Amulet;
    }
    else return false;
}

function createEquipment(equipmentItemIds: EquipmentItemIds): Equipment {
    const equipment: Equipment = {};
    // Main Hand
    if (equipmentItemIds.mainHand && equipmentItemIds.mainHand in weapons) {
        equipment.mainHand = weapons[equipmentItemIds.mainHand as WeaponId];
    }
    // Off Hand
    if (equipmentItemIds.offHand) {
        if (equipmentItemIds.offHand in weapons) {
            equipment.offHandWeapon = weapons[equipmentItemIds.offHand as WeaponId];
        }
        else if (equipmentItemIds.offHand in shields) {
            equipment.offHandShield = shields[equipmentItemIds.offHand as ShieldId];
        }
    }
    // Armour
    if (equipmentItemIds.armour && equipmentItemIds.armour in armour) {
        equipment.armour = armour[equipmentItemIds.armour as ArmourId];
    }

    // Head
    if (equipmentItemIds.head && equipmentItemIds.head in heads) {
        equipment.head = heads[equipmentItemIds.head as HeadId];
    }

    // Hands
    if (equipmentItemIds.hands && equipmentItemIds.hands in hands) {
        equipment.hands = hands[equipmentItemIds.hands as HandsId];
    }

    // Rings
    if (equipmentItemIds.ring1 && equipmentItemIds.ring1 in rings) {
        equipment.ring1 = rings[equipmentItemIds.ring1 as RingId];
    }
    if (equipmentItemIds.ring2 && equipmentItemIds.ring2 in rings) {
        equipment.ring2 = rings[equipmentItemIds.ring2 as RingId];
    }

    if (equipmentItemIds.potion && equipmentItemIds.potion in potions) {
        equipment.potion = potions[equipmentItemIds.potion as PotionId];
    }

    if (equipmentItemIds.belt && equipmentItemIds.belt in belts) {
        equipment.belt = belts[equipmentItemIds.belt as BeltId];
    }

    return equipment;
}

export { Equip, EquipmentItemIds, equips, Equipment, EquipSlot, isValidEquip, createEquipment };