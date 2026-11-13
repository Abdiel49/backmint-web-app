import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import type { WalletSelectorParams } from "@near-wallet-selector/core";

const network = process.env.NEXT_PUBLIC_NEAR_NETWORK === "mainnet" ? "mainnet" : "testnet";

export const nearWalletConfig: WalletSelectorParams = {
  modules: [setupMyNearWallet()],
  network,
};

export const nearContractId = process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID;
