import ResourceBar, { Resource } from './ResourceBar';
import BuffBar from './BuffBar';
import { formatNum } from '../../../utils/stats';

export default function CharacterFrame({ name, level, className, currHealth, maxHealth, currMana, manaCost, buffs, debuffs }: { name: string, level: number, className: string | null, currHealth: number, maxHealth: number, currMana: number, manaCost: number, buffs: string, debuffs: string; }) {
    return (
        <div>
            <div>{name}</div>
            <div>Lvl. {level} {className}</div>
            <ResourceBar resource={Resource.Health} curr={formatNum(currHealth)} max={formatNum(maxHealth)} />
            {manaCost > 0 ? <ResourceBar resource={Resource.Mana} curr={formatNum(currMana)} max={formatNum(manaCost)} /> : null}
            <BuffBar buffs={buffs} debuffs={debuffs} />
        </div>
    );
}