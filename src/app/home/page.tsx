"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getIsLoggedInState } from "@/redux/slice/authSlice";
import LoginButton from "@/components/common/LoginButton";
import { Body2Regular, Heading1, Heading2, Heading3 } from "@/styles/texts";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useSelector(getIsLoggedInState);
  return (
    <>
      <Container>
        <Name>Hi, Danny!</Name>
        <Heading1 style={{ margin: "6px 0 16px 0" }}>
          Safe travels ahead!
        </Heading1>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 12px 24px 0 24px;
`;

const Name = styled.div`
  font-family: Pretendard;
  font-size: 40px;
  font-weight: 700;
`;
