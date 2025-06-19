import TurnOrderType from "../types/TurnOrderType";

export default function TurnOrder({ chars, index }: { chars: TurnOrderType, index: number; }) {
    return (
        <div>
            <h2 className='text-xl font-bold'>Turn Order</h2>
            <div className='flex flex-row space-x-1'>
                {chars.map(char => {
                    return (
                        <div className={`border rounded-xl px-2 py-0.5 ${char.index === index ? 'border-slate-600 bg-slate-600' : 'border-slate-900 bg-slate-900'}`} key={char.index}>
                            {char.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}