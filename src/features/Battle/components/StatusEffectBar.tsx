import { BuffId, DebuffId } from "@wholesome-sisters/auto-battler";
import Icon from "../../../types/Icon";
import { buffIconMap, debuffIconMap } from "../../../utils/statusEffectIcon";
import { BuffBar, DebuffBar } from "../../../types/StatusEffectBar";

// TODO: add tooltips for status effects
// TOOD: make it more clear what is a buff vs debuff (green vs red border/outline?)
function StatusEffect({ icon, stacks }: { icon: Icon, stacks: number; }) {
    return (
        <div className='flex flex-row items-center h-4'>
            <img className='w-4' src={icon.src} alt={icon.alt} />
            <span>({stacks})</span>
        </div>
    );
}

// TODO: have StatusEffectBar take a fixed amount of space to prevent layout shifting
export default function StatusEffectBar({ buffs, debuffs }: { buffs: BuffBar, debuffs: DebuffBar; }) {
    return (
        <div className='h-8'>
            {Object.entries(buffs).map(([buffId, stacks]) => <StatusEffect key={buffId} icon={buffIconMap[buffId as BuffId]} stacks={stacks} />)}
            {Object.entries(debuffs).map(([debuffId, stacks]) => <StatusEffect key={debuffId} icon={debuffIconMap[debuffId as DebuffId]} stacks={stacks} />)}
        </div>
    );
}