// @ts-nocheck
import styles from "styles/SetupAccount.module.css";

import { useRouter } from "next/router";

import React, { useEffect, useRef } from "react";

import PageBase from "components/pageBase";
import { NavigationButton } from "components/ui/button";

import { useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import { InputField } from "../components/ui/inputField";

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, false, false);

    if (!auth && info.username != null) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return auth || {
        props: {
            user_info: info,
        },
    };
}

export default function SetupAccount({ user_info }) {
    const router = useRouter();
    const api = useApi();

    const usernameRef = useRef(null);

    async function onCompleteClick() {
        await api.setUsername(usernameRef.current.value);
        router.push("/");
    }

    useEffect(() => {
        if (usernameRef.current) {
            function onKeyUp(e) {
                if (e.key == "Enter") {
                    onCompleteClick();
                }
            }

            const input = usernameRef.current;
            input.addEventListener("keyup", onKeyUp);
            return () => input.removeEventListener("keyup", onKeyUp);
        }
    }, [usernameRef.current]);

    return (
        <PageBase user_info={user_info}>
            <img width="150" height="150" src='../icon.svg' />
            <div className={styles.content}>
                <h3>Please Enter a Username to Finish Setting Up Your &quot;Novel Tracker&quot; Account </h3>
                <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" />
                <NavigationButton text="Complete Account!" icon="fas fa-fw fa-user-alt" onClick={onCompleteClick} />
            </div>
        </PageBase>
    );
}