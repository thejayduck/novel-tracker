import PageBase from "components/pageBase"
import Button from "components/ui/button"
// import { serverSide_checkAuth } from "@lib/serverHelpers";

const reason_messages = {
    must_login: "This page requires the user to be logged in!",
    mod_only: "This page can only be accessed by users with 'Moderator' status!",
    admin_only: "This page can only be accessed by users with 'Administrator' status!",
}

export async function getServerSideProps(context) {
    // const [_, info] = await serverSide_checkAuth(context, false, false, false);

    return {
        props: {
            // user_info: info,
            message: reason_messages[context.query.reason]
        },
    }
}

export default function Error({ message }) {
    return (
        <PageBase>
            <div>
                <h1>{message}</h1>
            </div>
        </PageBase>
    )
}