import colors from "@/styles/color";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/modal/ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsLoggedInState,
  getProfileImageState,
} from "@/redux/slice/authSlice";
import LoginButton from "@/components/common/LoginButton";

const Header = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(getIsLoggedInState);
  const profileImage = useSelector(getProfileImageState);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <Container>
      <Logo
        src="/images/환생클럽_텍스트로고60x60.png"
        alt="rebirth club logo"
        width={100}
        height={100}
        onClick={() => router.push("/")}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <WhiteButton
          onClick={() => {
            router.push(`/chat`);
          }}
        >
          채팅
        </WhiteButton>
        {isLoggedIn ? (
          <>
            <ProfileImage
              src={profileImage!}
              alt="header profile"
              width={36}
              height={36}
              style={{ marginLeft: "28px", borderRadius: "50%" }}
              onClick={() => {
                setIsProfileModalOpen(!isProfileModalOpen);
              }}
            />
            <ProfileModal
              show={isProfileModalOpen}
              setIsProfileModalOpen={setIsProfileModalOpen}
            />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
  height: 84px;

  position: fixed;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 110px 0 110px;

  background-color: white;

  border-bottom: 1px solid #e5e7eb;
`;

const Logo = styled(Image)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const WhiteButton = styled.button`
  height: 48px;
  padding: 0px;

  font-weight: 500;
  font-size: 24px;
  font-family: Pretendard;

  background-color: white;
  color: black;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  padding: 0 10px;
`;

const ProfileImage = styled(Image)`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
