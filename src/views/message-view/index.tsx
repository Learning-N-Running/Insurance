import ReadReceiptView from "../ReadReceiptView";
import { ReactElement } from "react";
import { Message } from "@/lib/model/db";
import { ADMIN_ADDRESS } from "@/lib/constants";
import { AdminMsg, CustomerMsg } from "./Container";
import { MessageContent } from "./Contents";
import { ETHSIGN_COMMAND, ETHSignView } from "./eth-sign.view";
import { CLAIM_COMMAND, ClaimView } from "./claim.view";

interface MessageCellViewProps {
  message: Message;
  readReceiptText: string | undefined;
  isSigned: boolean;
}
export default function MessageCellView({
  message,
  readReceiptText,
  isSigned,
}: MessageCellViewProps): ReactElement {
  if (message.senderAddress === ADMIN_ADDRESS) {
    if (message.content === ETHSIGN_COMMAND) {
      return <ETHSignView isSigned={isSigned} />;
    }
    if (message.content === CLAIM_COMMAND) {
      return <ClaimView />;
    }

    return (
      <AdminMsg>
        <MessageContent message={message} />
        <ReadReceiptView readReceiptText={readReceiptText} />
      </AdminMsg>
    );
  } else
    return (
      <CustomerMsg>
        <MessageContent message={message} />
        <ReadReceiptView readReceiptText={readReceiptText} />
      </CustomerMsg>
    );
}
