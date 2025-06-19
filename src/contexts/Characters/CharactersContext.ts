import { ClassName, EquipSlot, AttributeType, NeckId, ArmourId, HandsId, HeadId, PotionId, RingId, ShieldId, WaistId, WeaponId, AbilityId } from "@wholesome-sisters/auto-battler";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { LocalStorageCharacter, LocalStorageCharacters } from "../../types/LocalStorage";

export type ActionUpdateEquipment = {
    [EquipSlot.Armour]?: ArmourId | null;
    [EquipSlot.Hands]?: HandsId | null;
    [EquipSlot.Head]?: HeadId | null;
    [EquipSlot.MainHand]?: WeaponId | null;
    [EquipSlot.Neck]?: NeckId | null;
    [EquipSlot.OffHand]?: WeaponId | ShieldId | null;
    [EquipSlot.Potion]?: PotionId | null;
    [EquipSlot.Ring1]?: RingId | null;
    [EquipSlot.Ring2]?: RingId | null;
    [EquipSlot.Waist]?: WaistId | null;
};

export type Action =
    { type: 'create', name: string, class: ClassName; } |
    { type: 'update', index: number, name?: string, level?: number, exp?: number, equipment?: ActionUpdateEquipment, attributes?: { [key in AttributeType]?: number }, ability?: AbilityId; } |
    { type: 'swapEquipment'; index: number, slot1: EquipSlot, slot2: EquipSlot; } |
    { type: 'delete', index: number; } |
    { type: 'select', index: number; } |
    { type: 'importAccount', characters: LocalStorageCharacter[]; } |
    { type: 'importCharacter', character: LocalStorageCharacter; };

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