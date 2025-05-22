export default function TurnOrder({ chars, index }: { chars: string[], index: number; }) {
    return (
        <div>
            <h2>Turn Order</h2>
            <div className='flex flex-row space-x-1'>
                {chars.map((char, i) => {
                    return (
                        <div className={`border rounded-xl px-2 py-0.5 ${i === index ? 'border-slate-600 bg-slate-600' : 'border-slate-900 bg-slate-900'}`} key={i}>
                            {char}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}