import { Character, createEquipmentImport, startingAbility } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import EquipmentInventory from "@features/EquipmentInventory/EquipmentInventory";

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
        ability: startingAbility[selectedChar.class]
    });

    return (
        <>
            <div className='flex flex-row'>
                <h1>Character Page</h1>
            </div>
            <div className='flex flex-col space-x-4'>
                <EquipmentInventory />
                <CharacterSheet char={char} exp={selectedChar.exp} />
            </div>

        </>
    );
}