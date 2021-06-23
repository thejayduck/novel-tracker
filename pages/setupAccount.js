import styles from "../styles/SetupAccount.module.css"
import Button from "../components/ui/button";
import PageBase from "../components/pageBase";
import InputField from "../components/ui/inputField.js"

import { parse } from "cookie";
import { getUserInfo, withUserId } from "../lib/db";
import { useRouter } from 'next/router';
import { useRef, useState } from "react";
import { motion } from "framer-motion";

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

    const [animEnd, setAnimEnd] = useState(false);
    return (

        <PageBase>
            <motion.div
                animate={{ height: "150px", width: "150px" }}
                onAnimationComplete={definition => {
                    console.log('Completed animating', definition)
                }}
                transition={{ delay: 2 }}
            >
                <img className={styles.logo} src='../book.svg' />
            </motion.div>
            <h3>Please Enter a Username to Finish Setting Up Your "Novel Tracker" Account </h3>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
            >
                <div className={styles.content}>
                    <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" onChange={({ target }) => setUsernameInput(target.value)} />
                    <Button title="Complete Account!" icon="fas fa-user-alt" onClick={onCompleteClick} />
                </div>
            </motion.div>
        </PageBase>
    );
}