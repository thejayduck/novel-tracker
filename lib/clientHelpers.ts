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

export type GetBookResponse = IBook

export type GetUserInfoResponse = IUser

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
    async searchBook(title: string, onSuccess?: (responseData: unknown) => void) {
      return getCall("search_book", { query: title }, onSuccess);
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
    async logout(onSuccess?: (responseData: unknown) => void) {
      return getCall("me/logout", {}, onSuccess);
    },
  };
}