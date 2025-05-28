import { equips, HitType, LineType, LogLine } from "@wholesome-sisters/auto-battler";
import ItemTooltip from "../../../components/ItemTooltip";
import { tierTextColor } from "../../../utils/tierColor";
import { formatNum } from "../../../utils/stats";
import { cn } from "../../../utils/utils";

function lineToString(line: LogLine) {
    switch (line.type) {
        case (LineType.Text): {
            return line.text;
        }
        case (LineType.Loot): {
            const item = equips[line.itemId];
            return <><b>{line.name}</b> looted <ItemTooltip item={item}><span className={`inline-block font-bold ${tierTextColor[item.tier]}`}>[{item.name}]</span></ItemTooltip>.</>;
        }
        case (LineType.Exp): {
            return <><b>{line.name}</b> gained <b>{line.exp}</b> experience.</>;
        }
        case (LineType.LevelUp): {
            return <><b>{line.name}</b> leveled up to level <b>{line.level}</b>.</>;
        }
        case (LineType.Attack): {
            const attackName = line.abilityName ? `used ${line.abilityName} on` : 'attacked';
            const attack = <><b>{line.name}</b> {attackName} <b>{line.target}</b> and {line.hitType}</>;
            const damage = line.hitType === HitType.Miss ? null : <> for <b>{formatNum(line.damage)}</b> damage{line.sneak ? ' (Sneak Attack)' : ''}{line.blocked ? ' (Blocked)' : ''}</>;
            return <>{attack}{damage}.</>;
        }
        case (LineType.Damage): {
            return <><b>{line.name}</b> took <b>{formatNum(line.damage)}</b> damage from <b>{line.source}</b>.</>;
        }
        default: {
            return `Unknown line: ${line}`;
        }
    }
}

export default function CombatLog({ log, className }: { log: LogLine[], className: string; }) {
    return (
        <div className={cn('flex flex-col', className)}>
            <h2 className='grow-0'>Combat Log</h2>
            <div className='grow overflow-y-auto flex flex-col-reverse'>
                <div className='flex flex-col'>
                    {log.map((line, i) => {
                        return (
                            <div key={`logline-${i}`}>
                                {lineToString(line)}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}