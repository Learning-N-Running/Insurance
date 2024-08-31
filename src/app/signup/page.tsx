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

export default function Signup() {
  const [step, setStep] = useState("1.1");
  const getSigner = useGetSigner();
  const router = useRouter();
  const web3auth = useWeb3Auth();
  const isLoggedIn = web3auth?.web3auth?.connected;

  useEffect(() => {
    if(!isLoggedIn) {
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

  const onSignContract = async () => {
    const signer = await getSigner();
    await signContract(
      signer,
      "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08", // TODO: Insurer wallet address
      "Premium"
    );
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
          <LongBlueButton onClick={onSignContract}>
            I agree with all of it.
          </LongBlueButton>
        )}
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
