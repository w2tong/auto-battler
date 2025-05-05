import { AttributeType, ClassName, EquipSlot } from "@wholesome-sisters/auto-battler";

type LocalStorageCharacter = {
    name: string;
    class: ClassName;
    level: number;
    exp: number;
    equipment: { [slot in EquipSlot]: string | null; };
    attributes: { [key in AttributeType]: number };
};
type LocalStorage = {
    characters: LocalStorageCharacter[];
    selected: number;
    inventory: string[];
};

export default LocalStorage;
export type { LocalStorageCharacter };