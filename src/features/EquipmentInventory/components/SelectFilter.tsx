export default function SelectFilter({ options, callback, id, label }: { options: { text: string, value: string; }[], callback: (newVal: string) => void, id: string, label?: string; }) {
    return (
        <div className='flex flex-col'>
            {label && <label htmlFor={id}>{label}</label>}
            <select className='border border-white' id={id} onChange={e => callback(e.target.value)}>
                {[{ value: '', text: '-' }, ...options].map(opt =>
                    <option className='bg-black' value={opt.value}>{opt.text}</option>
                )}
            </select>
        </div>
    );
}
