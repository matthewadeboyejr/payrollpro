"use client";

import React from "react";

import UsersTable from "../tables/UsersTable";

const Users = () => {
  return (
    <main className="w-full">
      <section className="w-full mt-5">
        <UsersTable />
      </section>
    </main>
  );
};

export default Users;
