import { DependencyList, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { UserInfo } from "./types";

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

export function useQueryParams() {
    const router = useRouter();
    const query = useMemo(() => router.isReady ? router.query : null, [router.query])
    return query;
}

export function useAsyncEffect(callback: () => Promise<void>, deps_list: DependencyList) {
    useEffect(() => {
        callback();
    }, deps_list);
}

/**
 * undefined = loading
 *
 * null = not logged in
 */
export function useUser(settings: { logged_in: boolean, be_mod: boolean, be_admin: boolean }) {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState(undefined);

    useAsyncEffect(async () => {
        const response = await fetch("/api/me/info");
        const json = await response.json();
        const info = json.data;
        if (settings.logged_in && info == null) {
            router.push("/error?reason=must_login");
        }
        if (settings.be_mod && info.moderation_level < 2) {
            router.push("/error?reason=mod_only");
        }
        if (settings.be_admin && info.moderation_level < 3) {
            router.push("/error?reason=admin_only");
        }
        setUserInfo(info);
    }, []);

    return userInfo;
}