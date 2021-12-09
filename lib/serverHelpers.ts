import { parse } from "cookie";

import { IUser } from "./models/user";
import { connectDb, getUserInfo, withUserId } from "./db";
import { UserExtension } from "./types";

async function getInfo(cookie: any) {
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

export async function serverSide_checkIsLoggedIn(context: any) {
  if (!context.req.headers.cookie) {
    return false;
  }

  await connectDb();

  const info = await getInfo(context.req.headers.cookie);

  if (!info) {
    return false;
  }

  return true;
}

export async function serverSide_checkAuth(context: any, require_login: boolean, require_mod: boolean, require_admin: boolean) {
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
        destination: "/login",
      },
    }, null];
  }

  await connectDb();

  const info = await getInfo(context.req.headers.cookie);

  if (require_login && !info) {
    return [{
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }, null];
  }
  if (require_mod && info.moderation_level < 2) {
    return [{
      redirect: {
        permanent: false,
        destination: "/error?reason=mod_only",
      },
    }, null];
  }
  if (require_admin && info.moderation_level < 3) {
    return [{
      redirect: {
        permanent: false,
        destination: "/error?reason=admin_only",
      },
    }, null];
  }

  const extended_info = info && await getExtendedUserInfo(info);
  delete extended_info.updatedAt;
  delete extended_info.createdAt;

  return [null, extended_info && extended_info];
}

export async function getExtendedUserInfo(user_info_doc: any) {
  const info = user_info_doc.toObject();
  info.user_id = info._id.toString();
  delete info.__v;
  delete info._id;
  // yes this sucks
  const new_info = {
    ...info,
    count_reading_books: user_info_doc.books.filter(book => book.tracking_status == "Reading").length,
    count_finished_books: user_info_doc.books.filter(book => book.tracking_status == "Finished").length,
    count_planning_books: user_info_doc.books.filter(book => book.tracking_status == "Planning").length,
    count_dropped_books: user_info_doc.books.filter(book => book.tracking_status == "Dropped").length,
  } as IUser & UserExtension;
  delete new_info.books;
  return new_info;
}