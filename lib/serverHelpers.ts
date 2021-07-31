import { getUserInfo, withUserId } from "./db";
import { parse } from 'cookie';

async function getInfo(cookie) {
    if (!cookie) {
        return null;
    }
    const cookies = parse(cookie);
    const token = cookies.token;
    if (!token) {
        return null;
    }

    return await withUserId(token, async (user_id) => await getUserInfo(user_id));
}

export async function serverSide_checkAuth(context, require_login: boolean, require_mod: boolean, require_admin: boolean) {
    // Assumptions about requirements
    if (require_admin) {
        require_mod = true;
    }
    if (require_mod) {
        require_login = true;
    }

    if (require_login && !context.req.headers.cookie) {
        return [{
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }, null];
    }

    const info = await getInfo(context.req.headers.cookie);

    if (require_login && !info) {
        return [{
            redirect: {
                permanent: false,
                destination: '/login',
            },
        }, null];
    }
    if (require_mod && info.moderation_level < 2) {
        return [{
            redirect: {
                permanent: false,
                destination: '/error?reason=mod_only',
            },
        }, null];
    }
    if (require_admin && info.moderation_level < 3) {
        return [{
            redirect: {
                permanent: false,
                destination: '/error?reason=admin_only',
            },
        }, null];
    }

    return [null, {
        username: info.username,
        moderation_level: info.moderation_level,
        user_id: info.id
    }];
}