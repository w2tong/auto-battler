import { equips } from '@wholesome-sisters/auto-battler';

import { tierBorderColor } from '../../../utils/tierColor';
import ItemTooltip from '../../../components/ItemTooltip';
import { memo } from 'react';

function Item({ itemId, filtered, dragging }: { itemId: string, filtered: boolean, dragging: boolean; }) {
    const item = equips[itemId];

    return (
        <ItemTooltip item={item} display={!dragging}>
            <div className={`z-10 w-[64px] h-[64px] box-border border-solid rounded-xs bg-black ${tierBorderColor[item.tier]} ${filtered ? '' : 'border-2'}`}>
                <img src={`/item-icons/${item.img ? item.img : 'placeholder.png'}`} className={filtered ? 'opacity-20' : 'opacity-100'} />
            </div>
        </ItemTooltip>
    );
}

export default memo(Item);