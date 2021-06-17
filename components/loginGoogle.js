import { useEffect, useState } from "react";
import FooterButton from "./footerButton";

export default function LoginGoogle() {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        const domain = `${window.location.protocol}//${window.location.host}`;
        setUrl(`https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&response_type=code&client_id=524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com&redirect_uri=${domain}/api/auth&state=434595.10145617445`);
    })
    return url ? (
        <FooterButton
            title="Sign In Using Google"
            icon="fas fa-user-alt"
            href={url}
        />
    ) : <></>;
}