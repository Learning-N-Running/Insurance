import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { BrowserProvider } from "ethers";

export const useGetSigner = () => {
  const web3auth = useWeb3Auth();

  const getSigner = async () => {
    const web3authProvider = await web3auth!.web3auth!.connect();
    const ethersProvider = new BrowserProvider(web3authProvider!);
    return ethersProvider.getSigner();
  };

  return getSigner;
};
