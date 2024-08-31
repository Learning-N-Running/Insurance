"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

type Web3AuthContextType = {
  web3auth: Web3Auth | null;
};

const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const Web3AuthProvider = ({ children }: { children: any }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const Web3AuthOptions: Web3AuthOptions = {
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!, // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // import {WEB3AUTH_NETWORK} from "@web3auth/base";
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x128",
      rpcTarget: "https://testnet.hashio.io/api",
      displayName: "Hedera Testnet",
    },
    uiConfig: {
      appName: "Vroombuddy",
      mode: "auto", // light, dark or auto
      loginMethodsOrder: ["google", "facebook", "reddit", "discord"],
      logoLight: "https://web3auth.io/images/web3authlog.png", //로고 사진
      logoDark: "https://web3auth.io/images/web3authlog.png",
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
    <Web3AuthContext.Provider value={{ web3auth }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => useContext(Web3AuthContext);
