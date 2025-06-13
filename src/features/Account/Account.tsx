import AccountImportExport from "@/features/Account/components/AccountImportExport";
import AccountCharacterList from "@/features/Account/components/AccountCharacterList";

export default function Account() {
    return (
        <div className='px-4 mx-auto w-full sm:w-fit'>
            <h1 className='text-center sm:text-left'>Account</h1>
            <AccountImportExport />

            <h2 className='text-center sm:text-left'>Characters</h2>
            <AccountCharacterList />
        </div>
    );
}   