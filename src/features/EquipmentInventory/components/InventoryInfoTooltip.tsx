import InfoTooltip from "@/components/tooltip/InfoTooltip";
import { Separator } from "@radix-ui/react-separator";

const content =
    <div className='text-pretty'>
        <div className='font-bold'>Equipment</div>
        <Separator />
        <div className='whitespace-pre-wrap space-y-2'>
            <p>Items can be equipped by dragging and dropping items to <b>Equipment</b>.</p>
            <p>Items can be deleted by dragging and dropping items to <b>Trash</b>.</p>
            <p>Items can be filtered by their <b>Tier</b>, <b>Type</b>, or <b>Name</b>. Items can also be sorted by their <b>Tier</b>, <b>Type</b>, or <b>Name</b>.</p>
        </div>
    </div>;


export default function InventoryInfoTooltip() {
    return <InfoTooltip content={content} size={24} />;
}