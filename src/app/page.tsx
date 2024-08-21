"use client";

import InstructionTitle from "@/components/common/InstructionTitle";
import SlideBanner from "@/components/banner/SlideBanner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useSetClient } from "@/lib/hooks/useClient";
import { useEffect } from "react";
import Web3 from "web3";
import { AlchemyProvider, ethers } from "ethers";
import { Client } from "@xmtp/xmtp-js";

export default function Home() {
  const router = useRouter();

  const web3auth = useWeb3Auth();
  const setClient = useSetClient();

  async function setClientForChat() {
    try {
      const web3authProvider = await web3auth!.web3auth!.connect();
      const web3 = new Web3(web3authProvider!);
      const provider = new AlchemyProvider(
        "matic-amoy",
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      );

      const privateKey = await web3authProvider!.request({
        method: "private_key",
      });
      console.log(privateKey);

      const signer = new ethers.Wallet(privateKey as string, provider);

      const client = await Client.create(signer, {
        env: "dev",
      });
      setClient(client);
      console.log(client);
    } catch (error) {
      console.error("Error setting up client:", error);
    }
  }

  useEffect(() => {
    if (web3auth) {
      setClientForChat();
    }
  }, [web3auth]);

  return (
    <>
      <SlideBanner>
        <img
          src="/images/banners/배너1.png"
          alt="Banner 1"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <img
          src="/images/banners/배너2.png"
          alt="Banner 2"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SlideBanner>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <InstructionTitle
            isIcon={true}
            title={"환생클럽 전용 NFT를 받아보세요!"}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "54px",
          }}
        >
          <BlockContainer>
            <IssueBlock onClick={() => router.push("/activities")}>
              <IssueImage
                src="/images/issue-button/활동별NFT발급받기이미지.png"
                alt="activity NFT issue button"
                fill
                style={{ objectFit: "cover" }}
              />
              <IssueBlockText style={{ color: "#0AA98D" }}>
                활동별
                <br />
                NFT 발급받기
              </IssueBlockText>
            </IssueBlock>
            <IssueBlock onClick={() => router.push("/certificate")}>
              <IssueImage
                src="/images/issue-button/환생클럽수료증발급받기_이미지 .png"
                alt="certificate NFT issue button"
                fill
                style={{ objectFit: "cover" }}
              />
              <IssueBlockText style={{ color: "#B2E898" }}>
                환생클럽
                <br />
                수료증 발급받기
              </IssueBlockText>
            </IssueBlock>
          </BlockContainer>
        </div>
      </Container>
    </>
  );
}

const BannerMessage = styled.div`
  width: 100%;
  background-color: #0aa98d;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 42px;
  font-weight: 700;
  line-height: 130%;
`;

const Container = styled.div`
  padding: 50px 110px;
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 944px;
`;

const IssueBlock = styled.div`
  position: relative;
  overflow: hidden;

  width: 365px;
  height: 365px;

  border-radius: 39px;
`;

const IssueImage = styled(Image)`
  &:hover {
    filter: brightness(90%);
    transition: filter 0.01s ease-in-out;
  }
  cursor: pointer;
`;

const IssueBlockText = styled.div`
  position: absolute;

  font-weight: 700;
  font-size: 32px;

  left: 40px;
  bottom: 40px;
  z-index: 2;
`;
