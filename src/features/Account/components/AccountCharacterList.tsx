import Button from "@/components/Button";
import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { classTextColor } from "@/utils/classColour";
import DeleteCharacterDialog from "./DeleteCharacterDialog";
import { toast } from "sonner";
import ImportDialog from "./ImportDialog";

export default function AccountCharacterList() {
    const characters = useCharacters();
    const dispatch = useCharactersDispatch();

    function importCharacter(json: string) {
        console.log('import character');
    }

    function handleImport(json: string) {
        console.log('handleImport called');
        if (validateImportString(json)) {
            // importCharacter(json);
        }
    }

    function exportCharacter(index: number) {
        if (characters.list[index]) {
            navigator.clipboard.writeText(JSON.stringify(characters.list[index]));
            toast('Character Export copied to clipboard.');
        }
    }

    return (
        <>
            <ImportDialog title='Import Character' description='Paste your character export string below.' onImport={importCharacter}>
                <Button>Import Character</Button>
            </ImportDialog>
            <div>
                {characters.list.map((char, i) =>
                    <div key={i}>
                        <span className={classTextColor[char.class]}>{char.name}</span>
                        <DeleteCharacterDialog name={char.name} onDelete={() => dispatch({ type: 'delete', index: i })} />
                        <Button onClick={() => exportCharacter(i)}>Export</Button>
                    </div>
                )}
            </div>

        </>
    );
}

function validateImportString(json: string): boolean {
    // Check if the string is valid
    const valid = false;

    return valid;
}