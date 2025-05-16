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
    return (
        // <div>
        //     <progress value={props.curr} max={props.max}>
        //         {props.curr}/{props.max}
        //     </progress>
        // </div>
        <div className={`w-full ${resource.bgColor} h-6`}>
            <div className={`${resource.color} h-6`} style={{ width: `${props.curr >= 0 ? props.curr / props.max * 100 : 0}%` }}>{props.curr}/{props.max}</div>
        </div>
    );
}

export { Resource };