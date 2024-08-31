"use client";

import styled from "styled-components";
import { Heading1 } from "@/styles/texts";

export default function Home() {
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
