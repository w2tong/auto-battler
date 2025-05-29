import ResourceBar, { Resource } from './ResourceBar';
import StatusEffectBar from './StatusEffectBar';
import { formatNum } from '../../../utils/stats';
import { BuffBar, DebuffBar } from '../../../types/StatusEffectBar';
import { cn } from '../../../utils/utils';

export default function CharacterFrame({ name, level, className, currHealth, maxHealth, currMana, manaCost, buffs, debuffs, icon }: { name: string, level: number, className: string | null, currHealth: number, maxHealth: number, currMana: number, manaCost: number, buffs: BuffBar, debuffs: DebuffBar, icon: { src: string, alt: string; }; }) {
    const isDead = currHealth <= 0;

    return (
        <div>
            <div className='flex flex-row w-full h-18'>
                <div className='relative h-full'>
                    <img className='h-full' src={icon.src} alt={icon.alt} />
                    {isDead && (
                        <div className="absolute inset-0 bg-negative opacity-50 pointer-events-none" />
                    )}
                </div>
                <div className='flex-1 truncate'>
                    <div className={cn('font-bold truncate', isDead && 'text-negative')}>Lvl. {level} {className} - {name}</div>
                    <ResourceBar resource={Resource.Health} curr={formatNum(currHealth)} max={formatNum(maxHealth)} />
                    {manaCost > 0 && <ResourceBar resource={Resource.Mana} curr={formatNum(currMana)} max={formatNum(manaCost)} />}
                </div>
            </div>
            <StatusEffectBar buffs={buffs} debuffs={debuffs} />
        </div>
    );
}