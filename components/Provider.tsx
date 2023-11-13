"use client";
import { SessionProvider } from "next-auth/react";
import { ISessionProviderProps } from "@/types/types";

const Provider = ({ children, session }: ISessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
