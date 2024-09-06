import { Contract, parseUnits, Signer } from "ethers";
import { CLIENT_ADDRESS, contracts } from "../constants";

export const allowClaim = async (signer: Signer) => {
  const Vroombuddy = new Contract(
    contracts.Vroombuddy,
    ["function allowClaim(address user, uint256 amount) external"],
    signer
  );

  return Vroombuddy.allowClaim(CLIENT_ADDRESS, parseUnits("200", 6)).then(
    (tx: any) => tx.wait()
  );
};
