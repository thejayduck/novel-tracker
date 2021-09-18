// @ts-nocheck
import styles from "styles/PageBase.module.scss";

import { createContext, useContext } from "react";

import Footer from "./footer";
// Components
import Navigation from "./navigation";

const UserInfoContext = createContext();

export default function PageBase({ children, user_info }) {
  return (
    <UserInfoContext.Provider value={user_info}>
      <Navigation user_info={user_info} />
      <main className={styles.container}>
        {children}
      </main>
      <Footer />
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}