import { contracts } from "@/lib/constants";
import { Contract, parseUnits, Signer } from "ethers";

export const approveToken = async (signer: Signer, amounts: number) => {
  const usdc = new Contract(
    contracts.USDC,
    [
      "function approve(address spender, uint256 value) external returns (bool)",
    ],
    signer
  );

  return usdc
    .approve(contracts.Vroombuddy, parseUnits(String(amounts), 6))
    .then((tx: any) => tx.wait())
    .catch(() => {});
};
