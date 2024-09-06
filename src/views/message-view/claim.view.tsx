import { AdminMsg } from "./Container";
import { useEffect, useState } from "react";
import { isClaimable } from "@/lib/contracts/isClaimable";
import { claimPayment } from "@/lib/contracts/claimPayment";
import { useGetSigner } from "@/lib/sign/useGetSigner";
import { contracts } from "@/lib/constants";

export const CLAIM_COMMAND = "/claim";
export const ClaimView = () => {
  const [claimable, setClaimable] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const getSigner = useGetSigner();
  useEffect(() => {
    isClaimable().then((res) => {
      setClaimable(res);
    });
  }, []);

  const onClaim = async () => {
    const signer = await getSigner();
    const hash = await claimPayment(signer);
    setClaimable(false);
    setTxHash(hash);
  };

  return (
    <>
      <AdminMsg>
        <p>
          Your insurance claim agreement has been signed. Please click the
          button below to receive your payment.
        </p>

        <button
          onClick={onClaim}
          disabled={!claimable}
          className="bg-primary disabled:bg-neutral-100 text-white disabled:text-neutral-500 rounded-xl py-3 text-lg mt-4 w-full flex items-center justify-center"
        >
          {claimable ? "Claim payment" : "Claimed"}
        </button>
      </AdminMsg>
      {txHash && (
        <AdminMsg>
          <p>Claim payment transaction submitted.</p>
          <a
            href={`${contracts.config.explorer}tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            View on Explorer 
          </a>
        </AdminMsg>
      )}
    </>
  );
};
