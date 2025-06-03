import { ReactNode } from 'react';
import { LocalStorageCharacters, LocalStorageKey } from '../../types/LocalStorage';
import { Attributes, AttributeType, ClassName, EquipSlot, PetId, startingEquipment } from '@wholesome-sisters/auto-battler';
import { type Action, CharactersContext, CharactersDispatchContext } from './CharactersContext';
import { useLocalStorage } from 'usehooks-ts';

export function CharactersProvider({ children }: { children: ReactNode; }) {
    const [characters, setCharacters] = useLocalStorage<LocalStorageCharacters>(LocalStorageKey.Characters, { list: [], selected: 0 });
    function dispatch(action: Action) {
        setCharacters(prev => charactersReducer(prev, action));
    }

    return (
        <CharactersContext.Provider value={characters}>
            <CharactersDispatchContext.Provider value={dispatch}>
                {children}
            </CharactersDispatchContext.Provider>
        </CharactersContext.Provider>
    );
}

function charactersReducer(characters: LocalStorageCharacters, action: Action): LocalStorageCharacters {
    const { list } = characters;
    switch (action.type) {
        case 'create': {
            return {
                ...characters,
                list: [
                    ...list,
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
                ],
                selected: list.length
            };
        };
        case 'update': {
            const c = list[action.index];

            return {
                ...characters,
                list: [
                    ...list.slice(0, action.index),
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
                    ...list.slice(action.index + 1)
                ]
            };
        }
        case 'swapEquipment': {
            const equipment = Object.assign({}, list[action.index].equipment);
            [equipment[action.slot1], equipment[action.slot2]] = [equipment[action.slot2], equipment[action.slot1]];

            return {
                ...characters,
                list: [
                    ...list.slice(0, action.index),
                    Object.assign({}, list[action.index], { equipment }),
                    ...list.slice(action.index + 1)
                ]
            };
        }
        case 'delete': {
            return {
                ...characters,
                list: [...list.slice(0, action.index), ...list.slice(action.index + 1)],
                selected: 0
            };
        }
        case 'select': {
            return {
                ...characters,
                selected: action.index
            };
        }
        case 'import': {
            return {
                list: action.characters,
                selected: 0
            };
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
};