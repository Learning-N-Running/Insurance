import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_USER_LOGIN } from "@/redux/slice/authSlice";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useSetClient } from "@/lib/hooks/useClient";
import { Client } from "@xmtp/xmtp-js";
import { LongBlueButton } from "../base/LongBlueButton";
import { useRouter } from "next/navigation";
import { useGetSigner } from "@/lib/sign/useGetSigner";
import { AlchemyProvider, ethers } from "ethers";

const LoginButton = () => {
  const dispatch = useDispatch();
  const web3auth = useWeb3Auth();
  const getSigner = useGetSigner();
  const setClient = useSetClient();
  const router = useRouter();

  useEffect(() => {
    async function initialize() {
      await web3auth!.web3auth!.initModal();
    }
    initialize();
  }, []);

  const onLogin = async () => {
    await web3auth!.web3auth!.connect();

    const userInfo = await web3auth!.web3auth!.getUserInfo();
    const signer = await getSigner();
    const address = await signer.getAddress();

    const client = await Client.create(signer, {
      // env: "dev",
      persistConversations: true,
    });

    // admin용
    const providerAdmin = new AlchemyProvider(
      "matic-amoy",
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    );
    const signerAdmin = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
      process.env.NEXT_PUBLIC_PRIVATE_KEY!,
      providerAdmin
    );

    const clientAdmin = await Client.create(signerAdmin, {
      env: "dev",
    });

    // 여기서 client/cliendAdmin 바꾸면 됨
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
  };

  return <LongBlueButton onClick={onLogin}>Create Your Account</LongBlueButton>;
};

export default LoginButton;
