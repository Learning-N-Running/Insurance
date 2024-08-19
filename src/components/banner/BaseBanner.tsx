import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = {
  children: ReactNode;
};

const BaseBanner = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default BaseBanner;

const Container = styled.section`
  width: 100%;
  height: 25vw;
`;
