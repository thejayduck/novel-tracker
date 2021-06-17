<<<<<<< HEAD
import Button from "../components/ui/button";
import { parse } from "cookie";
=======
import { parse } from "cookie";
>>>>>>> 3ab6524eb137d7cb6ce41eb4314bb12c9ed49763
import { useAppContext } from "../components/appWrapper";
import { getUserInfoFromId, withUserId } from "../lib/db";
import styles from "../styles/SetupAccount.module.css"
import { useRouter } from 'next/router';
import { useState } from "react";

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
    const info = await withUserId(token, async (user_id) => await getUserInfoFromId(user_id));
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
    const [state] = useAppContext();
    const router = useRouter();

    const [usernameInput, setUsernameInput] = useState("");

    async function onCompleteClick() {
        const response = await fetch("/api/me/set_username", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_name: usernameInput,
            }),
        });
        const json = await response.json();
        if (json.status != "OK") {
            throw json;
        }
        router.push('/');
    }

    return (
        <main className={`${styles.main} ${state.darkMode ? styles.dark : styles.light}`} >
            <div>
                <img className={styles.logo} src='../book.svg' />
                <div className={styles.formSection} >
                    <h3>Please Enter Your Username to Finish Setting Up Your "Light Novel Tracker" Account </h3>
                    <input type="text" placeholder="Username..." autoComplete="off" min="0" onChange={({ target }) => setUsernameInput(target.value)} />
                </div>
<<<<<<< HEAD
            <Button title="Complete Account!" icon="fas fa-user-alt" />
=======
                <div className={styles.submit} onClick={onCompleteClick}>
                <a>
                    Complete Account!
                </a>
                <i className="fas fa-user-alt" />
            </div>
>>>>>>> 3ab6524eb137d7cb6ce41eb4314bb12c9ed49763
            </div>
        </main >
    );
}