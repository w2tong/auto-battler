import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";
import Icon from "../../../types/Icon";
import { buffIconMap, debuffIconMap } from "../../../utils/statusEffectIcon";
import { BuffBar, DebuffBar } from "../../../types/StatusEffectBar";
import Tooltip from "../../../components/Tooltip";
import { cn } from "../../../utils/utils";
import { ReactNode } from "react";

const buffDescriptions: Record<BuffId, ReactNode> = {
    [BuffId.Blessed]: 'Increases Accuracy and Damage.',
    [BuffId.Invisible]: 'Cannot be attacked while Invisible. Next attack deal extra damage.',
};
const debuffDescriptions: Record<DebuffId, ReactNode> = {
    [DebuffId.Bleeding]: 'Deals damage based on the initial damage taken on end of turn.',
    [DebuffId.Burning]: 'Deals damage on end of turn.',
    [DebuffId.Frozen]: 'Prevents character from performing actions.',
    [DebuffId.Poisoned]: 'Deals damage based on the character\'s current health on end of turn.',
};

// TODO: scale image/text based via media queries
function StatusEffect({ icon, stacks, positive, name, description }: { icon: Icon, stacks: number, positive: boolean, name: string, description: ReactNode; }) {
    return (
        <div className='flex flex-row items-center h-8'>
            <Tooltip className={'max-w-60'} content={<>
                <b>{name}</b>
                <p>{description}</p>
            </>}>
                <img className={cn('border w-8', positive ? 'border-positive' : 'border-negative')} src={icon.src} alt={icon.alt} />
            </Tooltip>
            <span className='text-2xl'>({stacks})</span>
        </div >
    );
}

// TODO: have StatusEffectBar take a fixed amount of space to prevent layout shifting
export default function StatusEffectBar({ buffs, debuffs }: { buffs: BuffBar, debuffs: DebuffBar; }) {
    return (
        <div className='h-16'>
            {Object.entries(buffs).map(([buffId, stacks]) =>
                <StatusEffect
                    key={buffId}
                    icon={buffIconMap[buffId as BuffId]}
                    stacks={stacks}
                    positive={true}
                    name={buffId}
                    description={buffDescriptions[buffId as BuffId]}
                />
            )}
            {Object.entries(debuffs).map(([debuffId, stacks]) =>
                <StatusEffect
                    key={debuffId}
                    icon={debuffIconMap[debuffId as DebuffId]}
                    stacks={stacks}
                    positive={false}
                    name={debuffId}
                    description={debuffDescriptions[debuffId as DebuffId]}
                />
            )}
        </div>
    );
}