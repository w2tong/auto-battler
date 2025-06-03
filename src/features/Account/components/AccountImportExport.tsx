import Button from "@/components/Button";
import ImportDialog from "./ImportDialog";
import { LocalStorageCharacter, LocalStorageInventory, LocalStorageKey } from "@/types/LocalStorage";
import { toast } from "sonner";
import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { useInventory } from "@/contexts/Inventory/InventoryContext";

type ImportExport = {
    [LocalStorageKey.Characters]: LocalStorageCharacter[],
    [LocalStorageKey.Inventory]: LocalStorageInventory,
};

export default function AccountImportExport() {
    const characters = useCharacters();
    const charactersDispatch = useCharactersDispatch();
    const inventory = useInventory();

    function importAccount(json: string) {
        const characters = JSON.parse(json) as LocalStorageCharacter[];
        charactersDispatch({ type: 'import', characters });
    }

    function handleImport(json: string) {
        console.log('handleImport called');
        if (validateImportString(json)) {
            // importAccount(json);
        }
    }

    function exportAccount() {
        const accountExport: ImportExport = {
            [LocalStorageKey.Characters]: characters.list,
            [LocalStorageKey.Inventory]: inventory,
        };
        navigator.clipboard.writeText(JSON.stringify(accountExport));
        toast('Account Export copied to clipboard.');
    }

    return (
        <>
            <ImportDialog title='Import Account' description='Paste your account export string below.' warning='This will overwrite your current account data.' onImport={handleImport}>
                <div>Import Account</div>
            </ImportDialog>
            <Button onClick={() => exportAccount()}>Export Account</Button>
        </>
    );
}

function validateImportString(json: string): boolean {
    // Check if the string is valid
    const valid = false;

    return valid;
}