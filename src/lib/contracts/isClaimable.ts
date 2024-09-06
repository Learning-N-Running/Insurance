import { Contract, JsonRpcProvider } from "ethers";
import { CLIENT_ADDRESS, contracts } from "../constants";

export const isClaimable = async () => {
  const Vroombuddy = new Contract(
    contracts.Vroombuddy,
    ["function isClaimable(address user) public view returns (bool)"],
    new JsonRpcProvider(contracts.config.rpcTarget)
  );

  return Vroombuddy.isClaimable(CLIENT_ADDRESS);
};
