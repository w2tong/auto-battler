
import { TRASH_ID } from "@/utils/constants";
import ItemSlot from "./ItemSlot";
import TrashInfoTooltip from "./TrashInfoTooltip";

type TrashProps = { itemId: string | null; };
export default function Trash({ itemId }: TrashProps) {
    return (
        <div>
            <div className='flex flex-row items-center gap-1'>
                <h1 className='text-xl sm:text-2xl font-bold'>Trash</h1>
                <TrashInfoTooltip />
            </div>
            <ItemSlot
                id={TRASH_ID}
                itemId={itemId}
                slot={TRASH_ID}
            />
        </div>
    );
}