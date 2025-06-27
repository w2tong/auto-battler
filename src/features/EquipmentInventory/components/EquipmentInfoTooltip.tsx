import InfoTooltip from "@/components/tooltip/InfoTooltip";
import { Separator } from "@radix-ui/react-separator";

const content =
    <div className='text-pretty'>
        <div className='font-bold'>Equipment</div>
        <Separator />
        <div className='whitespace-pre-wrap space-y-3'>
            Items can be equipped or unequipped by dragging and dropping items between <b>Equipment</b> and <b>Inventory</b>.
        </div>
    </div>;


export default function EquipmentInfoTooltip() {
    return <InfoTooltip content={content} size={24} />;
}