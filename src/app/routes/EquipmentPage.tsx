import { abilities, Character, createEquipmentImport } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import EquipmentInventory from "@features/EquipmentInventory/EquipmentInventory";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToggle } from "usehooks-ts";

export default function EquipmentPage() {
    const { list, selected } = useCharacters();
    const selectedChar = list[selected];

    const [characterSheetOpen, toggle] = useToggle(false);

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
        <>
            <h1>Character Page</h1>
            <div className='flex flex-col space-y-4'>
                <EquipmentInventory />
                <Collapsible open={characterSheetOpen} onOpenChange={toggle}>
                    {/* TODO: replace with caret SVG */}
                    <CollapsibleTrigger><h2>Character Sheet {characterSheetOpen ? 'v' : '^'}</h2></CollapsibleTrigger>
                    <CollapsibleContent>
                        <CharacterSheet char={char} exp={selectedChar.exp} />
                    </CollapsibleContent>
                </Collapsible>

            </div>

        </>
    );
}