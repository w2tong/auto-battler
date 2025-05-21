export default function SelectMenu({ options, onChange, id, label, value }: { options: { text: string, value: string; }[], onChange: (val: string) => void, id: string, label?: string, value?: string; }) {
    return (
        <div className='flex flex-col'>
            {label && <label htmlFor={id}>{label}</label>}
            <select className='border border-white' id={id} value={value} onChange={e => onChange(e.target.value)}>
                {[{ value: '', text: '-' }, ...options].map(opt =>
                    <option className='bg-black' key={opt.value} value={opt.value}>{opt.text}</option>
                )}
            </select>
        </div>
    );
}
