export default function TurnOrder({ chars, index }: { chars: string[], index: number; }) {
    return (
        <div>
            <h2>Turn Order</h2>
            <div className='flex flex-row space-x-1'>
                {chars.map((char, i) => {
                    return (
                        <div className={i === index ? 'bg-slate-400' : 'bg-slate-900'} key={i}>
                            {char}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}