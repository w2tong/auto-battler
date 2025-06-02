import { AttributeType, ClassName, EquipSlot, PetId } from "@wholesome-sisters/auto-battler";

type LocalStorageCharacter = {
    name: string;
    class: ClassName;
    level: number;
    exp: number;
    equipment: { [slot in EquipSlot]: string | null; };
    attributes: { [key in AttributeType]: number };
    pet: PetId | null;
    talents: Set<string>;
};

type LocalStorageBattleAutoStart = boolean;
type LocalStorageBattleSpeed = number;
type LocalStorageCharacters = {
    list: LocalStorageCharacter[];
    selected: number;
};
type LocalStorageInventory = (string | null)[];

enum LocalStorageKey {
    BattleAutoStart = 'battle-auto-start',
    BattleSpeed = 'battle-speed',
    Characters = 'characters',
    Inventory = 'inventory',
}

type LocalStorage = {
    [LocalStorageKey.BattleAutoStart]: LocalStorageBattleAutoStart,
    [LocalStorageKey.BattleSpeed]: LocalStorageBattleSpeed,
    [LocalStorageKey.Characters]: LocalStorageCharacters,
    [LocalStorageKey.Inventory]: LocalStorageInventory,
};

export { LocalStorageKey };
export type { LocalStorageCharacter, LocalStorageCharacters, LocalStorageInventory, LocalStorage };