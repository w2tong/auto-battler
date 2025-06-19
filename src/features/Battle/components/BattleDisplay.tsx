'use client';

import { LogLine } from '@wholesome-sisters/auto-battler';
import type BattleCharacter from '../types/BattleCharacter';
import CharacterFrame from './CharacterFrame';
import CombatLog from './CombatLog';
import TurnOrder from './TurnOrder';
import { useLayoutEffect, useRef, useState } from 'react';
import TurnOrderType from '../types/TurnOrderType';

export default function BattleDisplay({ left, right, combatLog, turnOrder, turnIndex }: { left: BattleCharacter[], right: BattleCharacter[], turnOrder: TurnOrderType, turnIndex: number, combatLog: LogLine[]; }) {
    const [combatLogHeight, setCombatLogHeight] = useState<number | undefined>(undefined);
    const combatLogRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        function updateHeight() {
            if (combatLogRef.current) {
                const top = combatLogRef.current.getBoundingClientRect().top;
                setCombatLogHeight(window.innerHeight - top - 50);
            }
        }
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <div className='h-full flex flex-col md:flex-row'>
            <div className='flex flex-col grow'>
                <TurnOrder chars={turnOrder} index={turnIndex} />
                {/* TODO: shrink character frames on lower resolution (3 rats shrinks combat log too much) */}
                <div className='flex flex-row'>
                    <div className='flex-1 flex-col p-2 space-y-1 w-1/2'>
                        <h2 className='text-xl font-bold text-center'>Left</h2>
                        {left.map((char, i) => <CharacterFrame key={`left-${i}`} {...char} />)}
                    </div>
                    <div className='flex-1 flex-col p-2 space-y-1 w-1/2'>
                        <h2 className='text-xl font-bold text-center'>Right</h2>
                        {right.map((char, i) => <CharacterFrame key={`right-${i}`} {...char} />)}
                    </div>
                </div>
            </div>
            <div
                ref={combatLogRef}
                style={combatLogHeight ? { height: combatLogHeight, minHeight: 0 } : undefined}
            >
                <CombatLog className='w-full h-full md:w-80 lg:w-120 xl:w-140 grow md:grow-0 overflow-y-auto px-4' log={combatLog} />
            </div>
        </div>
    );
}