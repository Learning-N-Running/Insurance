import { contracts } from "@/lib/constants";
import { Contract, Signer } from "ethers";

enum InsuranceType {
  None = 0,
  Standard = 1,
  Premium = 2,
  FullCover = 3,
}

export const joinInsurance = async (signer: Signer) => {
  const Vroombuddy = new Contract(
    contracts.Vroombuddy,
    ["function joinInsurance(uint8 insuranceType) external"],
    signer
  );

  return Vroombuddy.joinInsurance(InsuranceType.Premium).then((tx: any) =>
    tx.wait()
  );
};
