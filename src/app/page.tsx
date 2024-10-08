"use client";

import Image from "next/image";
import styled from "styled-components";
import LoginButton from "@/components/common/LoginButton";
import { Body2Regular, Heading1, Heading2, Heading3 } from "@/styles/texts";

export default function HomeBeforeLogin() {
  return (
    <>
      <Container>
        <Image
          src="/images/vb_logo.png"
          width={112}
          height={112}
          alt="logo"
          className="mb-4"
        />
        <Name>Vroombuddy</Name>
        <Body2Regular className="mt-2 mb-10">
          Welcome to Vroombuddy! Enjoy safe and affordable insurance.
        </Body2Regular>
        <LoginButton />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 267px 24px 0 24px;
`;

const Name = styled.div`
  font-family: Poppins;
  line-height: auto;
  font-size: 32px;
  font-weight: 600;
`;
