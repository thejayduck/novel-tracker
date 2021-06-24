import styles from "../styles/SetupAccount.module.css"
import Button from "../components/ui/button";
import PageBase from "../components/pageBase";
import { InputField } from "../components/ui/inputField"

import { getUserInfo, withUserId } from "../lib/db";
import { useRouter } from 'next/router';
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { parse } from "cookie";

export async function getServerSideProps(context) {
    const cookie_header = context.req.headers.cookie;
    if (!cookie_header) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }
    }

    const cookies = parse(context.req.headers.cookie);
    const token = cookies.token;
    const info = await withUserId(token, async (user_id) => await getUserInfo(user_id));
    if (info == null) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }
    }

    if (info.username != null) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
    }

    return {
        props: {
            user_info: info,
        },
    };
}


export default function SetupAccount() {
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

        <PageBase>
            <img className={styles.logo} src='../book.svg' />
            <h3>Please Enter a Username to Finish Setting Up Your "Novel Tracker" Account </h3>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className={styles.content}>

                    <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" />
                    <Button title="Complete Account!" icon="fas fa-user-alt" onClick={onCompleteClick} />
                </div>
            </motion.div>
        </PageBase>
    );
}