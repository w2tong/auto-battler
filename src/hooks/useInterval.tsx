import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>(() => { });
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        if (delay !== null) {
            intervalId.current = setInterval(() => savedCallback.current(), delay);
            return () => {
                if (intervalId.current) clearInterval(intervalId.current);
            };
        }
    }, [delay]);
}