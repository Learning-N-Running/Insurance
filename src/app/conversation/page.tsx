"use client";

import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useClient, useSetClient } from "@/lib/hooks/useClient";
import HomeView from "@/views/HomeView";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Conservation() {
  const client = useClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (client) {
      console.log("Client is set:", client);
      setLoading(false);
    }
  }, [client]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <Container>안녕하세요</Container>
      {client ? <HomeView /> : <p>로그인 하세유</p>}
    </>
  );
}

const Container = styled.div`
  padding: 50px 110px;
`;
