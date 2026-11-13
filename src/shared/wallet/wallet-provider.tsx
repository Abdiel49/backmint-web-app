"use client";

import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";
import { type ReactNode, useMemo } from "react";
import { nearWalletConfig } from "./config";

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const config = useMemo(() => nearWalletConfig, []);

  return <WalletSelectorProvider config={config}>{children}</WalletSelectorProvider>;
}
