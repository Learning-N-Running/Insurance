import { ReactElement } from "react";
import { Conversation, Message } from "@/lib/model/db";
import { shortAddress } from "../util/shortAddress";
import ReactTimeAgo from "react-time-ago";
import { MessageContent } from "./MessageCellView";

export default function ConversationCellView({
  conversation,
  latestMessage,
}: {
  conversation: Conversation;
  latestMessage: Message | undefined;
}): ReactElement {
  return (
    <div
      style={{
        padding: "10px 0",
        margin: "5px 0",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "hover",
      }}
    >
      <div>
        <div>
          <span>
            {conversation.title || shortAddress(conversation.peerAddress)}
          </span>{" "}
        </div>
        <div>{conversation.updatedAt.toString()}</div>
      </div>
      {latestMessage ? (
        <div className="block text-zinc-500">
          <MessageContent message={latestMessage} />
        </div>
      ) : (
        <div className="block text-zinc-500">No messages yet.</div>
      )}
    </div>
  );
}
