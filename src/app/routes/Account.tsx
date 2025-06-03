import Button from "@components/Button";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import { useInventory } from "@contexts/Inventory/InventoryContext";
import { classTextColor } from "@/utils/classColour";
import { LocalStorageCharacter, LocalStorageInventory, LocalStorageKey } from "../../types/LocalStorage";
import { toast } from "sonner";

type ImportExport = {
    [LocalStorageKey.Characters]: LocalStorageCharacter[],
    [LocalStorageKey.Inventory]: LocalStorageInventory,
};

export default function Account() {
    const characters = useCharacters();
    const inventory = useInventory();

    function importAccount() {

    }

    function exportAccount() {
        const accountExport: ImportExport = {
            [LocalStorageKey.Characters]: characters.list,
            [LocalStorageKey.Inventory]: inventory,
        };
        navigator.clipboard.writeText(JSON.stringify(accountExport));
        toast('Export copied to clipboard.');
    }

    return (
        <div>
            <h1>Account</h1>
            <Button>Import Account</Button>
            <Button onClick={() => exportAccount()}>Export Account</Button>

            <h2>Characters</h2>
            <Button>Import Character</Button>
            <div>
                {characters.list.map((char, i) =>
                    <div key={i}>
                        <span className={classTextColor[char.class]}>{char.name}</span>
                        <Button>Delete</Button>
                        <Button>Export</Button>
                    </div>
                )}
            </div>
        </div>
    );
}   