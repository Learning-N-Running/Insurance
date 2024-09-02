import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  createRef,
  useState,
} from "react";
import ChatButton from "../components/ChatButton";
import { useClient } from "@/lib/hooks/useClient";
import { Conversation } from "@/lib/model/db";
import { sendMessage } from "@/lib/model/messages";
import { ContentTypeText } from "@xmtp/xmtp-js";
import {
  Attachment,
  ContentTypeAttachment,
} from "@xmtp/content-type-remote-attachment";
import AttachmentPreviewView from "./AttachmentPreviewView";
import { MessageContent } from "./MessageCellView";
import { shortAddress } from "../util/shortAddress";
import { ContentTypeReply, Reply } from "@xmtp/content-type-reply";
import styled from "styled-components";
import Image from "next/image";

export default function MessageComposerView({
  conversation,
}: {
  conversation: Conversation;
}): ReactElement {
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | undefined>();
  const [textInput, setTextInput] = useState("");

  const fileField = createRef<HTMLInputElement>();
  const client = useClient()!;

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    (async () => {
      setLoading(true);

      // check for input
      if (textInput || attachment) {
        const finalContent = textInput || attachment;
        const finalContentType = textInput
          ? ContentTypeText
          : ContentTypeAttachment;
        // send regular message
        await sendMessage(client, conversation, finalContent, finalContentType);
      }

      // clear inputs
      setAttachment(undefined);
      setTextInput("");
      setLoading(false);
    })();
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }

    const arrayBuffer = await file.arrayBuffer();

    setAttachment({
      filename: file.name,
      mimeType: file.type,
      data: new Uint8Array(arrayBuffer),
    });

    window.scroll({ top: 10000, behavior: "smooth" });
  }

  return (
    <Container>
      <input
        ref={fileField}
        type="file"
        onChange={onChange}
        style={{ position: "absolute", marginLeft: "-10000px" }}
      />
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* {attachment && (
          <AttachmentPreviewView
            attachment={attachment}
            onDismiss={() => {
              setAttachment(undefined);
            }}
          />
        )} */}

        <Image
          src="/images/vb_conversation_plus.svg"
          alt="plus"
          width={32}
          height={32}
          onClick={() => fileField.current?.click()}
        />
        <input
          type="text"
          placeholder={
            attachment ? "Press Send to send attachment" : "Type your message"
          }
          name="text"
          autoComplete="off"
          disabled={!!attachment}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          style={{
            width: "637px",
            height: "44px",
            borderRadius: "100px",
            border: "1px solid #E8E8E8",
            padding: "0 16px 0 16px",
            fontSize: "14px",
            fontWeight: "400",
          }}
        />
        <button
          type="submit"
          style={{
            border: "none",
            backgroundColor: "transparent",
            width: "32px",
            height: "32px",
          }}
        >
          <Image
            src="/images/vb_conversation_send.svg"
            alt="conversation send"
            width={32}
            height={32}
          />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 84px;

  padding: 0 24px 0 24px;

  bottom: 0px;
  left: 0px;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
