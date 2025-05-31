import { equips } from '@wholesome-sisters/auto-battler';

import { tierBorderColor } from '../../../utils/tierColor';
import ItemTooltip from '../../../components/ItemTooltip';
import { memo } from 'react';
import { itemIconMap, ItemId } from '../../../utils/itemIcon';

function Item({ itemId, filtered, dragging }: { itemId: string, filtered: boolean, dragging: boolean; }) {
    const item = equips[itemId];
    const icon = itemIconMap[itemId as ItemId];

    // TODO: remove item.img when itemIconMap is filled out 
    return (
        <ItemTooltip item={item} display={!dragging}>
            <div className={`z-10 w-[64px] h-[64px] box-border border-solid rounded-xs bg-black ${tierBorderColor[item.tier]} ${filtered ? '' : 'border-2'}`}>
                <img src={icon ? icon.src : '/item-icons/placeholder.png'} alt={icon ? icon.alt : 'placholder icon'} className={filtered ? 'opacity-20' : 'opacity-100'} />
            </div>
        </ItemTooltip>
    );
}

export default memo(Item);