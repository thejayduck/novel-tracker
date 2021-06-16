export default function LoginGoogle() {
    return (
        <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth&state=434595.10145617445">
            Login with Google
        </a>
    );
}