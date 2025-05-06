import { ReactNode, useEffect, useReducer, useState } from 'react';
import { LocalStorageCharacter } from '../../types/LocalStorage';
import { AttributeType, defaultEquipment, EquipSlot } from '@wholesome-sisters/auto-battler';
import { type Action, CharactersContext, CharactersDispatchContext, SelectedContext } from './CharactersContext';

export function CharactersProvider({ children }: { children: ReactNode; }) {
    const lsChars = localStorage.getItem('characters');
    const [characters, dispatch] = useReducer(charactersReducer, lsChars ? JSON.parse(lsChars) : []);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        localStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);

    useEffect(() => {
        localStorage.setItem('selected', selected.toString());
    }, [selected]);

    return (
        <CharactersContext.Provider value={characters}>
            <CharactersDispatchContext.Provider value={dispatch}>
                <SelectedContext.Provider value={{ selected, setSelected }}>
                    {children}
                </SelectedContext.Provider>
            </CharactersDispatchContext.Provider>
        </CharactersContext.Provider>
    );
}

function charactersReducer(characters: LocalStorageCharacter[], action: Action): LocalStorageCharacter[] {
    switch (action.type) {
        case 'create': {
            return [
                ...characters,
                {
                    name: action.name,
                    class: action.class,
                    level: 1,
                    exp: 0,
                    equipment: {
                        [EquipSlot.MainHand]: defaultEquipment[action.class][EquipSlot.MainHand]?.id ?? null,
                        [EquipSlot.OffHand]: defaultEquipment[action.class][EquipSlot.OffHand]?.id ?? null,
                        [EquipSlot.Head]: defaultEquipment[action.class][EquipSlot.Head]?.id ?? null,
                        [EquipSlot.Armour]: defaultEquipment[action.class][EquipSlot.Armour]?.id ?? null,
                        [EquipSlot.Hands]: defaultEquipment[action.class][EquipSlot.Hands]?.id ?? null,
                        [EquipSlot.Belt]: defaultEquipment[action.class][EquipSlot.Belt]?.id ?? null,
                        [EquipSlot.Ring1]: defaultEquipment[action.class][EquipSlot.Ring1]?.id ?? null,
                        [EquipSlot.Ring2]: defaultEquipment[action.class][EquipSlot.Ring2]?.id ?? null,
                        [EquipSlot.Potion]: defaultEquipment[action.class][EquipSlot.Potion]?.id ?? null,
                        [EquipSlot.Amulet]: defaultEquipment[action.class][EquipSlot.Amulet]?.id ?? null
                    },
                    attributes: {
                        [AttributeType.Strength]: 0,
                        [AttributeType.Dexterity]: 0,
                        [AttributeType.Perception]: 0,
                        [AttributeType.Constitution]: 0,
                        [AttributeType.Intelligence]: 0,
                        [AttributeType.Wisdom]: 0
                    }
                }
            ];
        };
        case 'update': {
            const c = characters[action.index];
            return [
                ...characters.slice(0, action.index),
                {
                    ...c,
                    name: action.name ?? c.name,
                    level: action.level ?? c.level,
                    exp: action.exp ?? c.exp,
                    equipment: {
                        ...c.equipment,
                        ...action.equipment
                    },
                    attributes: {
                        ...c.attributes,
                        ...action.attributes
                    }
                },
                ...characters.slice(action.index + 1)
            ];
        }
        case 'swapEquipment': {
            const equipment = Object.assign({}, characters[action.index].equipment);
            [equipment[action.slot1], equipment[action.slot2]] = [equipment[action.slot2], equipment[action.slot1]];

            return [
                ...characters.slice(0, action.index),
                Object.assign({}, characters[action.index], { equipment }),
                ...characters.slice(action.index + 1)
            ];
        }
        case 'delete': {
            return [...characters.slice(0, action.index), ...characters.slice(action.index + 1)];
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
};