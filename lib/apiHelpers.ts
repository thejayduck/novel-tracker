import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo, withUserId } from "./db";
import { isToken, UserInfo } from "./types";

export type Params = { [key: string]: string };

export function withHelperBareGet<T>(required_fields: string[], callback: (token: string, params: Params) => Promise<T>): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            const token = req.cookies.token;
            if (!isToken(token)) {
                throw "Invalid Token";
            }

            const params = req.query as Params;

            const missing = required_fields.filter(required_field => {
                const value = req.query[required_field];
                return value == undefined
                    || value == null
                    || (typeof value == 'string' && !value);
            });

            if (missing.length > 0) {
                throw `Missing or empty parameters ${missing.join(", ")}`;
            }
            const data = await callback(token, params);
            res.status(200).json({ status: "OK", data });
        } catch (reason) {
            console.log(reason);
            let err: unknown;
            if (reason instanceof Error) {
                err = {
                    name: reason.name,
                    message: reason.message,
                }
            } else {
                err = reason;
            }
            res.status(500).json({ status: "Error", err });
        }
    }
}

export function withInfoHelperGet<T>(required_fields: string[], callback: (token: string, params: Params, user_info: UserInfo) => Promise<T>, user_info_required: boolean = false): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return withHelperBareGet(required_fields, async (token, params) => {
        const user_info = await withUserId(token, getUserInfo);
        if (user_info_required && !user_info) {
            throw {
                message: "Unable to find user",
            };
        }
        return await callback(token, params, user_info);
    });
}

export function withHelperBarePost<T>(required_fields: string[], callback: (token: string, params: Params) => Promise<T>): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            const token = req.cookies.token;
            if (!isToken(token)) {
                throw "Invalid Token";
            }

            const params = req.body;

            const missing = required_fields.filter(required_field => {
                const value = req.body[required_field];
                return value == undefined
                    || value == null
                    || (typeof value == 'string' && !value);
            });

            if (missing.length > 0) {
                throw `Missing or empty parameters ${missing.join(", ")}`;
            }
            const data = await callback(token, params);
            res.status(200).json({ status: "OK", data });
        } catch (reason) {
            console.log(reason);
            let err: unknown;
            if (reason instanceof Error) {
                err = {
                    name: reason.name,
                    message: reason.message,
                }
            } else {
                err = reason;
            }
            res.status(500).json({ status: "Error", err });
        }
    }
}

export function withInfoHelperPost<T>(required_fields: string[], callback: (token: string, params: Params, user_info: UserInfo) => Promise<T>, user_info_required: boolean = false): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return withHelperBarePost(required_fields, async (token, params) => {
        const user_info = await withUserId(token, getUserInfo);
        if (user_info_required && !user_info) {
            throw {
                message: "Unable to find user",
            };
        }
        return await callback(token, params, user_info);
    });
}