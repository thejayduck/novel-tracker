import { getUserInfo, withUserId } from "./db";
import { parse } from 'cookie';

export async function serverSide_checkAuth(context, require_login: boolean, require_mod: boolean, require_admin: boolean) {
    // Assumptions about requirements
    if (require_admin) {
        require_mod = true;
    }
    if (require_mod) {
        require_login = true;
    }

    let info = null;
    if (require_login) {
        if (!context.req.headers.cookie) {
            return [{
                redirect: {
                    permanent: false,
                    destination: '/login',
                },
            }, null];
        }
        const cookies = parse(context.req.headers.cookie);
        const token = cookies.token;

        info = await withUserId(token, async (user_id) => await getUserInfo(user_id));

        if (!info) {
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
    }

    return [null, info];
}