import { ReactElement, useState } from "react";
import ConversationListView from "./ConversationListView";
import Link from "next/link";
import { useClient, useSetClient } from "@/lib/hooks/useClient";
import { shortAddress } from "@/util/shortAddress";
import { useDispatch } from "react-redux";
import { SET_USER_LOGOUT } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function HomeView(): ReactElement {
  const client = useClient()!;
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
            <button style={{ marginLeft: "15px" }} onClick={copy}>
              {copied ? "Copied Address!" : "Copy Address"}
            </button>
            <button
              onClick={() => {
                dispatch(SET_USER_LOGOUT());
              }}
              style={{ marginLeft: "15px" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div style={{ margin: "20px 0 20px 0", fontSize: "20px" }}>
        <span>Here are your conversations:</span>
        <button
          style={{ margin: "0 0 0 10px", fontSize: "20px" }}
          onClick={() => router.push("/new")}
        >
          Make a new one
        </button>
      </div>
      <ConversationListView />
    </div>
  );
}
