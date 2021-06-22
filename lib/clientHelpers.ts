import { useEffect, useState } from "react";

export function useDelayedState<T>(initialState: T, delay: number) {
    const [delayedState, setDelayedState] = useState(initialState);
    const [internalState, setInternalState] = useState(initialState);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setDelayedState(internalState);
        }, delay);
        return () => { console.log("cleanup"); clearTimeout(timeout) };
    }, [internalState]);

    return [delayedState, setInternalState, internalState]
}