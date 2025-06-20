import { ReactNode } from "react";
import Tooltip from "@components/Tooltip";
import { AttributeType, StatType } from "@wholesome-sisters/auto-battler";
import CharacterFrameStats from "../types/CharacterFrameStats";
import CharacterFrameAttributes from "../types/CharacterFrameAttributes";
import { formatNum } from "@utils/stats";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";

type CharacterFrameTooltipProps = {
    name: string,
    attr: CharacterFrameAttributes,
    stats: CharacterFrameStats,
    mainHandDamage: { min: number, max: number; },
    offHandDamage: { min: number, max: number; } | null,
    onHit: string | null,
    ability: { name: string, description: string; } | null,
    classColor: string,
    children: ReactNode;
};

function Stat({ name, value }: { name: string, value: number | string; }) {
    return <div className='flex flex-row justify-between'>
        <b>{name}</b> {value}
    </div>;
}

export default function CharacterFrameTooltip({ name, attr, stats, mainHandDamage, offHandDamage, onHit, ability, classColor, children }: CharacterFrameTooltipProps) {
    const content =
        <div className='w-70 space-y-2 p-1'>
            <div className={cn('font-extrabold', classColor)}>{name}</div>
            <Separator />
            <div className='grid grid-cols-3 gap-x-0.5 text-center'>
                <span>{attr[AttributeType.Strength]} <b>STR</b></span>
                <span>{attr[AttributeType.Dexterity]} <b>DEX</b></span>
                <span>{attr[AttributeType.Constitution]} <b>CON</b></span>
                <span>{attr[AttributeType.Perception]} <b>PER</b></span>
                <span>{attr[AttributeType.Intelligence]} <b>INT</b></span>
                <span>{attr[AttributeType.Wisdom]} <b>WIS</b></span>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-x-8 text-right'>
                <Stat name={StatType.Accuracy} value={formatNum(stats[StatType.Accuracy])} />
                <Stat name={StatType.Dodge} value={`${formatNum(stats[StatType.Dodge])}%`} />
                <Stat name={StatType.Armour} value={formatNum(stats[StatType.Armour])} />
                <Stat name={StatType.ArmourPenetration} value={formatNum(stats[StatType.ArmourPenetration])} />
                <Stat name={StatType.Deflection} value={formatNum(stats[StatType.Deflection])} />
            </div>
            <Separator />
            <div className='flex flex-row justify-between'>
                <div>
                    <div className='font-bold'>Main-hand</div>
                    <div><b>{formatNum(mainHandDamage.min)}</b> - <b>{formatNum(mainHandDamage.max)}</b> Damage</div>
                </div>
                <div>
                    {offHandDamage &&
                        <>
                            <div className='font-bold'>Off-hand</div>
                            <div><b>{formatNum(offHandDamage.min)}</b> - <b>{formatNum(offHandDamage.max)}</b> Damage</div>
                        </>
                    }
                </div>
            </div>

            {onHit &&
                <>
                    <Separator />
                    <div><b>On Hit</b>: {onHit}</div>
                </>
            }
            {ability &&
                <>
                    <Separator />
                    <div><b>Ability: {ability.name}</b>
                        <p>{ability.description}</p>
                    </div>
                </>
            }

        </div>;

    return (
        <Tooltip className='w-full' content={content}>
            {children}
        </Tooltip>
    );
}