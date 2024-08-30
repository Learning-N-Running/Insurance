import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";
import Web3, { Contract } from "web3";
import { useDispatch } from "react-redux";
import { SET_USER_LOGIN } from "@/redux/slice/authSlice";
import { AlchemyProvider, ethers } from "ethers";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { styled } from "styled-components";
import { useSetClient } from "@/lib/hooks/useClient";
import { Client } from "@xmtp/xmtp-js";
import colors from "@/styles/color";
import { LongBlueButton } from "../base/LongBlueButton";
import { useRouter } from "next/navigation";
import { WALLET_ADAPTER_TYPE } from "@web3auth/base";

const LoginButton = () => {
  const dispatch = useDispatch();
  const web3auth = useWeb3Auth();
  const setClient = useSetClient();
  const router = useRouter();

  useEffect(() => {
    async function initialize() {
      await web3auth!.web3auth!.initModal();
    }
    initialize();
  }, []);

  return (
    <LongBlueButton
      onClick={async () => {
        const web3authProvider = await web3auth!.web3auth!.connect();
        const web3 = new Web3(web3authProvider!);

        const ethersProvider = new ethers.BrowserProvider(web3authProvider!);

        const userInfo = await web3auth!.web3auth!.getUserInfo();
        console.log(userInfo);

        const address = (await web3!.eth.getAccounts())[0];
        console.log(address);

        const signer = await ethersProvider.getSigner();

        const client = await Client.create(signer, {
          env: "dev",
        });
        setClient(client);

        dispatch(
          SET_USER_LOGIN({
            address: address,
            email: userInfo.email!,
            nickname: userInfo.name!,
            profileImage: userInfo.profileImage!,
          })
        );
        router.push("/signup");
      }}
    >
      Create Your Account
    </LongBlueButton>
  );
};

export default LoginButton;
