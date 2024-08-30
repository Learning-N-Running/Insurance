import CalendarInput from "@/components/base/CalendarInput";
import colors from "@/styles/color";
import { Heading1, Heading3 } from "@/styles/texts";
import Image from "next/image";
import { useState } from "react";
import { styled } from "styled-components";

export default function Step_2_2() {
  const [subOp1, subOp2, subOp3, subOp4] = [
    "3 month",
    "6 months",
    "1 year",
    "Permanent",
  ];
  const [selectedSubOp, setSelectedSubOp] = useState(subOp1);

  return (
    <>
      <Image
        src="/images/vb_step_2.svg"
        alt="signup step2"
        width={368}
        height={48}
        style={{ margin: "48px 0 48px 0" }}
      />
      <Heading1 style={{ margin: "16px 0 40px 0" }}>
        Select your insurance
        <br />
        subscription information.
      </Heading1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/images/vb_icon_car.svg"
          width={33}
          height={32}
          alt="car"
          style={{ marginRight: "8px" }}
        />
        <Heading3>How long would you like to subscribe?</Heading3>
      </div>
      <SubOptionsWrapper>
        <SubOption
          active={selectedSubOp == subOp1}
          onClick={() => setSelectedSubOp(subOp1)}
        >
          {subOp1}
        </SubOption>
        <SubOption
          active={selectedSubOp == subOp2}
          onClick={() => setSelectedSubOp(subOp2)}
        >
          {subOp2}
        </SubOption>
        <SubOption
          active={selectedSubOp == subOp3}
          onClick={() => setSelectedSubOp(subOp3)}
        >
          {subOp3}
        </SubOption>
        <SubOption
          active={selectedSubOp == subOp4}
          onClick={() => setSelectedSubOp(subOp4)}
        >
          {subOp4}
        </SubOption>
      </SubOptionsWrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/images/vb_icon_calendar.svg"
          width={33}
          height={32}
          alt="calendar"
          style={{ marginRight: "8px" }}
        />
        <Heading3>When would you like to start?</Heading3>
      </div>
      <CalendarInput margin="16px 0 72px 0" />
    </>
  );
}

const SubOptionsWrapper = styled.div`
  width: 720px;
  height: 72px;

  display: flex;
  justify-content: space-between;

  margin: 16px 0 58px 0;
`;

const SubOption = styled.div<{ active: boolean }>`
  width: 171px;
  height: 100%;

  background-color: ${(props) =>
    props.active ? "rgba(0, 122, 255, 0.08)" : "transparent"};
  color: ${(props) => (props.active ? `${colors.primary}` : `${colors.grey5}`)};
  border: ${(props) =>
    props.active ? `2px solid ${colors.primary}` : `1px solid ${colors.grey2}`};
  border-radius: 8px;

  font-size: 17px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-family: Pretendard;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
