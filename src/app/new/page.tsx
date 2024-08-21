"use client";

import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useClient, useSetClient } from "@/lib/hooks/useClient";
import HomeView from "@/views/HomeView";
import NewConversationView from "@/views/NewConversationView";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function NewConversation() {
  return (
    <>
      <NewConversationView />
    </>
  );
}
