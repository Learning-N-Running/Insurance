import { styled } from "styled-components";
import Image from "next/image";
import colors from "@/styles/color";

interface MsgProps {
  children: React.ReactNode;
}

export const AdminMsg = ({ children }: MsgProps) => {
  return (
    <AdminWrapper>
      <Image
        src="/images/vb_ia_profile.svg"
        alt={"insurance advisor profile"}
        width={194}
        height={44}
      />
      <AdminMessage>{children}</AdminMessage>
    </AdminWrapper>
  );
};

export const CustomerMsg = ({ children }: MsgProps) => {
  return (
    <CustomerWrapper>
      <CustomMessage>{children}</CustomMessage>
    </CustomerWrapper>
  );
};

const AdminWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const AdminMessage = styled.div`
  padding: 10px 16px;
  width: fit-content;
  max-width: 371px;
  background-color: rgba(0, 122, 255, 0.08);
  border-radius: 0px 16px 16px 16px;
  margin-top: 12px;
`;

const CustomerWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CustomMessage = styled.div`
  padding: 10px 16px;
  width: fit-content;
  max-width: 371px;
  background-color: ${colors.grey1};
  border-radius: 0px 16px 16px 16px;
  margin-top: 12px;
`;
