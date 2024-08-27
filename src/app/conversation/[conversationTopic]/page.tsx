"use client";

import { findConversation } from "@/lib/model/conversations";
import ConversationView from "@/views/ConversationView";
import { Conversation } from "@/lib/model/db";
import { useEffect, useState } from "react";

export default function ConversationPage({
  params,
}: {
  params: { conversationTopic: string };
}) {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    async function loadConversation() {
      const data = await findConversation(params.conversationTopic);
      setConversation(data!);
    }

    loadConversation();
  }, [params.conversationTopic]);

  if (!conversation) {
    return <div>Loading...</div>; // 데이터를 로드하는 동안 표시할 내용
  }

  return <ConversationView conversation={conversation} />;
}
