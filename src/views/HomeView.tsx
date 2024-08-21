import { ReactElement, useState } from "react";
import ConversationListView from "./ConversationListView";
import Link from "next/link";
import { useClient, useSetClient } from "@/lib/hooks/useClient";
import { shortAddress } from "@/util/shortAddress";

export default function HomeView(): ReactElement {
  const client = useClient()!;
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(client.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  // const { disconnectAsync } = useDisconnect();
  // const setClient = useSetClient();
  // async function logout() {
  //   await disconnectAsync();
  //   indexedDB.deleteDatabase("DB");
  //   localStorage.removeItem("_insecurePrivateKey");
  //   setClient(null);
  // }

  return (
    <div className="p-4 pt-14">
      <div>
        <div className="flex justify-between">
          <div>
            Hi {shortAddress(client.address)}{" "}
            <button className="text-xs text-zinc-600" onClick={copy}>
              {copied ? "Copied Address!" : "Copy Address"}
            </button>
          </div>
          <div>
            <button onClick={() => {}}>Logout</button>
          </div>
        </div>
      </div>
      <small className="flex justify-between">
        <span>Here are your conversations:</span>
        <Link href="/new" className="text-blue-700">
          Make a new one
        </Link>
      </small>
      <ConversationListView />
    </div>
  );
}
