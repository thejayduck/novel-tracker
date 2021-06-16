export default function LogoutButton() {
    return (
        <a
            href="/api/me/logout"
            style={{
                color: "white",
                backgroundColor: "var(--blue-violet)",
                border: "none",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "15px",
                borderRadius: "10px",
                padding: "5px",
                margin: "3px",
            }}
        >
            Logout
            <i class="fab fa-google"></i>
        </a>
    );
}