import { abilities, Character, createEquipmentImport } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";

export default function EquipmentPage() {
    const { list, selected } = useCharacters();
    const selectedChar = list[selected];

    if (!selectedChar) {
        return (
            <>
                Select a character.
            </>
        );
    }

    const char = new Character({
        name: selectedChar.name,
        level: selectedChar.level,
        className: selectedChar.class,
        attributes: selectedChar.attributes,
        statTemplate: {},
        equipment: createEquipmentImport(selectedChar.equipment),
        ability: abilities[selectedChar.ability]
    });

    return (
        <div className='px-6 py-4 mx-auto'>
            <h1 className='w-fit mx-auto sm:mx-0'>Character Sheet</h1>
            <CharacterSheet char={char} exp={selectedChar.exp} />
        </div>
    );
}