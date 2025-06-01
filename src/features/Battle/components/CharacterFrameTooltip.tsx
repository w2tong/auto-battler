import { ReactNode } from "react";
import Tooltip from "../../../components/Tooltip";
import { AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import CharacterFrameStats from "../types/CharacterFrameStats";
import CharacterFrameAttributes from "../types/CharacterFrameAttributes";
import { formatNum } from "../../../utils/stats";

type CharacterFrameTooltipProps = {
    name: string,
    attr: CharacterFrameAttributes,
    stats: CharacterFrameStats,
    mainHandDamage: { min: number, max: number; },
    offHandDamage: { min: number, max: number; } | null,
    onHit: string | null,
    ability: { name: string, description: string; } | null;
    children: ReactNode;
};
export default function CharacterFrameTooltip({ name, attr, stats, mainHandDamage, offHandDamage, onHit, ability, children }: CharacterFrameTooltipProps) {
    const content =
        <div className='w-60 space-y-2'>
            <b>{name}</b>
            <hr />
            <div className='grid grid-cols-3 gap-x-0.5 text-center'>
                <span>{attr[AttributeType.Strength]} STR</span>
                <span>{attr[AttributeType.Dexterity]} DEX</span>
                <span>{attr[AttributeType.Constitution]} CON</span>
                <span>{attr[AttributeType.Perception]} PER</span>
                <span>{attr[AttributeType.Intelligence]} INT</span>
                <span>{attr[AttributeType.Wisdom]} WIS</span>
            </div>
            <hr />
            <div>
                <p>{formatNum(stats[StatType.Accuracy])} {[StatType.Accuracy]}</p>
                <p>{formatNum(stats[StatType.Dodge])}% {[StatType.Dodge]}</p>
                <p>{formatNum(stats[StatType.Armour])} {[StatType.Armour]}</p>
                <p>{formatNum(stats[StatType.Deflection])} {[StatType.Deflection]}</p>
            </div>
            <hr />
            <div className='flex flex-row justify-between'>
                <div>
                    <div className='font-bold'>Main-hand</div>
                    <div>{formatNum(mainHandDamage.min)} - {formatNum(mainHandDamage.max)}</div>
                </div>
                <div>
                    {offHandDamage &&
                        <>
                            <div className='font-bold'>Off-hand</div>
                            <div>{formatNum(offHandDamage.min)} - {formatNum(offHandDamage.max)}</div>
                        </>
                    }
                </div>
            </div>
            <hr />
            {onHit &&
                <div><b>On Hit</b>: {onHit}</div>
            }
            {ability &&
                <div><b>Ability: {ability.name}</b>
                    <p>{ability.description}</p>
                </div>
            }

        </div>;

    return (
        <Tooltip className='w-full' content={content}>
            {children}
        </Tooltip>
    );
}