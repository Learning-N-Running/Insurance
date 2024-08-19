import { styled } from "styled-components";
import Image from "next/image";
import GreenGrayButton from "../../button/GreenGrayButton";
import { useRouter } from "next/navigation";

type Props = {
  imgSrc: string;
  index: number;
  name: string;
  date: string;
  isButtonActivated: boolean;
};

const Activity = ({ imgSrc, index, name, date, isButtonActivated }: Props) => {
  const router = useRouter();
  return (
    <Container>
      <Thumbnail>
        <Image
          src={imgSrc}
          alt="activity thumbnail"
          fill
          style={{ objectFit: "cover" }}
        />
      </Thumbnail>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "162px",
        }}
      >
        <div>
          <CircleNumber>{index}</CircleNumber>
          {name.includes("/") ? (
            <Name>
              {name.split("/")[0]}
              <br />
              {name.split("/")[1]}
            </Name>
          ) : (
            <Name>{name}</Name>
          )}
        </div>
        <Date>{date}</Date>
      </div>
      <GreenGrayButton
        isGray={!isButtonActivated}
        title={isButtonActivated ? "발급받기" : "발급완료"}
        onClickHandler={() => {
          router.push(`/activities/${index}`);
        }}
        margin="auto 0 0 41px"
      />
    </Container>
  );
};
export default Activity;

const Container = styled.div`
  display: flex;
  margin-bottom: 70px;
`;

const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  width: 216px;
  height: 162px;
  border-radius: 12px;
  margin-right: 34px;
`;

const CircleNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #374151;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #f9fafb;
  font-size: 18px;
  font-weight: 700;
`;

const Name = styled.div`
  color: #1f2937;
  font-size: 32px;
  font-weight: 700;
  width: 480px;

  margin-top: 8px;
`;

const Date = styled.div`
  color: #4b5563;
  font-size: 16px;
  font-weight: 400;
`;
