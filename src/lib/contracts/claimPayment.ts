import { Contract, Signer } from "ethers";
import { contracts } from "../constants";

export const claimPayment = async (signer: Signer): Promise<string> => {
  const Vroombuddy = new Contract(
    contracts.Vroombuddy,
    ["function claimInsurance() external"],
    signer
  );

  return Vroombuddy.claimInsurance().then(async (tx: any) => {
    const res = await tx.wait();
    return res.hash as string;
  });
};
