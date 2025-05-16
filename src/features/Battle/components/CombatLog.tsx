import { LogLine } from "@wholesome-sisters/auto-battler";

export default function CombatLog({ log, className }: { log: LogLine[], className: string; }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <h2 className='grow-0'>Combat Log</h2>
            <div className='grow overflow-y-auto flex flex-col-reverse'>
                <div className='flex flex-col'>
                    {log.map((line, i) => {
                        return (
                            <div key={i}>
                                {line}<br />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}