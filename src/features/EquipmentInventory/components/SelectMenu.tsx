export default function SelectMenu({ options, onChange, id, label }: { options: { text: string, value: string; }[], onChange: (newVal: string) => void, id: string, label?: string; }) {
    return (
        <div className='flex flex-col'>
            {label && <label htmlFor={id}>{label}</label>}
            <select className='border border-white' id={id} onChange={e => onChange(e.target.value)}>
                {[{ value: '', text: '-' }, ...options].map(opt =>
                    <option className='bg-black' value={opt.value}>{opt.text}</option>
                )}
            </select>
        </div>
    );
}
