import InfoTooltip from "@/components/tooltip/InfoTooltip";
import { Separator } from "@radix-ui/react-separator";

const content =
    <div className='text-pretty'>
        <div className='font-bold'>Trash</div>
        <Separator />
        <div className='whitespace-pre-wrap space-y-2'>
            <p>Items can be deleted by dragging and dropping items from <b>Inventory</b> to <b>Trash</b>.</p>
            <p>An item currently in Trash will be deleted <b className='text-negative'>permanently</b> if replaced with another item.</p>
        </div>
    </div>;


export default function TrashInfoTooltip() {
    return <InfoTooltip content={content} size={24} />;
}