import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsLoggedInState,
  getProfileImageState,
} from "@/redux/slice/authSlice";
import LoginButton from "@/components/common/LoginButton";
import { Heading3 } from "@/styles/texts";

const Header = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(getIsLoggedInState);
  const profileImage = useSelector(getProfileImageState);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <Container>
      <Heading3>Insurance planning</Heading3>
      <Goback
        src="/images/vb_goback.svg"
        alt="go back"
        width={24}
        height={24}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 65px;

  position: fixed;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

const Goback = styled(Image)`
  position: absolute;

  left: 26px;
  top: 21px;

  cursor: pointer;
`;
