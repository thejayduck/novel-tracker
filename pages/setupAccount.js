import styles from "../styles/SetupAccount.module.css"
import Button from "../components/ui/button";
import PageBase from "../components/pageBase";
import { InputField } from "../components/ui/inputField"

import { useRouter } from 'next/router';
import { useRef } from "react";
import { motion } from "framer-motion";
import { serverSide_checkAuth } from "../lib/serverHelpers";

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

    const usernameRef = useRef(null);

    async function onCompleteClick() {
        const response = await fetch("/api/me/set_username", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_name: usernameRef.current.value,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        router.push('/');
    }

    return (

        <PageBase userInfo={user_info}>
            <img className={styles.logo} src='../book.svg' />
            <h3>Please Enter a Username to Finish Setting Up Your "Novel Tracker" Account </h3>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className={styles.content}>
                    <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" />
                    <Button title="Complete Account!" icon="fas fa-fw fa-user-alt" onClick={onCompleteClick} />
                </div>
            </motion.div>
        </PageBase>
    );
}