import { useEffect, useRef, useState } from "react";

export function useDelayedState<T>(initialState: T, delay: number) {
    const [delayedState, setDelayedState] = useState(initialState);

    const timeoutRef = useRef(null);

    function setInternalState(new_state: T) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            setDelayedState(new_state);
        }, delay);
    }

    return [delayedState, setInternalState]
}

export function useDelayedStateWithLive<T>(initialState: T, delay: number) {
    const [delayedState, setDelayedState] = useState(initialState);
    const [internalState, setInternalState] = useState(initialState);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setDelayedState(internalState);
        }, delay);
        return () => clearTimeout(timeout);
    }, [internalState]);

    return [delayedState, setInternalState, internalState]
}