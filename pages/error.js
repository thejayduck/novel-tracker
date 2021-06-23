import PageBase from "../components/pageBase"
import Button from "../components/ui/button"

const reason_messages = {
    must_login: "This page requires the user to be logged in!",
    mod_only: "This page can only be accessed by users with 'Moderator' status!"
}

export async function getServerSideProps({ query }) {
    return {
        props: {
            message: reason_messages[query.reason]
        },
    }
}

export default function Error({ message }) {
    return (
        <PageBase>
            <div>
                <h1 style={{ textTransform: "capitalize" }}>{message}</h1>
                <Button title="Go Back" onClick={() => location.href = "/"} />
            </div>
        </PageBase>
    )
}