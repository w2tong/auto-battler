import AccountImportExport from "@/features/Account/components/AccountImportExport";
import AccountCharacterList from "@/features/Account/components/AccountCharacterList";

export default function Account() {
    return (
        <div>
            <h1>Account</h1>
            <AccountImportExport />

            <h2>Characters</h2>
            <AccountCharacterList />
        </div>
    );
}   