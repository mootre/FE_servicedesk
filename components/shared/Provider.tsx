"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
//import {Provider} from "react-redux";

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
