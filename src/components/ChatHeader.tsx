import { PropsWithChildren, ReactElement } from "react";

export default function ChatHeader({
  children,
}: PropsWithChildren<unknown>): ReactElement {
  return <div>{children}</div>;
}
