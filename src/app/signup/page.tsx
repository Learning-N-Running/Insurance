"use client";

import { Heading1 } from "@/styles/texts";
import { useState } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import TextInput from "@/components/base/TextInput";
import ToggleSwitch from "@/components/base/ToggleSwitch";
import { LongBlueButton } from "@/components/base/LongBlueButton";
import Step_1_1 from "./Step_1_1";
import Step_1_2 from "./Step_1_2";
import Step_2_1 from "./Step_2_1";
import Step_2_2 from "./Step_2_2";
import Step_2_3 from "./Step_2_3";
import Step_3 from "./Step_3";

export default function Signup() {
  const [step, setStep] = useState("1.1");

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
  return (
    <>
      <Container>
        {step === "1.1" && <Step_1_1 />}
        {step === "1.2" && <Step_1_2 onClick={() => setStep("2.1")} />}
        {step === "2.1" && <Step_2_1 />}
        {step === "2.2" && <Step_2_2 />}
        {step === "2.3" && <Step_2_3 />}
        {step === "3" && <Step_3 />}
        {step !== "1.2" && (
          <LongBlueButton onClick={() => goNext()}>Next</LongBlueButton>
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
