import Button from "@/components/Button";
import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { classTextColor } from "@/utils/classColour";
import DeleteCharacterDialog from "./DeleteCharacterDialog";
import { toast } from "sonner";
import ImportDialog from "./ImportDialog";
import { parseCharacter } from "../utils/importValidator";

export default function AccountCharacterList() {
    const characters = useCharacters();
    const dispatch = useCharactersDispatch();

    function handleImport(json: string) {
        const data = parseCharacter(json);
        if (data === undefined) {
            console.log(parseCharacter.message); // error message from the last parse call
            console.log(parseCharacter.position); // error position in string
        }
        else {
            dispatch({ type: 'importCharacter', character: data });
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
            <ImportDialog title='Import Character' description='Paste your character export string below.' onImport={handleImport}>
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