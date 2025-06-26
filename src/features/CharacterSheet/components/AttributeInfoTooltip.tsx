import InfoTooltip from "@/components/tooltip/InfoTooltip";
import { Separator } from "@radix-ui/react-separator";
import { Attributes, LEVEL_CAPS, POINTS_PER_LEVEL, STARTING_POINTS } from "@wholesome-sisters/auto-battler";

const map: Record<number, number[]> = {};
for (const [level, cap] of Object.entries(LEVEL_CAPS)) {
    const lvl = Number(level);
    if (!map[cap]) map[cap] = [];
    map[cap].push(lvl);
}
const caps = Object.entries(map).map(([cap, levels]) => {
    const min = Math.min(...levels);
    const max = Math.max(...levels);
    return {
        min,
        max,
        cap
    };
});

const attributeInfo =
    <div className='text-pretty'>
        <div className='font-bold'>Attributes</div>
        <Separator />
        <div className='whitespace-pre-wrap space-y-3'>
            <p>Attributes start with a base value of <b>{Attributes.DEFAULT_VALUE}</b>.</p>
            <p>Each attribute influences certain stats. Attributes lower than <b>{Attributes.DEFAULT_VALUE}</b> decrease stats, and when higher than <b>{Attributes.DEFAULT_VALUE}</b> increase stats.</p>

            <p>Characters start with <b>{STARTING_POINTS}</b> points and gain <b>{POINTS_PER_LEVEL}</b> points every level.</p>
            <p>Each attribute <b>base</b> value cannot be lower than <b>{Attributes.MIN_VALUE}</b>.</p>
            <div>
                <div>Each attribute <b>base</b> value cannot be higher than the following:</div>
                {caps.map(({ min, max, cap }) => (
                    <div className='grid grid-cols-2' key={cap}>
                        Levels {min}-{max}: <b>{cap}</b>
                    </div>
                ))}
            </div>
        </div>
    </div>;


export default function AttributeInfoTooltip() {
    return <InfoTooltip content={attributeInfo} />;
}