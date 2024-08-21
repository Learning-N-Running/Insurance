"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const Web3AuthContext = createContext<Web3Auth | null>(null);

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13882",
  rpcTarget: "https://polygon-amoy.drpc.org",
  displayName: "Polygon Amoy Testnet",
  blockExplorer: "https://amoy.polygonscan.com/",
  ticker: "MATIC",
  tickerName: "Polygon",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

export const Web3AuthProvider = ({ children }: { children: any }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const Web3AuthOptions: Web3AuthOptions = {
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!, // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // import {WEB3AUTH_NETWORK} from "@web3auth/base";
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x13882",
      // rpcTarget: process.env.NEXT_PUBLIC_RPC_URL,
      rpcTarget: "https://polygon-amoy.drpc.org",
      displayName: "Polygon Amoy Testnet",
    },
    uiConfig: {
      appName: "Rebirth Club",
      mode: "auto", // light, dark or auto
      loginMethodsOrder: ["google", "github", "twitter", "kakao"],
      logoLight: "https://web3auth.io/images/web3auth-logo.svg",
      logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      loginGridCol: 3,
      primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
      modalZIndex: "99998",
    },
  };
  const web3auth_ = new Web3Auth(Web3AuthOptions);

  useEffect(() => {
    setWeb3auth(web3auth_);
  }, []);

  return (
    <Web3AuthContext.Provider value={web3auth}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => useContext(Web3AuthContext);
