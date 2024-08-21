"use client";

import { ReactNode, useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const showGoBack = () => {
    if (
      pathname === "/" ||
      pathname === "/my-collection" ||
      pathname === "/conversation" ||
      pathname === "/not-pc-error"
    ) {
      return false;
    }
    return true;
  };

  const showHeader = () => {
    if (pathname === "/not-pc-error") {
      return false;
    }
    return true;
  };

  const handleGoBack = () => {
    const pathnameParts = pathname.split("/");
    if (pathnameParts.length === 2) {
      return "/";
    }
    const newPathname = pathnameParts.slice(0, -1).join("/");
    return newPathname;
  };

  // useEffect //
  useEffect(() => {
    setIsClient(true);
    // handleGoBack();
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      alert(
        "이 웹사이트는 모바일 및 태블릿에서의 이용을 지원하지 않습니다.\nPC로 접속해주세요!"
      ); // 모바일이나 태블릿 디바이스인 경우 경고창 표시
      router.push("/not-pc-error");
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {showHeader() && <Header />}

      <BodyContainer>
        {showGoBack() && (
          <GoBack
            width={32}
            height={32}
            alt="go back"
            src="/images/leftArrow.svg"
            onClick={() => router.push(handleGoBack())}
          />
        )}

        {children}
      </BodyContainer>
    </>
  );
};

const BodyContainer = styled.div`
  width: 100vw;
  height: 100%;

  padding-top: 84px;

  overflow: auto;
`;

const GoBack = styled(Image)`
  margin: 48px 0px 38px 110px;
  cursor: pointer;
`;

export default Layout;
