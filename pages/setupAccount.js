import styles from "@styles/SetupAccount.module.css"
import Button from "@components/ui/button";
import PageBase from "@components/pageBase";
import { InputField } from "@components/ui/inputField"

import { useRouter } from 'next/router';
import { useEffect, useRef } from "react";
import { serverSide_checkAuth } from "@lib/serverHelpers";
import { useApi } from "@lib/clientHelpers";


export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, false, false);

    if (!auth && info.username != null) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
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
        router.push('/');
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
        <PageBase userInfo={user_info}>
            <img width="150" height="150" src='../book.svg' />
            <div className={styles.content}>
                <h3>Please Enter a Username to Finish Setting Up Your "Novel Tracker" Account </h3>
                <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" />
                <Button text="Complete Account!" icon="fas fa-fw fa-user-alt" onClick={onCompleteClick} />
            </div>
        </PageBase>
    );
}