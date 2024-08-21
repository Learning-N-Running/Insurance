import { FormEvent, ReactElement, createRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChatHeader from "../components/ChatHeader";
import ChatButton from "../components/ChatButton";
import { startConversation } from "@/lib/model/conversations";
import { useClient } from "@/lib/hooks/useClient";

export default function NewConversationView(): ReactElement {
  const client = useClient()!;

  // We're using an uncontrolled component here because we don't need to update
  // anything as the user is typing.
  //
  // See https://react.dev/learn/manipulating-the-dom-with-refs#best-practices-for-dom-manipulation-with-refs
  const addressInputRef = createRef<HTMLInputElement>();

  const [error, setError] = useState<string | undefined>();
  const [addresses, setAddresses] = useState<string[]>([]);

  const router = useRouter();

  function validateAddress(): string | undefined {
    const address = addressInputRef.current?.value || "";

    if (address.trim().length == 0) {
      addressInputRef.current?.classList.add("horizontal-shake");
      setTimeout(() => {
        addressInputRef.current?.classList.remove("horizontal-shake");
      }, 1000);

      addressInputRef.current?.focus();

      return;
    }

    return address;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const address = validateAddress();
    if (!address) return;

    try {
      const conversation = await startConversation(client, address);
      router.push(`/conversation/${conversation.topic}`);
    } catch (e) {
      setError(String(e));
    }
  }

  function onAdd() {
    const address = validateAddress();
    if (!address) {
      return;
    }

    setAddresses((addresses) => [address, ...addresses]);

    addressInputRef.current!.value = "";
    addressInputRef.current?.focus();
  }

  return (
    <div className="p-4 pt-14">
      <ChatHeader>
        <div className="flex justify-between">
          <h1>Make a new conversation</h1>
          <Link href="/">Go Back</Link>
        </div>
      </ChatHeader>
      <div>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-4 border rounded w-full md:w-1/2 mt-2">
              {error}
            </div>
          )}

          <label className="block">
            <span className="block text-xs my-2">
              Who {addresses.length > 0 && "else "}do you want to message with?
            </span>

            <input
              autoFocus
              ref={addressInputRef}
              type="text"
              className="border p-2 w-full md:w-1/2 rounded shadow-sm dark:bg-black"
              placeholder="Enter an address"
            ></input>
          </label>
          <label className="block space-x-4">
            <ChatButton type="submit">Start Conversation</ChatButton>
          </label>
        </form>
      </div>
    </div>
  );
}
