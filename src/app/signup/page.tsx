"use client";

import Step_1_1 from "./Step_1_1";
import Step_1_2 from "./Step_1_2";
import Step_2_1 from "./Step_2_1";
import Step_2_2 from "./Step_2_2";
import Step_2_3 from "./Step_2_3";
import Step_3 from "./Step_3";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { LongBlueButton } from "@/components/base/LongBlueButton";
import { useRouter } from "next/navigation";
import { signContract } from "@/lib/sign/sign-contract";
import { useGetSigner } from "@/lib/sign/useGetSigner";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import Modal from "@/components/common/Modal";
import { approveToken } from "../../lib/contracts/approveToken";
import { joinInsurance } from "../../lib/contracts/joinInsurance";

export default function Signup() {
  const [step, setStep] = useState("1.1");
  const getSigner = useGetSigner();
  const router = useRouter();
  const web3auth = useWeb3Auth();
  const isLoggedIn = web3auth?.web3auth?.connected;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  function goNext() {
    if (step === "1.1") {
      setStep("1.2");
    } else if (step === "2.1") {
      setStep("2.2");
    } else if (step === "2.2") {
      setStep("2.3");
    } else if (step === "2.3") {
      setStep("3");
    }
  }

  /**
   * Done Sign Contract
   * 1. Sign on Metamask -> 2. Open Token Approval Modal -> 3. Open Done Modal
   */

  const [isTokenApprovalModalOpen, setIsTokenApprovalModalOpen] =
    useState(false);
  const onSignContract = async () => {
    const signer = await getSigner();
    await joinInsurance(signer);
    // await signContract(
    //   signer,
    //   "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08", // TODO: Insurer wallet address
    //   "Premium"
    // );
    setIsTokenApprovalModalOpen(true);
  };

  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const onTokenApproval = async () => {
    const signer = await getSigner();
    await approveToken(signer, 100 * 3); // 100 USDC * 3 months
    setIsTokenApprovalModalOpen(false);
    setIsDoneModalOpen(true);
  };

  const onCloseDoneModal = () => {
    setIsDoneModalOpen(false);
    router.push("/home");
  };

  return (
    <>
      <Container>
        {step === "1.1" && <Step_1_1 />}
        {step === "1.2" && <Step_1_2 onClick={() => setStep("2.1")} />}
        {step === "2.1" && <Step_2_1 />}
        {step === "2.2" && <Step_2_2 />}
        {step === "2.3" && <Step_2_3 />}
        {step === "3" && <Step_3 />}
        {step !== "1.2" && step !== "3" && (
          <LongBlueButton onClick={() => goNext()}>Next</LongBlueButton>
        )}
        {step === "3" && (
          <>
          <div className="flex gap-2 mb-4">
            <input type="checkbox" className="border rounded-sm w-6" />
            <p>
              I have read and agree to the agreement of the insurance contract.
            </p>
          </div>
            <LongBlueButton onClick={onSignContract}>
              Join Insurance
            </LongBlueButton>
          </>
        )}

        <Modal
          onClose={() => setIsTokenApprovalModalOpen(false)}
          isOpen={isTokenApprovalModalOpen}
        >
          <ModalContainer>
            <img
              width={64}
              src="https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png"
            />
            <p className="text-xl mt-5 mb-1 text-center">
              Approve 3 months' insurance premium.
            </p>
            <p className="text-center mb-4 text-md text-neutral-500">
              "To enable automatic insurance payments, we need your approval for
              the USDC token.{" "}
            </p>
            <LongBlueButton onClick={onTokenApproval}>
              Approve 300 USDC
            </LongBlueButton>
          </ModalContainer>
        </Modal>

        <Modal onClose={onCloseDoneModal} isOpen={isDoneModalOpen}>
          <ModalContainer>
            <img width={136} src="/images/vb_you_covered.png" />
            <h1>{"You've Covered!"}</h1>
            <h3>Start your safe journey now.</h3>
            <LongBlueButton onClick={onCloseDoneModal}>
              Go to Homepage
            </LongBlueButton>
          </ModalContainer>
        </Modal>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 24px 105px 24px; /* 아래쪽에 105px 패딩 추가 */
  overflow: auto; /* 부모 요소가 스크롤을 허용하도록 설정 */
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  & > h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-top: 16px;
    margin-bottom: 4px;
  }
  & > h3 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 24px;
  }
`;
