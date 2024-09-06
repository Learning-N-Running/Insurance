import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  createRef,
  useState,
} from "react";
import { useClient } from "@/lib/hooks/useClient";
import { Conversation } from "@/lib/model/db";
import { sendMessage } from "@/lib/model/messages";
import { ContentTypeText } from "@xmtp/xmtp-js";
import {
  Attachment,
  ContentTypeAttachment,
} from "@xmtp/content-type-remote-attachment";
import Image from "next/image";
import { allowClaim } from "@/lib/contracts/allowClaim";
import { useGetSigner } from "@/lib/sign/useGetSigner";
import { ADMIN_ADDRESS } from "@/lib/constants";
import { CLAIM_COMMAND } from "./message-view/claim.view";

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
  const getSigner = useGetSigner();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (client.address === ADMIN_ADDRESS && textInput === CLAIM_COMMAND) {
      // sign contract
      try {
        await allowClaim(await getSigner());
      } catch (e) {
        console.error(e);
        return;
      }
    }

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
    <div className="bg-white px-4 pt-6 pb-8">
      <input
        ref={fileField}
        type="file"
        onChange={onChange}
        style={{ position: "absolute", marginLeft: "-10000px" }}
      />
      <form onSubmit={onSubmit} className="flex-1 flex items-center gap-3">
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
          className="h-11 rounded-full border border-[#E8E8E8] px-4 flex-1"
        />
        <button type="submit" className="w-8 h-8">
          <Image
            src="/images/vb_conversation_send.svg"
            alt="conversation send"
            width={32}
            height={32}
          />
        </button>
      </form>
    </div>
  );
}
