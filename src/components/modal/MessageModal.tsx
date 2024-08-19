import React, { ReactNode } from "react";
import styled from "styled-components";
import colors from "@/styles/color";
import Image from "next/image";

type Props = {
  title: string;
  children?: ReactNode;
  isWarning?: boolean;
};

const MessageModal = ({ title, children, isWarning }: Props) => {
  return (
    <ModalBackground>
      <ModalContainer $isWarning={isWarning ? isWarning : false}>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
};

export default MessageModal;

const ModalBackground = styled.section`
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 97;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ModalContainer = styled.div<{ $isWarning: boolean }>`
  background-color: ${colors.white};

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  padding: 26px 65px;

  border-radius: 60px;
  border: 2px solid #0aa98d;
  border: ${(props) => props.$isWarning && "2px solid #EF4444"};
`;

const ModalTitle = styled.div`
  color: black;
  font-size: 32px;
  font-weight: 700;
`;
