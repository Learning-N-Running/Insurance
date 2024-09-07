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
}

const INTRO_COMMAND = "/intro";
const ASK_WHERE_COMMAND = "/where";
const ASK_WHEN_COMMAND = "/when";
const ASK_PICTURE_COMMAND = "/pic";
const REVIEW_OMMAND = "/review";

const CommandToMsg: Record<string, string> = {
  [INTRO_COMMAND]:
    "Hello, this is Su Lee, your insurance advisor. Thank you for reaching out for assistance with your accident claim. To help process your claim effectively, please provide detailed information about the circumstances of the accident.",
  [ASK_WHERE_COMMAND]: "Where did the accident occur?",
  [ASK_WHEN_COMMAND]: "And when did this happen?",
  [ASK_PICTURE_COMMAND]:
    "Please upload photos of the damage and any documents.",
  [REVIEW_OMMAND]: `Let’s review the details you’ve provided:
* Location: Finland, near the North Pole
* Date and Time: August 29, 2024, 8 PM
* Incident Type: Scratched side of rental car
* Description: Scratched the car while parking on a snowy road due to misjudging the distance.
Does everything look correct?`,
};

export default function MessageCellView({
  message,
  readReceiptText,
}: MessageCellViewProps): ReactElement {
  if (message.senderAddress === ADMIN_ADDRESS) {
    if (message.content === ETHSIGN_COMMAND) {
      return <ETHSignView />;
    }
    if (message.content === CLAIM_COMMAND) {
      return <ClaimView />;
    }
    if (CommandToMsg[message.content]) {
      return (
        <AdminMsg>
          <p>{CommandToMsg[message.content]}</p>
        </AdminMsg>
      );
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
