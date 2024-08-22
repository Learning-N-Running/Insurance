import { ReactElement, useEffect, useState } from "react";
import { useConversations } from "@/lib/hooks/useConversations";
import { useClient } from "@/lib/hooks/useClient";
import Link from "next/link";
import { useLatestMessages } from "@/lib/hooks/useLatestMessages";
import ConversationCellView from "./ConversationCellView";

export default function ConversationListView(): ReactElement {
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(false);

  const client = useClient();
  const conversations = useConversations(client);
  const latestMessages = useLatestMessages(conversations);

  // `window` 객체는 클라이언트에서만 접근 가능하므로, `useEffect` 안에서 초기화
  useEffect(() => {
    const savedReadReceiptsEnabled =
      window.localStorage.getItem("readReceiptsEnabled") === "true";
    setReadReceiptsEnabled(savedReadReceiptsEnabled);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "readReceiptsEnabled",
      String(readReceiptsEnabled)
    );
  }, [readReceiptsEnabled]);

  return (
    <div>
      <button
        onClick={() => setReadReceiptsEnabled(!readReceiptsEnabled)}
        id={`read-receipt-${readReceiptsEnabled}`}
        style={{ fontSize: "15px" }}
      >
        {readReceiptsEnabled ? "Disable read receipts" : "Enable read receipts"}
      </button>
      <div
        style={{
          padding: "10px",
          border: "2px solid gray",
          margin: "10px 0 0 0 ",
        }}
      >
        {conversations?.length == 0 && <p>No conversations yet.</p>}
        {conversations
          ? conversations.map((conversation, i) => (
              <Link
                href={`/conversation/${conversation.topic}`}
                key={conversation.topic}
              >
                <ConversationCellView
                  conversation={conversation}
                  latestMessage={latestMessages[i]}
                />
              </Link>
            ))
          : "Could not load conversations"}
      </div>
    </div>
  );
}
