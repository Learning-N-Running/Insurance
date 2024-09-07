import { Contract, parseUnits, Signer } from "ethers";
import { CLIENT_ADDRESS, contracts } from "../constants";

export const allowClaim = async (signer: Signer) => {
  const Vroombuddy = new Contract(
    contracts.Vroombuddy,
    ["function allowClaim(address user, uint256 amount) external"],
    signer
  );
  const tx = await Vroombuddy.allowClaim(CLIENT_ADDRESS, parseUnits("200", 6));
  const res = await tx.wait();
  return res;
};
