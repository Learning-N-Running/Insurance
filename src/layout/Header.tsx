import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getProfileImageState,
} from "@/redux/slice/authSlice";
import { Heading3 } from "@/styles/texts";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const profileImage = useSelector(getProfileImageState);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <>
      {pathname === "/signup" && <Header_Signup />}
      {pathname === "/home" && <Header_Home />}
    </>
  );
};

export default Header;

function Header_Signup() {
  const web3auth = useWeb3Auth();

  const onClose = () => {
    web3auth?.web3auth?.logout();
  };
  return (
    <Container_Signup>
      <Goback
        src="/images/vb_goback.svg"
        alt="go back"
        width={24}
        height={24}
      />
      <Heading3>Insurance planning</Heading3>
      <p onClick={onClose} style={{ fontSize: 19 }}>
        &#x2715;
      </p>
    </Container_Signup>
  );
}

function Header_Home() {
  return (
    <Container_Home>
      <Image
        src="/images/vb_home_목록.svg"
        alt="category"
        width={32}
        height={32}
      />
      <Image
        src="/images/vb_home_알림.png"
        alt="notification"
        width={48}
        height={48}
      />
    </Container_Home>
  );
}

const Container_Signup = styled.div`
  width: 100%;
  height: 65px;

  position: fixed;
  z-index: 10;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
`;

const Goback = styled(Image)`
  left: 26px;
  top: 21px;

  cursor: pointer;
`;

const Container_Home = styled.div`
  width: 100%;
  height: 80px;

  position: fixed;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px 0 24px;
`;
