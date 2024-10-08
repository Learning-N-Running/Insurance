import { ReactElement, useState } from "react";
import { Message } from "@/lib/model/db";
import { useReplies } from "@/lib/hooks/useReplies";
import ReplyComposer from "./ReplyComposer";
import { MessageContent } from "./message-view";
import { shortAddress } from "../util/shortAddress";

export default function MessageRepliesView({
  message,
}: {
  message: Message;
}): ReactElement {
  const replies = useReplies(message);

  const [isShowingReplies, setIsShowingReplies] = useState(false);

  return isShowingReplies ? (
    <div className="py-2">
      {replies.length > 0 && (
        <div className="mb-2">
          {replies.map((message) => (
            <div className="flex text-xs space-x-1" key={message.xmtpID}>
              <span>{shortAddress(message.senderAddress)}:</span>
              <MessageContent message={message} />
            </div>
          ))}
        </div>
      )}

      <ReplyComposer
        inReplyToMessage={message}
        dismiss={() => setIsShowingReplies(false)}
      />
    </div>
  ) : (
    <div>
      <button
        className="text-blue-600 text-xs"
        onClick={() => setIsShowingReplies(true)}
      >
        {replies.length == 0
          ? "Reply"
          : `${replies.length} repl${replies.length == 1 ? "y" : "ies"}`}
      </button>
    </div>
  );
}
