'use client';

import { LogLine } from '@wholesome-sisters/auto-battler';
import type BattleCharacter from '../../../types/BattleCharacter';
import CharacterFrame from './CharacterFrame';
import CombatLog from './CombatLog';
import TurnOrder from './TurnOrder';
import { npcIconMap } from '../../../utils/npcIcon';
import classIconMap from '../../../utils/classIconMap';

export default function BattleDisplay({ left, right, combatLog, turnOrder, turnIndex }: { left: BattleCharacter[], right: BattleCharacter[], turnOrder: string[], turnIndex: number, combatLog: LogLine[]; }) {
    return (
        <div className='h-full flex flex-col sm:flex-row'>
            <div className='flex flex-col grow'>
                <TurnOrder chars={turnOrder} index={turnIndex} />
                <div className='flex flex-row'>
                    <div className='flex-1 flex-col p-2 space-y-1 w-1/2'>
                        <h2 className='text-center'>Left</h2>
                        {left.map((char, i) => <CharacterFrame key={`left-${i}`} {...char} icon={char.npcId ? npcIconMap[char.npcId] : char.className ? classIconMap[char.className] : { src: '/item-icons/placeholder.png', alt: 'placeholder' }} />)}
                    </div>
                    <div className='flex-1 flex-col p-2 space-y-1 w-1/2'>
                        <h2 className='text-center'>Right</h2>
                        {right.map((char, i) => <CharacterFrame key={`right-${i}`} {...char} icon={char.npcId ? npcIconMap[char.npcId] : char.className ? classIconMap[char.className] : { src: '/item-icons/placeholder.png', alt: 'placeholder' }} />)}
                    </div>
                </div>
            </div>
            {/* TODO: figure out way to have height scale dynamically with page, maybe use flexbox */}
            <CombatLog className='w-full sm:w-64 md:w-80 lg:w-[28rem] grow sm:grow-0 h-96 sm:h-full' log={combatLog} />
        </div>
    );
}