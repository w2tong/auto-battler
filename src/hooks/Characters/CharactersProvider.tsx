import { ReactNode, useEffect, useReducer, useState } from 'react';
import { LocalStorageCharacter } from '../../types/LocalStorage';
import { Attributes, AttributeType, ClassName, EquipSlot, PetId, startingEquipment } from '@wholesome-sisters/auto-battler';
import { type Action, CharactersContext, CharactersDispatchContext, SelectedContext } from './CharactersContext';

export function CharactersProvider({ children }: { children: ReactNode; }) {
    const lsChars = localStorage.getItem('characters');
    const [characters, dispatch] = useReducer(charactersReducer, lsChars ? JSON.parse(lsChars) : []);

    const lsSelected = localStorage.getItem('selected');
    const [selected, setSelected] = useState<number>(lsSelected ? Number(lsSelected) : 0);

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
                        [EquipSlot.MainHand]: startingEquipment[action.class][EquipSlot.MainHand]?.id ?? null,
                        [EquipSlot.OffHand]: startingEquipment[action.class][EquipSlot.OffHand]?.id ?? null,
                        [EquipSlot.Head]: startingEquipment[action.class][EquipSlot.Head]?.id ?? null,
                        [EquipSlot.Armour]: startingEquipment[action.class][EquipSlot.Armour]?.id ?? null,
                        [EquipSlot.Hands]: startingEquipment[action.class][EquipSlot.Hands]?.id ?? null,
                        [EquipSlot.Waist]: startingEquipment[action.class][EquipSlot.Waist]?.id ?? null,
                        [EquipSlot.Ring1]: startingEquipment[action.class][EquipSlot.Ring1]?.id ?? null,
                        [EquipSlot.Ring2]: startingEquipment[action.class][EquipSlot.Ring2]?.id ?? null,
                        [EquipSlot.Potion]: startingEquipment[action.class][EquipSlot.Potion]?.id ?? null,
                        [EquipSlot.Neck]: startingEquipment[action.class][EquipSlot.Neck]?.id ?? null
                    },
                    attributes: {
                        [AttributeType.Strength]: Attributes.DEFAULT_VALUE,
                        [AttributeType.Dexterity]: Attributes.DEFAULT_VALUE,
                        [AttributeType.Perception]: Attributes.DEFAULT_VALUE,
                        [AttributeType.Constitution]: Attributes.DEFAULT_VALUE,
                        [AttributeType.Intelligence]: Attributes.DEFAULT_VALUE,
                        [AttributeType.Wisdom]: Attributes.DEFAULT_VALUE
                    },
                    pet: action.class === ClassName.Ranger ? PetId.Wolf : null,
                    talents: new Set()
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