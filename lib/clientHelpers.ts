import { useEffect, useRef, useState } from "react";
import { useAlert } from '../components/alertWrapper';

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

export function useApi() {
    const alert = useAlert();

    async function postCall<T, U>(endpoint: string, data: T, onSuccess?: (responseData: U) => void) {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        if (json.status != "OK") {
            alert.error(json.message);
        } else {
            if (onSuccess) {
                onSuccess(json.data);
            }
        }
    }

    return {
        async acceptBook(submission_id: number, onSuccess?: (responseData: void) => void) {
            return postCall("mod/accept_book", { submission_id }, onSuccess);
        }
    }
}