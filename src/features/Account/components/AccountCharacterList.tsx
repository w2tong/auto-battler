import Button from "@/components/Button";
import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { classTextColor } from "@/utils/classColour";
import DeleteCharacterDialog from "./DeleteCharacterDialog";
import { toast } from "sonner";
import ImportDialog from "./ImportDialog";
import { validateCharacter } from "../utils/importValidator";
import { MAX_CHARACTERS } from "@/utils/constants";

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