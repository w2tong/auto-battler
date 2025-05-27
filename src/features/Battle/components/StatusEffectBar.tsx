import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";
import Icon from "../../../types/Icon";
import { buffIconMap, debuffIconMap } from "../../../utils/statusEffectIcon";
import { BuffBar, DebuffBar } from "../../../types/StatusEffectBar";

function StatusEffect({ icon, stacks }: { icon: Icon, stacks: number; }) {
    return (
        <div className='flex flex-row items-center h-4'>
            <img className='w-4' src={icon.src} alt={icon.alt} />
            <span>({stacks})</span>
        </div>
    );
}

export default function StatusEffectBar({ buffs, debuffs }: { buffs: BuffBar, debuffs: DebuffBar; }) {
    return (
        <div className='h-8'>
            {Object.entries(buffs).map(([buffId, stacks]) => <StatusEffect key={buffId} icon={buffIconMap[buffId as BuffId]} stacks={stacks} />)}
            {Object.entries(debuffs).map(([debuffId, stacks]) => <StatusEffect key={debuffId} icon={debuffIconMap[debuffId as DebuffId]} stacks={stacks} />)}
        </div>
    );
}