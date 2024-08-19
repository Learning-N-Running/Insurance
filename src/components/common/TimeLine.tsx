import { styled } from "styled-components";

const Timeline = ({ events }: any) => {
  const eventHeight = 232; // 한 사건당 줄의 높이
  const timelineHeight = eventHeight * events.length; // 타임라인의 전체 높이

  return (
    <Line style={{ height: `${timelineHeight}px` }}>
      {events.map((event: any, index: number) => (
        <EventDot key={index} style={{ top: `${index * eventHeight}px` }} />
      ))}
    </Line>
  );
};

export default Timeline;

const Line = styled.div`
  position: relative;
  width: 2px; /* 타임라인의 선 두께 */
  background-color: #e5e7eb; /* 타임라인의 선 색상 */
  height: 100%; /* 부모 요소의 높이를 100%로 설정 */

  margin-right: 60px;
`;

const EventDot = styled.div`
  position: absolute;
  width: 10px; /* 동그라미의 지름 */
  height: 10px; /* 동그라미의 지름 */
  background-color: #000; /* 동그라미의 색상 */
  border-radius: 50%; /* 동그라미를 동그랗게 만듦 */
  left: -4px; /* 동그라미를 타임라인의 왼쪽에 정렬 */
`;
