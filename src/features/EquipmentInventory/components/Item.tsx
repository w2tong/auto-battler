import { equips, ItemId } from '@wholesome-sisters/auto-battler';

import { tierBorderColor } from '@utils/tierColor';
import ItemTooltip from '@components/tooltip/ItemTooltip';
import { memo } from 'react';
import { itemIconMap } from '@utils/itemIcon';

function Item({ itemId, filtered, dragging }: { itemId: string, filtered: boolean, dragging: boolean; }) {
    const item = equips[itemId as ItemId];
    const icon = itemIconMap[itemId as ItemId];

    return (
        <ItemTooltip className='w-full h-full' item={item} display={!dragging}>
            <div className={`z-10 box-border border-solid rounded-xs bg-black ${tierBorderColor[item.tier]} ${filtered ? '' : 'border-2'}`}>
                <img src={icon ? icon.src : '/item-icons/placeholder.png'} alt={icon ? icon.alt : 'placholder icon'} className={filtered ? 'opacity-20' : 'opacity-100'} />
            </div>
        </ItemTooltip>
    );
}

export default memo(Item);