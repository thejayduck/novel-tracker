const reason_messages = {
    must_login: "This page requires the user to be logged in.",
    mod_only: "This page can only be accessed by users with Moderator status"
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
        <p style={{ color: "red" }}>
            {message}
        </p>
    )
}