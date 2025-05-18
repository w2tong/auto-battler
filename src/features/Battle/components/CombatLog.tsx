import { equips, LineType, LogLine } from "@wholesome-sisters/auto-battler";
import ItemTooltip from "../../../components/ItemTooltip";
import { tierTextColor } from "../../../utils/tierColor";

function lineToString(line: LogLine) {
    switch (line.type) {
        case (LineType.Text): {
            return line.text;
        }
        case (LineType.Loot): {
            const item = equips[line.itemId];
            return (<>{line.name} looted <ItemTooltip item={item}><span className={`inline-block font-bold ${tierTextColor[item.tier]}`}>[{item.name}]</span></ItemTooltip>.</>);
        }
        case (LineType.Exp): {
            return `${line.name} gained ${line.exp} experience.`;
        }
        case (LineType.LevelUp): {
            return `${line.name} leveled up to level ${line.level}.`;
        }
    }
}

export default function CombatLog({ log, className }: { log: LogLine[], className: string; }) {
    return (
        <div className={`flex flex-col ${className}`}>
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