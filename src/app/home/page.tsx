"use client";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { getIsLoggedInState } from "@/redux/slice/authSlice";
import Image from "next/image";
import { Heading1 } from "@/styles/texts";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useSelector(getIsLoggedInState);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <Container>
        <Name>Hi, Danny!</Name>
        <Heading1 style={{ margin: "6px 24px 0 24px", fontWeight: "400" }}>
          Ready to make safe journey?
        </Heading1>
        {isClicked ? (
          <Image
            src="/images/vb_home_after_add.png"
            alt={"vehicle"}
            width={768}
            height={502}
            style={{ cursor: "pointer" }}
            onClick={() => setIsClicked(false)}
          />
        ) : (
          <Image
            src="/images/vb_home_before_add.png"
            alt={"vehicle"}
            width={768}
            height={502}
            style={{ cursor: "pointer" }}
            onClick={() => setIsClicked(true)}
          />
        )}

        <Image
          src="/images/vb_home_buttons.png"
          alt={"buttons"}
          width={768}
          height={282}
          style={{ marginTop: "-48px", cursor: "pointer" }}
          onClick={() => router.push("/conversation")}
        />
        <Image
          src="/images/vb_home_emergency.png"
          alt={"emergency"}
          width={768}
          height={137}
          style={{ marginTop: "-40px", cursor: "pointer" }}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 12px 0 0 0;
`;

const Name = styled.div`
  padding: 0 24px 0 24px;
  font-family: Pretendard;
  font-size: 40px;
  font-weight: 700;
`;

const WrapperTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
