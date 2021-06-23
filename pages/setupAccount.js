import styles from "../styles/SetupAccount.module.css"
import Button from "../components/ui/button";
import PageBase from "../components/pageBase";
import { InputField } from "../components/ui/inputField";
import { useRouter } from 'next/router';
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useUser } from "../lib/clientHelpers";


export default function SetupAccount() {
    const router = useRouter();

    const userInfo = useUser({
        logged_in: true,
        be_mod: false,
        be_admin: false
    });

    useEffect(() => {
        if (userInfo?.username != null) {
            router.push("/");
        }
    }, [userInfo])

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
            <motion.div
                animate={{ height: "150px", width: "150px" }}
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
                    <InputField ref={usernameRef} inputType="text" placeHolder="(Max 32 Characters)" maxLength="32" />
                    <Button title="Complete Account!" icon="fas fa-user-alt" onClick={onCompleteClick} />
                </div>
            </motion.div>
        </PageBase>
    );
}