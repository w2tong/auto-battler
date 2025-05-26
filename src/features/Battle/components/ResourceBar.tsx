enum Resource {
    Health = 'Health',
    Mana = 'Mana'
}

const ResourceColor: { [key in Resource]: { color: string, bgColor: string; } } = {
    [Resource.Health]: {
        color: 'bg-health',
        bgColor: 'bg-health-bg'
    },
    [Resource.Mana]: {
        color: 'bg-mana',
        bgColor: 'bg-mana-bg'
    }
} as const;

type ResourceBarProps = {
    resource: Resource;
    curr: number;
    max: number;
};

export default function ResourceBar(props: ResourceBarProps) {
    const resource = ResourceColor[props.resource];
    const width = `${props.curr >= 0 ? Math.min(props.curr / props.max * 100, 100) : 0}%`;

    return (
        <div className={`w-full ${resource.bgColor} h-6`}>
            <span className='absolute font-bold pl-2'>{`${props.curr} / ${props.max}`}</span>
            <div className={`${resource.color} h-6`} style={{ width }}>
            </div>
        </div>
    );
}

export { Resource };