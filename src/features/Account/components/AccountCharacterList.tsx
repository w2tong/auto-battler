import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { classTextColor } from "@/utils/classColour";
import DeleteCharacterDialog from "./DeleteCharacterDialog";
import { toast } from "sonner";
import ImportDialog from "./ImportDialog";
import { validateCharacter } from "../utils/importValidator";
import { MAX_CHARACTERS } from "@/utils/constants";
import CreateCharacterDialog from "./CreateCharacterDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export default function AccountCharacterList() {
    const characters = useCharacters();
    const dispatch = useCharactersDispatch();

    function handleImport(json: string) {
        try {
            const data = JSON.parse(json);
            const valid = validateCharacter(data);

            if (!valid && validateCharacter.errors && validateCharacter.errors.length > 0) {
                throw new Error(validateCharacter.errors[0].message);
            }
            else {
                if (characters.list.length >= MAX_CHARACTERS) throw new Error('You have reached the maximum number of characters allowed.');
                dispatch({ type: 'importCharacter', character: data });
                toast('Character import successful.');
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }

    function exportCharacter(index: number) {
        if (characters.list[index]) {
            navigator.clipboard.writeText(JSON.stringify(characters.list[index]));
            toast('Character Export copied to clipboard.');
        }
    }

    return (
        <div className='space-y-4 mx-auto'>
            {characters.list.length < MAX_CHARACTERS &&
                <div className='flex flex-col sm:flex-row space-y-1 sm:space-x-1'>
                    <ImportDialog title='Import Character' description='Paste your character export string below.' onImport={handleImport}>
                        <Button>Import Character</Button>
                    </ImportDialog>
                    <CreateCharacterDialog />
                </div>
            }

            <div>
                {characters.list.map((char, i) =>
                    <div className={cn('flex flex-col sm:flex-row space-x-2 px-2 py-2', i % 2 === 0 ? 'bg-secondary' : 'bg-background')} key={i}>
                        <span className={cn('inline-block text-lg font-bold flex-1 truncate', classTextColor[char.class])}>Lvl. {char.level} - {char.name}</span>
                        <div className='grid grid-cols-2 space-x-1'>
                            <DeleteCharacterDialog name={char.name} onDelete={() => dispatch({ type: 'delete', index: i })} />
                            <Button onClick={() => exportCharacter(i)}>Export</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}