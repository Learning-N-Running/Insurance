import colors from "@/styles/color";
import { styled } from "styled-components";

export const LongBlueButton = styled.button`
  /* width: 720px; */
  width: 100%;
  height: 64px;

  background-color: ${colors.primary};
  color: white;

  font-weight: 600;
  font-size: 17px;
  font-family: Pretendard;

  border: none;
  border-radius: 100px;
  cursor: pointer;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${colors.primaryHover};
  }
  &:active {
    background-color: ${colors.primaryActive}; /* 클릭 시 조금 더 어두운 색상 */
  }
`;
