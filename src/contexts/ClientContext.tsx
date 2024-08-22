"use client";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import { createContext, useState, ReactElement, useEffect } from "react";
import {
  AttachmentCodec,
  RemoteAttachmentCodec,
} from "@xmtp/content-type-remote-attachment";
import { ReplyCodec } from "@xmtp/content-type-reply";
import { ReactionCodec } from "@xmtp/content-type-reaction";
import { ReadReceiptCodec } from "@xmtp/content-type-read-receipt";
import { useWeb3Auth } from "./Web3AuthContext";
import Web3 from "web3";

type ClientContextValue = {
  client: Client | null;
  setClient: (client: Client | null) => void;
};

export const ClientContext = createContext<ClientContextValue>({
  client: null,
  setClient: () => {
    return;
  },
});

export default function ClientProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const web3auth = useWeb3Auth();

  useEffect(() => {
    (async () => {
      setIsLoading(false);
      if (web3auth?.web3auth) {
        const web3authProvider = await web3auth!.web3auth!.connect();
        const web3 = new Web3(web3authProvider!);
        const privateKey = await web3auth!.web3auth!.provider!.request({
          method: "private_key",
        });

        // if (!privateKey) {
        //   setIsLoading(false);
        //   return;
        // }

        const wallet = new Wallet(privateKey as string);
        const client = await Client.create(wallet, {
          env: "dev",
        });

        client.registerCodec(new AttachmentCodec());
        client.registerCodec(new RemoteAttachmentCodec());
        client.registerCodec(new ReplyCodec());
        client.registerCodec(new ReactionCodec());
        client.registerCodec(new ReadReceiptCodec());

        setClient(client);
        setIsLoading(false);
      }
    })();
  }, []);

  const clientContextValue = {
    client,
    setClient,
  };

  return (
    <ClientContext.Provider value={clientContextValue}>
      {isLoading ? (
        <div className="w-full p-4 m-auto">Loading client....</div>
      ) : (
        children
      )}
    </ClientContext.Provider>
  );
}
