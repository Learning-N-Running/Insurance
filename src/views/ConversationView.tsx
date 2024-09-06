import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./message-view";
import { ReactElement, useEffect, useRef } from "react";
import { Conversation, Message } from "@/lib/model/db";
import { useMessages } from "@/lib/hooks/useMessages";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { useReadReceipts } from "@/lib/hooks/useReadReceipts";
import { ADMIN_ADDRESS } from "@/lib/constants";
import { CLAIM_COMMAND } from "./message-view/claim.view";

const appearsInMessageList = (message: Message): boolean => {
  return !ContentTypeReaction.sameAs(message.contentType as ContentTypeId);
};

interface ConversationViewProps {
  conversation: Conversation;
}

export default function ConversationView({
  conversation,
}: ConversationViewProps) {
  const messages = useMessages(conversation);

  const showReadReceipt = useReadReceipts(conversation);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight + 3200,
        behavior: "smooth",
      });
    }
  }, [messages?.length]);

  const isSigned = Boolean(
    messages?.find(
      (m) => m.senderAddress === ADMIN_ADDRESS && m.content === CLAIM_COMMAND
    )
  );

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-scroll py-4 px-6 " ref={scrollRef}>
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
                  isSigned={isSigned}
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
    </div>
  );
}
