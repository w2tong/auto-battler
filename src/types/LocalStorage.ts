import { ArmourId, AttributeType, ClassName, EquipSlot, HandsId, HeadId, ItemId, NeckId, PetId, PotionId, RingId, ShieldId, WaistId, WeaponId } from "@wholesome-sisters/auto-battler";

type LocalStorageCharacter = {
    name: string;
    class: ClassName;
    level: number;
    exp: number;
    equipment: {
        [EquipSlot.Armour]: ArmourId | null;
        [EquipSlot.Hands]: HandsId | null;
        [EquipSlot.Head]: HeadId | null;
        [EquipSlot.MainHand]: WeaponId | null;
        [EquipSlot.Neck]: NeckId | null;
        [EquipSlot.OffHand]: WeaponId | ShieldId | null;
        [EquipSlot.Potion]: PotionId | null;
        [EquipSlot.Ring1]: RingId | null;
        [EquipSlot.Ring2]: RingId | null;
        [EquipSlot.Waist]: WaistId | null;
    };
    attributes: Record<AttributeType, number>;
    pet: PetId | null;
    talents: Record<string, number>;
};

type LocalStorageCharacters = {
    list: LocalStorageCharacter[];
    selected: number;
};
type LocalStorageInventory = (ItemId | null)[];

enum LocalStorageKey {
    BattleAutoStart = 'battle-auto-start',
    BattleSpeed = 'battle-speed',
    Characters = 'characters',
    Inventory = 'inventory',
}

export { LocalStorageKey };
export type { LocalStorageCharacter, LocalStorageCharacters, LocalStorageInventory };