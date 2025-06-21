import { AbilityLine, AttackLine, DamageLine, DeathLine, equips, ExpLine, HitType, ItemId, LevelUpLine, LineType, LogLine, LootLine, NoTargetLine, PotionLine, ResultLine, TextLine, TurnLine } from "@wholesome-sisters/auto-battler";
import ItemTooltip from "@components/tooltip/ItemTooltip";
import { tierTextColor } from "@utils/tierColor";
import { formatNum } from "@utils/stats";
import { cn } from "@utils/utils";
import { Separator } from "@/components/ui/separator";

function TurnLineElement({ name }: { name: string; }) {
    return (
        <div className='flex flex-row w-full items-center py-1'>
            <Separator className='flex-1 border border-white' />
            <span className='whitespace-nowrap px-4'><b>{name}'s</b> turn.</span>
            <Separator className='flex-1 border border-white' />
        </div>
    );
}

const lineRenderers: Record<LineType, (line: LogLine) => React.ReactNode> = {
    [LineType.Text]: (line) => (line as TextLine).text,
    [LineType.Attack]: (line) => {
        const l = line as AttackLine;
        const attackName = l.abilityName ? `used ${l.abilityName} on` : 'attacked';
        const attack = <><b>{l.name}</b> {attackName} <b>{l.target}</b> and <b>{l.hitType}</b></>;
        const damage = l.hitType === HitType.Miss ? null : <> for <b>{formatNum(l.damage)}</b> damage{l.sneak ? ' (Sneak Attack) ' : ''}{l.blocked ? ' (Blocked)' : ''}</>;
        return <>{attack}{damage}.</>;
    },
    [LineType.Damage]: (line) => {
        const l = line as DamageLine;
        return <><b>{l.name}</b> took <b>{formatNum(l.damage)}</b> damage from <b>{l.source}</b>.</>;
    },
    [LineType.Death]: (line) => {
        const l = line as DeathLine;
        return <><b>{l.name}</b> died.</>;
    },
    [LineType.Turn]: (line) => {
        const l = line as TurnLine;
        return <TurnLineElement name={l.name} />;
    },
    [LineType.Ability]: (line) => {
        const l = line as AbilityLine;
        return <><b>{l.name}</b> used <b>{l.ability}</b>{l.target && ` on ${l.target}`}.</>;
    },
    [LineType.Potion]: (line) => {
        const l = line as PotionLine;
        return <><b>{l.name}</b> drank <b>{l.potion}</b> and healed for <b>{l.heal.toLocaleString()}</b>.</>;
    },
    [LineType.NoTarget]: (line) => {
        const l = line as NoTargetLine;
        return <><b>{l.name}</b> has no target.</>;
    },
    [LineType.Loot]: (line) => {
        const l = line as LootLine;
        const item = equips[l.itemId as ItemId];
        return <><b>{l.name}</b> looted <ItemTooltip item={item}><span className={`inline-block font-bold ${tierTextColor[item.tier]}`}>[{item.name}]</span></ItemTooltip>.</>;
    },
    [LineType.Exp]: (line) => {
        const l = line as ExpLine;
        return <><b>{l.name}</b> gained <b>{l.exp}</b> experience.</>;
    },
    [LineType.LevelUp]: (line) => {
        const l = line as LevelUpLine;
        return <><b>{l.name}</b> leveled up to level <b>{l.level}</b>.</>;
    },
    [LineType.Result]: (line) => {
        const l = line as ResultLine;
        return <b>{l.winner}{l.winner !== 'Tie' && ' wins'}!</b>;
    },
};

function lineToString(line: LogLine) {
    const renderer = lineRenderers[line.type as LineType];
    if (renderer) return renderer(line);
    return `Unknown line: ${line}`;
}

type CombatLogProps = { log: LogLine[], className?: string, ref?: React.Ref<HTMLDivElement>; };
export default function CombatLog({ log, className, ref }: CombatLogProps) {
    return (
        <div ref={ref} className={cn('flex flex-col gap-y-2', className)}>
            <h2 className='text-xl font-bold grow-0'>Combat Log</h2>
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