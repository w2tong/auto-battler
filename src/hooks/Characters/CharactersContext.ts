import { ClassName, EquipSlot, AttributeType } from "@wholesome-sisters/auto-battler";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { LocalStorageCharacter } from "../../types/LocalStorage";

export type Action =
    { type: 'create', name: string, class: ClassName; } |
    // TODO: make new types in LocalStorage and import them here for equipment and attributes
    { type: 'update'; index: number, name?: string, level?: number, exp?: number, equipment?: { [key in EquipSlot]?: string }, attributes: { [key in AttributeType]?: number }; } |
    { type: 'delete', index: number; };

export const CharactersContext = createContext<LocalStorageCharacter[]>([]);
export const CharactersDispatchContext = createContext<React.ActionDispatch<[action: Action]> | null>(null);
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
export function useSelected() {
    return useContext(SelectedContext);
}
