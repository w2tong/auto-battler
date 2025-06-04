import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

type ImportAlertDialog = { title: string, description: string, warning?: string, onImport: (str: string) => void, children: ReactNode; };
export default function ImportAlertDialog({ title, description, warning, onImport, children }: ImportAlertDialog) {
    const [importString, setImportString] = useDebounceValue('', 250);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleImport = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, str: string) => {
        try {
            onImport(str);
        } catch (error: unknown) {
            event.preventDefault(); // Prevent dialog from closing on error
            setErrorMessage(error instanceof Error ? error.message : String(error)); // Reset error state
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={() => setErrorMessage(null)}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                    {warning &&
                        <AlertDialogDescription>
                            <><b className='text-negative'>WARNING</b>: {warning}</>
                        </AlertDialogDescription>
                    }
                </AlertDialogHeader>
                <Textarea className='max-h-40' onChange={e => setImportString(e.target.value)} />
                {errorMessage &&
                    <div className='w-full text-wrap overflow-clip'>
                        <p className='text-negative font-bold'>Error</p>
                        <p className='text-wrap'>{errorMessage}</p>
                    </div>
                }
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={e => handleImport(e, importString)}>Import</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}