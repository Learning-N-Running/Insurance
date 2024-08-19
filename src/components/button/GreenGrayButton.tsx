import { styled } from "styled-components";

type Props = {
  isGray: boolean;
  title: string;
  onClickHandler: () => void;
  margin?: string;
};

const GreenGrayButton = ({ isGray, title, onClickHandler, margin }: Props) => {
  return (
    <Wrapper
      $isGray={isGray}
      $margin={margin!}
      onClick={() => {
        onClickHandler();
      }}
    >
      {title}
    </Wrapper>
  );
};

export default GreenGrayButton;

const Wrapper = styled.button<{ $isGray: boolean; $margin: string }>`
  background-color: ${(props) => (props.$isGray ? "#E5E7EB" : "#0aa98d")};
  color: ${(props) => (props.$isGray ? "#9CA3AF" : "white")};

  font-size: 18px;
  font-weight: 600;
  font-family: Pretendard;

  height: 46px;
  padding: 12.5px 23px;

  border: none;
  border-radius: 10px;

  margin: ${(props) => props.$margin};

  cursor: ${(props) => !props.$isGray && "pointer"};

  &:hover {
    background-color: ${(props) => !props.$isGray && "#078571"};
  }
`;
