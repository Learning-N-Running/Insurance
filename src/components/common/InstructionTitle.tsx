import Image from "next/image";
import { styled } from "styled-components";
type Props = {
  isIcon: boolean;
  title: string;
  detail?: string;
};
export default function InstructionTitle({ isIcon, title, detail }: Props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {isIcon && (
          <Image
            src="/images/firework.svg"
            width={48}
            height={48}
            alt="firework"
            style={{ marginRight: "16px" }}
          />
        )}
        <Title>{title}</Title>
      </div>
      {detail &&
        (detail.includes("/") ? (
          <Detail>
            {detail.split("/")[0]}
            <br />
            {detail.split("/")[1]}
          </Detail>
        ) : (
          <Detail>{detail!}</Detail>
        ))}
    </div>
  );
}

const Title = styled.div`
  font-size: 42px;
  font-weight: 700;
  line-height: 100%;
  color: black;
  padding: 3px 0;
`;

const Detail = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: black;

  margin-top: 13px;
`;
