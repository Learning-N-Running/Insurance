import { ReactElement, useEffect, useRef, useState } from "react";
import { Conversation, Message } from "@/lib/model/db";
import { useMessages } from "@/lib/hooks/useMessages";
import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./MessageCellView";
import { useLiveConversation } from "@/lib/hooks/useLiveConversation";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { useReadReceipts } from "@/lib/hooks/useReadReceipts";
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

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 80, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages?.length]);

  return (
    <Container ref={scrollRef}>
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
  overflow-y: auto;
`;
