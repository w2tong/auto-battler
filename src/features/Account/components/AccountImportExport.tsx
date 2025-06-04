import Button from "@/components/Button";
import ImportDialog from "./ImportDialog";
import { LocalStorageCharacter, LocalStorageInventory, LocalStorageKey } from "@/types/LocalStorage";
import { toast } from "sonner";
import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { useInventory, useInventoryDispatch } from "@/contexts/Inventory/InventoryContext";
import { validateAccount } from "../utils/importValidator";

type ImportExport = {
    [LocalStorageKey.Characters]: LocalStorageCharacter[],
    [LocalStorageKey.Inventory]: LocalStorageInventory,
};

export default function AccountImportExport() {
    const characters = useCharacters();
    const charactersDispatch = useCharactersDispatch();
    const inventory = useInventory();
    const inventoryDispatch = useInventoryDispatch();

    function handleImport(json: string): string | void {
        try {
            const data = JSON.parse(json);
            const valid = validateAccount(data);

            if (!valid && validateAccount.errors && validateAccount.errors.length > 0) {
                throw new Error(validateAccount.errors[0].message);
            }
            else {
                charactersDispatch({ type: 'importAccount', characters: data[LocalStorageKey.Characters] });
                inventoryDispatch({ type: 'import', inventory: data[LocalStorageKey.Inventory] });
                toast('Account import successful.');
            }
        }
        catch (error) {
            throw new Error(`${error}`);
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
                <Button>Import Account</Button>
            </ImportDialog>
            <Button onClick={() => exportAccount()}>Export Account</Button>
        </>
    );
}