import { ClassName, EquipSlot, AttributeType } from "@wholesome-sisters/auto-battler";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { LocalStorageCharacters } from "../../types/LocalStorage";

export type ActionUpdateEquipment = { [key in EquipSlot]?: string | null };

export type Action =
    { type: 'create', name: string, class: ClassName; } |
    // TODO: make new types in LocalStorage and import them here for equipment and attributes
    { type: 'update', index: number, name?: string, level?: number, exp?: number, equipment?: ActionUpdateEquipment, attributes?: { [key in AttributeType]?: number }; } |
    { type: 'swapEquipment'; index: number, slot1: EquipSlot, slot2: EquipSlot; } |
    { type: 'delete', index: number; } |
    { type: 'select', index: number; };

export const CharactersContext = createContext<LocalStorageCharacters>({ list: [], selected: 0 });
export const CharactersDispatchContext = createContext<React.ActionDispatch<[action: Action]>>(() => { });
export const SelectedContext = createContext<{
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
}>({ selected: 0, setSelected: () => { } });

export function useCharacters() {
    return useContext(CharactersContext);
}
export function useCharactersDispatch() {
    return useContext(CharactersDispatchContext);
}