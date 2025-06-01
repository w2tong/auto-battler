import ResourceBar, { Resource } from './ResourceBar';
import StatusEffectBar from './StatusEffectBar';
import { formatNum } from '../../../utils/stats';
import { cn } from '../../../utils/utils';
import CharacterFrameTooltip from './CharacterFrameTooltip';
import BattleCharacter from '../types/BattleCharacter';
import classIconMap from '../../../utils/classIconMap';
import { npcIconMap } from '../../../utils/npcIcon';
import { classTextColor } from '../../../utils/classColour';

export default function CharacterFrame({ name, level, className, npcId, currHealth, maxHealth, currMana, manaCost, buffs, debuffs, attr, stats, mainHandDamage, offHandDamage, onHit, ability }: BattleCharacter) {
    const isDead = currHealth <= 0;
    const icon = npcId ? npcIconMap[npcId] : className ? classIconMap[className] : { src: '/item-icons/placeholder.png', alt: 'Placeholder icon' };
    const classColor = className ? classTextColor[className] : '';

    return (
        <div className='w-full'>
            <CharacterFrameTooltip
                name={name}
                attr={attr}
                stats={stats}
                mainHandDamage={mainHandDamage}
                offHandDamage={offHandDamage}
                onHit={onHit}
                ability={ability}
                classColor={classColor}
            >
                <div className='flex flex-row w-full h-18'>
                    <div className='relative h-full'>
                        <img className='h-full' src={icon.src} alt={icon.alt} />
                        {isDead && (
                            <div className="absolute inset-0 bg-negative opacity-50 pointer-events-none" />
                        )}
                    </div>
                    <div className='flex-1 truncate'>
                        <div className={cn('font-bold truncate', isDead && 'text-negative')}>
                            Lvl. {level} <span className={classColor}>{className}</span> - <span className={classColor}>{name}</span>
                        </div>
                        <ResourceBar resource={Resource.Health} curr={formatNum(currHealth)} max={formatNum(maxHealth)} />
                        {manaCost > 0 && <ResourceBar resource={Resource.Mana} curr={formatNum(currMana)} max={formatNum(manaCost)} />}
                    </div>
                </div>
            </CharacterFrameTooltip>
            <StatusEffectBar buffs={buffs} debuffs={debuffs} />
        </div>
    );
}