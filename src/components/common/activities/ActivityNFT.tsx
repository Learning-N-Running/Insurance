import { styled } from "styled-components";
import Image from "next/image";

type Props = {
  imgSrc: string;
  index: number;
  name: string;
  margin?: string;
};

const ActivityNFT = ({ imgSrc, index, name, margin }: Props) => {
  return (
    <Container $margin={margin!}>
      <Thumbnail>
        <Image
          src={imgSrc}
          alt="activity NFT thumbnail"
          fill
          style={{ objectFit: "cover" }}
        />
      </Thumbnail>
      <DetailWrapper>
        <NFTIndex>{`No.0${index}`}</NFTIndex>
        <NFTName>{name}</NFTName>
      </DetailWrapper>
    </Container>
  );
};

export default ActivityNFT;

const Container = styled.div<{ $margin: string }>`
  width: 590px;
  height: 688px;

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
  height: 140px;

  padding: 21px 0 0 32px;
`;

const NFTIndex = styled.div`
  height: 30px;
  width: 60px;

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;

  border: 1px solid #9ca3af;
  border-radius: 7px;
`;

const NFTName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #6b7280;

  margin-top: 13px;
`;
