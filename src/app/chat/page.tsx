"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Chat() {
  const router = useRouter();
  return (
    <>
      <Container>안녕하세요</Container>
    </>
  );
}

const Container = styled.div`
  padding: 50px 110px;
`;
