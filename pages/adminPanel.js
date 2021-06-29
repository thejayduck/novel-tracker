import styles from "../styles/AdminPanel.module.css"
import PageBase from "../components/pageBase";
import { serverSide_checkAuth } from "../lib/serverHelpers";

export async function getServerSideProps(context) {
    const [auth, info] = await serverSide_checkAuth(context, true, true, true);
    return auth || {
        props: {
            user_info: info,
        },
    };
}

export default function AdminPanel({ user_info }) {
    return (
        <PageBase userInfo={user_info}>
            <div className={styles.pageContent}>

            </div>
        </PageBase>
    )
}