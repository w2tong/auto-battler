import { abilities, Character, createEquipmentImport } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "@features/CharacterSheet/CharacterSheet";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import EquipmentInventory from "@features/EquipmentInventory/EquipmentInventory";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EquipmentPage() {
    const { list, selected } = useCharacters();
    const selectedChar = list[selected];

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
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='justify-start items-center cursor-pointer gap-2'>
                            <h1 className='text-xl sm:text-2xl font-bold'>Character Sheet</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <CharacterSheet char={char} exp={selectedChar.exp} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </>
        );
    }

    return (
        <div className='flex flex-col gap-y-4 px-6 py-4'>
            {content}
        </div>
    );
}