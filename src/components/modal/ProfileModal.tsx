import { SET_USER_LOGOUT } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
  show: boolean;
  setIsProfileModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ProfileModal = ({ children, show, setIsProfileModalOpen }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    show && (
      <>
        {" "}
        <ModalContainer $show={show}>
          <Item
            $isEndItem={false}
            onClick={() => {
              setIsProfileModalOpen(false);
              router.push("/my-collection");
            }}
          >
            마이콜렉션
          </Item>
          <Item
            $isEndItem={true}
            onClick={() => {
              dispatch(SET_USER_LOGOUT());
              setIsProfileModalOpen(false); // setIsProfileModalOpen 함수 호출
            }}
          >
            로그아웃
          </Item>
          {children}
        </ModalContainer>
      </>
    )
  );
};

export default ProfileModal;

const ModalContainer = styled.div<{
  $show: boolean;
}>`
  background-color: #f3f4f6;
  position: fixed;
  z-index: 97;
  top: 90px;
  right: 110px;

  padding: 8px;

  border-radius: 9px;
`;

const Item = styled.div<{ $isEndItem: boolean }>`
  color: #4b5563;

  font-size: 18px;
  font-weight: 700;
  text-align: center;

  padding: ${(props) =>
    props.$isEndItem ? "10px 24px 7px 24px" : "7px 24px 10px 24px"};

  border-bottom: ${(props) => !props.$isEndItem && "1px solid #d1d5db"};

  cursor: pointer;
`;
