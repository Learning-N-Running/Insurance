import ConversationView from "./ConversationView";
import { useLoaderData } from "react-router-dom";
import { ReactElement } from "react";
import { Conversation } from "@/lib/model/db";

export default function ConversationViewWithLoader(): ReactElement {
  const { conversation } = useLoaderData() as { conversation: Conversation };

  return <ConversationView conversation={conversation} />;
}
