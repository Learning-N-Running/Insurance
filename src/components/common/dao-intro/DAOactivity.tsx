import React from "react";
import styled from "styled-components";
import Image from "next/image";

type Props = {
  name: string;
  date: string;
  activityDescription: string;
  tag: string;
  imgSrc: string;
};

const DAOactivity = ({
  name,
  date,
  activityDescription,
  tag,
  imgSrc,
}: Props) => {
  const parts = activityDescription!.split("/");
  return (
    <Container>
      <DetailWrapper>
        <div>
          {name.includes("/") ? (
            <Name>
              {name.split("/")[0]}
              <br />
              {name.split("/")[1]}
            </Name>
          ) : (
            <Name>{name}</Name>
          )}
          <Date>{date}</Date>
        </div>
        <div>
          <ActivityDescription>
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {part}
              </React.Fragment>
            ))}
          </ActivityDescription>
          <Tag>{tag}</Tag>
        </div>
      </DetailWrapper>
      <Thumbnail>
        <Image
          src={imgSrc}
          alt="DAO activity thumbnail"
          fill
          style={{ objectFit: "cover" }}
        />
      </Thumbnail>
    </Container>
  );
};

export default DAOactivity;

const Container = styled.div`
  width: 952px;
  height: 558px;
  overflow: hidden;

  border: 1px solid #9ca3af;
  border-radius: 12px;

  display: flex;

  margin-top: 82px;
`;

const DetailWrapper = styled.div`
  width: 50%;
  height: 100%;

  padding: 50px 34px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Thumbnail = styled.div`
  width: 50%;
  height: 100%;

  background-color: #d9d9d9;

  position: relative;
  overflow: hidden;
`;

const Name = styled.div`
  color: #1f2937;
  font-size: 32px;
  font-weight: 700;
`;

const Date = styled.div`
  color: #4b5563;
  font-size: 16px;
  font-weight: 400;

  margin-top: 18px;
`;

const ActivityDescription = styled.div`
  color: #4b5563;
  font-size: 14px;
  font-weight: 400;
  height: 200px;
`;

const Tag = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 400;
`;
