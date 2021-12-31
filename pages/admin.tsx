// @ts-nocheck
import styles from "styles/ModPanel.module.scss";

import React, { useEffect, useState } from "react";

import { useAlert } from "components/alertWrapper";
import PageBase from "components/pageBase";

import { useApi } from "lib/clientHelpers";
import { serverSide_checkAuth } from "lib/serverHelpers";

import convertDate from "../components/helper/convertDate";
import SubmissionItem from "../components/pageComponents/submissionItem";

export async function getServerSideProps(context) {
  const [auth, info] = await serverSide_checkAuth(context, true, true, true);
  return auth || {
    props: {
      user_info: info
    },
  };
}


export default function AdminPanel({ user_info }) {
  const alert = useAlert();
  const api = useApi();

  const [users, setUsers] = useState([]);

  useEffect(async () => {
    setUsers(await api.listUsers());
  });

  return (
    <PageBase user_info={user_info}>
      <div className={"flex flexRow"}>
        {users.map(user => (
          <div key={user.id}>
            <p>Username: {user.username}</p>
            <p>Created at: {convertDate(user.createdAt)}</p>
            <p>Last updated: {convertDate(user.updatedAt)}</p>
          </div>
        ))}
      </div>
    </PageBase>
  );
}