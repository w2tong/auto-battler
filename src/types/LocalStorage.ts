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

type LocalStorageCharacters = {
    list: LocalStorageCharacter[];
    selected: number;
};

type LocalStorageInventory = (string | null)[];

export type { LocalStorageCharacter, LocalStorageCharacters, LocalStorageInventory };