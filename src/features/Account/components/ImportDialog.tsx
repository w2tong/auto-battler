import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog";
import { ReactNode } from "react";
import { useDebounceValue } from "usehooks-ts";

type ImportAlertDialog = { title: string, description: string, warning?: string, onImport: (str: string) => void, children: ReactNode; };
export default function ImportAlertDialog({ title, description, warning, onImport, children }: ImportAlertDialog) {
    const [importString, setImportString] = useDebounceValue('', 250);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea className='max-h-40' onChange={e => setImportString(e.target.value)} />
                {warning && <span><b className='text-negative'>WARNING</b>: {warning}</span>}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onImport(importString)}>Import</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}