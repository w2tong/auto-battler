import { AttributeType, EquipSlot } from "@wholesome-sisters/auto-battler";

type LocalStorageCharacter = {
    name: string;
    level: number;
    exp: number;
    equipment: { [slot in EquipSlot]: string | null; };
    attributes: { [key in AttributeType]: number };
};
type LocalStorage = {
    characters: LocalStorageCharacter[];
    selectedCharacter: number;
    inventory: { [id: string]: { id: string, inUse: boolean; }; };
};

export default LocalStorage;
export type { LocalStorageCharacter };