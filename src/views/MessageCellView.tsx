import { ReactElement } from "react";
import { Message, MessageAttachment } from "@/lib/model/db";
import { useAttachment } from "@/lib/hooks/useAttachment";
import { shortAddress } from "../util/shortAddress";
import { ContentTypeId, ContentTypeText } from "@xmtp/xmtp-js";
import {
  ContentTypeAttachment,
  ContentTypeRemoteAttachment,
} from "@xmtp/content-type-remote-attachment";
import { ContentTypeReply, Reply } from "@xmtp/content-type-reply";
import MessageRepliesView from "./MessageRepliesView";
import ReactionsView from "./ReactionsView";
import ReadReceiptView from "./ReadReceiptView";
import Image from "next/image";
import { iaAddress } from "@/lib/constants";
import { styled } from "styled-components";
import { Body1Regular } from "@/styles/texts";
import colors from "@/styles/color";

function ImageAttachmentContent({
  attachment,
}: {
  attachment: MessageAttachment;
}): ReactElement {
  const objectURL = URL.createObjectURL(
    new Blob([Buffer.from(attachment.data)], {
      type: attachment.mimeType,
    })
  );

  return (
    <img
      onLoad={() => {
        window.scroll({ top: 10000, behavior: "smooth" });
      }}
      className="rounded w-48"
      src={objectURL}
      title={attachment.filename}
    />
  );
}

function AttachmentContent({ message }: { message: Message }): ReactElement {
  const attachment = useAttachment(message);

  if (!attachment) {
    return <span className="text-zinc-500">Loading attachment…</span>;
  }

  if (attachment.mimeType.startsWith("image/")) {
    return <ImageAttachmentContent attachment={attachment} />;
  }

  return (
    <span>
      {attachment.mimeType} {attachment.filename || "no filename?"}
    </span>
  );
}

export function Content({
  content,
  contentType,
}: {
  content: any;
  contentType: ContentTypeId;
}): ReactElement {
  if (ContentTypeText.sameAs(contentType)) {
    return <Body1Regular>{content}</Body1Regular>;
  }

  if (ContentTypeReply.sameAs(contentType)) {
    const reply: Reply = content;
    return <Content content={reply.content} contentType={reply.contentType} />;
  }

  return (
    <span className="text-zinc-500 break-all">
      Unknown content: {JSON.stringify(content)}
    </span>
  );
}

export function MessageContent({
  message,
}: {
  message: Message;
}): ReactElement {
  if (
    ContentTypeAttachment.sameAs(message.contentType as ContentTypeId) ||
    ContentTypeRemoteAttachment.sameAs(message.contentType as ContentTypeId)
  ) {
    return <AttachmentContent message={message} />;
  }

  return (
    <Content
      content={message.content}
      contentType={message.contentType as ContentTypeId}
    />
  );
}

export default function MessageCellView({
  message,
  readReceiptText,
}: {
  message: Message;
  readReceiptText: string | undefined;
}): ReactElement {
  return message.senderAddress === iaAddress ? (
    <AdminWrapper>
      <Image
        src="/images/vb_ia_profile.svg"
        alt={"insurance advisor profile"}
        width={194}
        height={44}
      />
      <AdminMessage>
        <MessageContent message={message} />
        <ReadReceiptView readReceiptText={readReceiptText} />
      </AdminMessage>
    </AdminWrapper>
  ) : (
    <CustomerWrapper>
      <CustomMessage>
        <MessageContent message={message} />
        <ReadReceiptView readReceiptText={readReceiptText} />
      </CustomMessage>
    </CustomerWrapper>
  );
}

const AdminWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const AdminMessage = styled.div`
  padding: 10px 16px;
  width: fit-content;
  max-width: 371px;
  background-color: rgba(0, 122, 255, 0.08);
  border-radius: 0px 16px 16px 16px;
  margin-top: 12px;
`;

const CustomerWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CustomMessage = styled.div`
  padding: 10px 16px;
  width: fit-content;
  max-width: 371px;
  background-color: ${colors.grey1};
  border-radius: 0px 16px 16px 16px;
  margin-top: 12px;
`;
