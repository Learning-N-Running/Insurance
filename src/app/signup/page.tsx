"use client";

import { Heading1 } from "@/styles/texts";
import { useState } from "react";
import { styled } from "styled-components";

export default function Signup() {
  const [step, setStep] = useState(1);
  return (
    <>
      <Container>
        <First />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 103px 24px 0 24px;
`;

function First() {
  return (
    <Heading1>
      Please provide
      <br />
      the information of the insured
    </Heading1>
  );
}
