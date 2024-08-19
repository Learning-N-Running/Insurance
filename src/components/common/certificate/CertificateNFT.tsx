import { styled } from "styled-components";
import Image from "next/image";

type Props = {
  imgSrc: string | undefined | null;
  NFTname: string;
  userName: string;
  margin?: string;
};

const CertificateNFT = ({ imgSrc, NFTname, userName, margin }: Props) => {
  return (
    <Container $margin={margin!}>
      <Thumbnail>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="certificate NFT thumbnail"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </Thumbnail>
      <DetailWrapper>
        <Image
          src="/images/수료증_이미지삽입.png"
          alt="Certificate detail background"
          fill
          style={{ objectFit: "cover" }}
        />
        <NFTName>{NFTname}</NFTName>
        <UserName>{userName}</UserName>
      </DetailWrapper>
    </Container>
  );
};

export default CertificateNFT;

const Container = styled.div<{ $margin: string }>`
  width: 840px;
  height: 766px;

  border-radius: 40px;
  overflow: hidden;

  margin: ${(props) => props.$margin};

  border: 2px solid #d1d5db;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 548px;
  background-color: gray;
  position: relative;
  overflow: hidden;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 217px;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NFTName = styled.div`
  position: absolute;
  font-size: 32px;
  font-weight: 700;
  color: #0aa98d;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  top: 59px;
`;

const UserName = styled.div`
  position: absolute;
  width: 840px;
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  color: #159075;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  bottom: 51px;
`;
