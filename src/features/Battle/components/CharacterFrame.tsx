import ResourceBar, { Resource } from './ResourceBar';
import BuffBar from './BuffBar';
import { formatNum } from '../../../utils/stats';

export default function CharacterFrame({ name, level, className, currHealth, maxHealth, currMana, manaCost, buffs, debuffs, icon }: { name: string, level: number, className: string | null, currHealth: number, maxHealth: number, currMana: number, manaCost: number, buffs: string, debuffs: string, icon: { src: string, alt: string; }; }) {
    return (
        <div className='flex flex-row h-18'>
            <img className='h-full' src={icon.src} alt={icon.alt} />
            <div className='flex-1'>
                <div className='font-bold'>{name} - Lvl. {level} {className}</div>
                <ResourceBar resource={Resource.Health} curr={formatNum(currHealth)} max={formatNum(maxHealth)} />
                {manaCost > 0 && <ResourceBar resource={Resource.Mana} curr={formatNum(currMana)} max={formatNum(manaCost)} />}
                <BuffBar buffs={buffs} debuffs={debuffs} />
            </div>
        </div>
    );
}