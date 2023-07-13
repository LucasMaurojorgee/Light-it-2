"use client";

import UserList from "./userList/page";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    </>
  );
}
