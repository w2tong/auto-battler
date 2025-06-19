import { abilities, Character, createEquipmentImport } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import EquipmentInventory from "@features/EquipmentInventory/EquipmentInventory";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToggle } from "usehooks-ts";

import caretDown from '@assets/ui/caret-down.svg';
import caretUp from '@assets/ui/caret-up.svg';

export default function EquipmentPage() {
    const { list, selected } = useCharacters();
    const selectedChar = list[selected];

    const [characterSheetOpen, toggle] = useToggle(false);

    let content = (<>
        <h1 className='text-3xl font-bold w-fit mx-auto sm:mx-0'>Equipment</h1>
        <p className='w-fit mx-auto sm:mx-0'>Select a character to use this page.</p>
    </>);
    if (selectedChar) {
        const char = new Character({
            name: selectedChar.name,
            level: selectedChar.level,
            className: selectedChar.class,
            attributes: selectedChar.attributes,
            statTemplate: {},
            equipment: createEquipmentImport(selectedChar.equipment),
            ability: abilities[selectedChar.ability],
            petId: selectedChar.pet ?? undefined
        });
        content = (
            <>
                <EquipmentInventory />
                <Collapsible open={characterSheetOpen} onOpenChange={toggle}>
                    {/* TODO: replace with caret SVG */}
                    <CollapsibleTrigger>
                        <h1 className='text-xl font-bold flex flex-row items-center gap-0.5 cursor-pointer'>
                            <span>Character Sheet</span><img className='mt-[2px] w-8 h-8' src={characterSheetOpen ? caretUp : caretDown} />
                        </h1>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CharacterSheet char={char} exp={selectedChar.exp} />
                    </CollapsibleContent>
                </Collapsible>
            </>
        );
    }

    return (
        <div className='flex flex-col gap-y-4 px-4 py-4'>
            {content}
        </div>
    );
}