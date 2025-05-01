import { ReactNode, useEffect, useReducer, useState } from 'react';
import { LocalStorageCharacter } from '../../types/LocalStorage';
import { AttributeType, EquipSlot } from '@wholesome-sisters/auto-battler';
import { type Action, CharactersContext, CharactersDispatchContext, SelectedContext } from './CharactersContext';

type CharactersState = LocalStorageCharacter[];

export function CharactersProvider({ children }: { children: ReactNode; }) {
    const lsChars = localStorage.getItem('characters');
    const initialChars = lsChars ? JSON.parse(lsChars) : {};
    const [characters, dispatch] = useReducer(charactersReducer, initialChars);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);

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

function charactersReducer(characters: CharactersState, action: Action): CharactersState {
    switch (action.type) {
        case 'create': {
            return [
                ...characters,
                {
                    name: action.name,
                    level: 1,
                    exp: 0,
                    equipment: {
                        [EquipSlot.MainHand]: null,
                        [EquipSlot.OffHand]: null,
                        [EquipSlot.Head]: null,
                        [EquipSlot.Armour]: null,
                        [EquipSlot.Hands]: null,
                        [EquipSlot.Belt]: null,
                        [EquipSlot.Ring1]: null,
                        [EquipSlot.Ring2]: null,
                        [EquipSlot.Potion]: null,
                        [EquipSlot.Amulet]: null
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
            return characters.map((c, i) =>
                i === action.index
                    ? {
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
                    }
                    : c
            );
        }
        case 'delete': {
            return [...characters.slice(0, action.index), ...characters.slice(action.index)];
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
};