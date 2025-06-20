import AccountImportExport from "@/features/Account/components/AccountImportExport";
import AccountCharacterList from "@/features/Account/components/AccountCharacterList";
import { cn } from "@/utils/utils";

type AccountProps = { className?: string; };
export default function Account({ className }: AccountProps) {
    return (
        <div className={cn('mx-auto w-full sm:w-[640px] space-y-4', className)}>
            <h1 className='text-3xl font-bold text-center sm:text-left'>Account</h1>
            <AccountImportExport />

            <h2 className='text-2xl font-bold text-center sm:text-left'>Characters</h2>
            <AccountCharacterList />
        </div>
    );
}   