import { useEffect, useRef, useState } from "react";

import { useAlert } from "components/alertWrapper";

import { IBook } from "./models/book";
import { IUser } from "./models/user";

export function useDelayedState<T>(initialState: T, delay: number) {
  const [delayedState, setDelayedState] = useState(initialState);

  const timeoutRef = useRef(null);

  function setInternalState(new_state: T) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setDelayedState(new_state);
    }, delay);
  }

  return [delayedState, setInternalState];
}

interface Dimensions {
  width: number,
  height: number
}

function useWindowSize(): Dimensions {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0, });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight, });
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export function useIsMobile() {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width]);

  return isMobile;
}

export function useDelayedStateWithLive<T>(initialState: T, delay: number) {
  const [delayedState, setDelayedState] = useState(initialState);
  const [internalState, setInternalState] = useState(initialState);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setDelayedState(internalState);
    }, delay);
    return () => clearTimeout(timeout);
  }, [internalState]);

  return [delayedState, setInternalState, internalState];
}

export function useOuterClick(callback: () => void) {
  const callbackRef = useRef<() => void>();
  const innerRef = useRef<any>();

  useEffect(() => { callbackRef.current = callback; });
  useEffect(() => {
    function handleClick(e: any) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return innerRef;
}

export type GetBookResponse = IBook

export type GetUserInfoResponse = IUser

// TODO properly type all the return data
export function useApi() {
  const alert = useAlert();

  async function postCall<T, U>(endpoint: string, data: T, onSuccess?: (responseData: U) => void) {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    if (response.status != 200) {
      if (response.status == 500) {
        const json = await response.json();
        alert.error(`Server Error: '${json.message}'`);
      } else {
        alert.error(`API Request for endpoint ${endpoint} returned ${response.status}`);
      }
      return;
    }
    const json = await response.json();
    if (json.status != "OK") {
      alert.error(json.message);
      return json;
    } else {
      if (onSuccess) {
        onSuccess(json.data);
      }
      return json.data;
    }
  }
  async function getCall<T, U>(endpoint: string, data: T, onSuccess?: (responseData: U) => void) {
    const parameters = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&");
    const response = await fetch(`/api/${endpoint}?${parameters}`);
    if (response.status != 200) {
      if (response.status == 500) {
        const json = await response.json();
        alert.error(`Server Error: '${json.message}'`);
      } else {
        alert.error(`API Request for endpoint ${endpoint} returned ${response.status}`);
      }
      return;
    }
    const json = await response.json();
    if (json.status != "OK") {
      alert.error(json.message);
    } else {
      if (onSuccess) {
        onSuccess(json.data);
      }
      return json.data;
    }
  }

  return {
    async acceptBook(submission_id: string, onSuccess?: (responseData: unknown) => void) {
      return postCall("mod/accept_book", { submission_id }, onSuccess);
    },
    async denyBook(submission_id: string, onSuccess?: (responseData: unknown) => void) {
      return postCall("mod/deny_book", { submission_id }, onSuccess);
    },
    async setUsername(new_name: string, onSuccess?: (responseData: unknown) => void) {
      return postCall("me/set_username", { new_name }, onSuccess);
    },
    async submitBook(book_details: { [k: string]: any }, onSuccess?: (responseData: unknown) => void) {
      return postCall("me/submit_book", { book_details }, onSuccess);
    },
    async deleteBook(book_id: string, onSuccess?: (responseData: unknown) => void) {
      return postCall("me/delete_book", { book_id }, onSuccess);
    },
    async addBook(book_id: string, onSuccess?: (responseData: unknown) => void) {
      return postCall("me/add_book", { book_id }, onSuccess);
    },
    async updateChaptersRead(book_id: string, new_chapters_read: number, onSuccess?: (responseData: unknown) => void) {
      return postCall("me/update_chapters_read", { book_id, new_chapters_read }, onSuccess);
    },
    async searchBook(title: string, filters: { releaseStatus: string, genre: string, year: string, tracking_status: string, userId: string }, onSuccess?: (responseData: unknown) => void) {
      const params: any = {};
      if (title.length > 0) {
        params.query = title;
      }
      // TODO map and filter instead
      if (filters.releaseStatus && filters.releaseStatus != "Any") {
        params.releaseStatus = filters.releaseStatus;
      }
      if (filters.genre && filters.genre != "Any") {
        params.genre = filters.genre;
      }
      if (filters.year && filters.year != "Any") {
        params.year = filters.year;
      }
      if (filters.tracking_status && filters.tracking_status != "Any") {
        params.tracking_status = filters.tracking_status;
      }
      if (filters.userId && filters.userId != "Any") {
        params.user_id = filters.userId;
      }
      return getCall("search_book", params, onSuccess);
    },
    async getBook(book_id: string, onSuccess?: (responseData: unknown) => void) {
      return getCall("get_book", { id: book_id }, onSuccess).then(data => data as GetBookResponse);
    },
    async getUserInfo(user_id: string, onSuccess?: (responseData: unknown) => void) {
      return getCall(`user/${user_id}/info`, {}, onSuccess).then(data => data as GetUserInfoResponse);
    },
    async getPendingBooks(onSuccess?: (responseData: unknown) => void) {
      return getCall("mod/get_pending_books", {}, onSuccess);
    },
    async getUserBookInfos(onSuccess?: (responseData: unknown) => void) {
      return getCall("me/get_book_infos", {}, onSuccess);
    },
    async getBookStatus(book_id: string, onSuccess?: (responseData: unknown) => void) {
      return getCall("me/get_book_status", { book_id }, onSuccess);
    },
    async logout(onSuccess?: (responseData: unknown) => void) {
      return getCall("me/logout", {}, onSuccess);
    },
  };
}