import { Bleeding, Blessed, Buff, BuffId, Burning, Debuff, DebuffId, EnvenomWeapon, Invisible, Poisoned, ShieldWall, Smote, StatType } from "@wholesome-sisters/auto-battler";
import Icon from "../../../types/Icon";
import { buffIconMap, debuffIconMap } from "@utils/statusEffectIcon";
import { BuffBar, DebuffBar } from "../../../types/StatusEffectBar";
import Tooltip from "@components/tooltip/Tooltip";
import { cn } from "@utils/utils";
import { ReactNode } from "react";
import { formatNum } from "@utils/stats";

const buffDescriptions: Record<BuffId, (buff: Buff) => string> = {
    [BuffId.Blessed]: (buff: Buff) => {
        const blessed = buff as Blessed;
        const accuracy = formatNum(blessed.stats[StatType.Accuracy] ?? 0);
        const damage = formatNum(blessed.stats[StatType.Damage] ?? 0);
        return `Increases Accuracy by ${accuracy} and Damage by ${damage}.`;
    },
    [BuffId.EnvenomWeapon]: (buff: Buff) => {
        return `Your next ${buff.stacks} hits applies ${EnvenomWeapon.POISONED_STACKS} ${Poisoned.name}`;
    },
    [BuffId.Invisible]: (buff: Buff) => {
        const damage = formatNum(buff.stacks * Invisible.damage);
        return `Cannot be attacked while Invisible. Next attack deal +${damage} extra damage.`;
    },
    [BuffId.ShieldWall]: (buff: Buff) => {
        const shieldWall = buff as ShieldWall;
        const blockChance = formatNum(shieldWall.stats[StatType.BlockChance] ?? 0);
        const thorns = formatNum(shieldWall.stats[StatType.Thorns] ?? 0);
        return `Increases Block Chance by ${blockChance}% and Thorns by ${thorns}.`;
    }
};
const debuffDescriptions: Record<DebuffId, (debuff: Debuff) => string> = {
    [DebuffId.Bleeding]: (debuff: Debuff) => {
        const damage = formatNum((debuff as Bleeding).getDamageTaken());
        return `Deals ${damage} damage on end of turn.`;
    },
    [DebuffId.Burning]: (debuff: Debuff) => {
        const damage = formatNum((debuff as Burning).getDamageTaken());
        return `Deals ${damage} damage on end of turn.`;
    },
    [DebuffId.Frozen]: () => 'Skips turn.',
    [DebuffId.Poisoned]: (debuff: Debuff) => {
        const damage = formatNum((debuff as Poisoned).getDamageTaken());
        return `Deals ${damage} damage on end of turn.`;
    },
    [DebuffId.Smote]: (debuff: Debuff) => {
        const smote = debuff as Smote;
        const accuracy = formatNum(smote.stats[StatType.Accuracy] ?? 0);
        const damage = formatNum(smote.stats[StatType.Damage] ?? 0);
        return `Reduces Accuracy by ${-accuracy} and Damage by ${-damage}.`;
    },
    [DebuffId.Stunned]: () => 'Skips turn.',
};

// TODO: scale image/text based via media queries
type StatusEffectProps = { icon: Icon, stacks: number, positive: boolean, name: string, description: ReactNode, source: string; };
function StatusEffect({ icon, stacks, positive, name, description, source }: StatusEffectProps) {
    return (
        <div className='flex flex-row items-center h-8'>
            <Tooltip className={'max-w-60'} content={<>
                <b>{name}</b> ({stacks}) [{source}]
                <p>{description}</p>
            </>}>
                <img className={cn('border w-8', positive ? 'border-positive' : 'border-negative')} src={icon.src} alt={icon.alt} />
            </Tooltip>
            <span className='text-2xl'>({stacks})</span>
        </div >
    );
}

export default function StatusEffectBar({ buffs, debuffs }: { buffs: BuffBar, debuffs: DebuffBar; }) {



    return (
        <div className='h-16 flex flex-col'>
            <div className='flex flex-row'>
                {buffs.map(buff =>
                    <StatusEffect
                        key={buff.source.name + buff.id}
                        icon={buffIconMap[buff.id as BuffId]}
                        stacks={buff.stacks}
                        positive={true}
                        name={buff.id}
                        description={buffDescriptions[buff.id as BuffId](buff)}
                        source={buff.source.name}
                    />
                )}
            </div>
            <div className='flex flex-row'>
                {debuffs.map(debuff =>
                    <StatusEffect
                        key={debuff.source.name + debuff.id}
                        icon={debuffIconMap[debuff.id as DebuffId]}
                        stacks={debuff.stacks}
                        positive={false}
                        name={debuff.id}
                        description={debuffDescriptions[debuff.id as DebuffId](debuff)}
                        source={debuff.source.name}
                    />
                )}
            </div>
        </div>
    );
}