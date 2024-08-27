import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
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

const LoginButton = () => {
  const dispatch = useDispatch();
  const web3auth = useWeb3Auth();
  const setClient = useSetClient();

  useEffect(() => {
    async function initialize() {
      await web3auth!.web3auth!.initModal();
    }
    initialize();
  }, []);

  return (
    <GreenButton
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
      }}
      style={{ marginLeft: "28px" }}
    >
      로그인
    </GreenButton>
  );
};

export default LoginButton;

const GreenButton = styled.button`
  height: 48px;
  padding: 0 22px 0 22px;

  background-color: #b2e898;
  color: #108168;

  font-weight: 700;
  font-size: 18px;
  font-family: Pretendard;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #94d382;
  }
`;
