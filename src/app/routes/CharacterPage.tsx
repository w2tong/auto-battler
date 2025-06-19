import { abilities, Character, createEquipmentImport } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";

export default function EquipmentPage() {
    const { list, selected } = useCharacters();
    const selectedChar = list[selected];

    let content = <p className='w-fit mx-auto sm:mx-0'>Select a character to use this page.</p>;
    if (selectedChar) {
        const char = new Character({
            name: selectedChar.name,
            level: selectedChar.level,
            className: selectedChar.class,
            attributes: selectedChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(selectedChar.equipment),
            ability: abilities[selectedChar.ability]
        });
        content = <CharacterSheet char={char} exp={selectedChar.exp} />;
    }

    return (
        <div className='px-6 py-4 mx-auto space-y-4'>
            <h1 className='text-3xl font-bold w-fit mx-auto sm:mx-0'>Character Sheet</h1>
            {content}
        </div>
    );
}