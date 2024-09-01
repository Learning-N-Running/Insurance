import { ReactElement, useEffect, useState } from "react";
import { Conversation, Message } from "@/lib/model/db";
import { useMessages } from "@/lib/hooks/useMessages";
import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./MessageCellView";
import Link from "next/link";
import ChatHeader from "../components/ChatHeader";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useLiveConversation } from "@/lib/hooks/useLiveConversation";
import ConversationSettingsView from "./ConversationSettingsView";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { useReadReceipts } from "@/lib/hooks/useReadReceipts";
import Image from "next/image";
import { styled } from "styled-components";

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }
  return true;
};

export default function ConversationView({
  conversation,
}: {
  conversation: Conversation;
}): ReactElement {
  const liveConversation = useLiveConversation(conversation);

  const messages = useMessages(conversation);

  const showReadReceipt = useReadReceipts(conversation);

  const [isShowingSettings, setIsShowingSettings] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 100000, behavior: "smooth" });
    }
  }, [messages?.length]);

  return (
    <Container>
      <div>
        {messages?.length === 0 && <p>No messages yet.</p>}
        {messages ? (
          messages.reduce((acc: ReactElement[], message: Message, index) => {
            const showRead = showReadReceipt && index === messages.length - 1;
            if (appearsInMessageList(message)) {
              acc.push(
                <MessageCellView
                  key={message.id}
                  message={message}
                  readReceiptText={showRead ? "Read" : undefined}
                />
              );
            }
            return acc;
          }, [] as ReactElement[])
        ) : (
          <span>Could not load messages</span>
        )}
      </div>
      <MessageComposerView conversation={conversation} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 17px 24px 80px 24px;
  position: relative;
`;
