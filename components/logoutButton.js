import FooterButton from "./footerButton";

export default function LogoutButton() {
    return (
        <FooterButton
            title="Sign Out"
            icon="fas fa-user-alt-slash"
            href="/api/me/logout"
        />
    );
}