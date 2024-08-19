import React, { ReactNode, useState } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode[];
};

const SlideBanner = ({ children }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  return (
    <Container>
      <SlidesWrapper
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children.map((child, index) => (
          <Slide key={index}>{child}</Slide>
        ))}
      </SlidesWrapper>
      <PrevButton onClick={goToPrevSlide} src="/images/prev.svg" />
      <NextButton onClick={goToNextSlide} src="/images/next.svg" />
    </Container>
  );
};

export default SlideBanner;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 25vw;
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  flex: 0 0 100%;
`;

const PrevButton = styled.img`
  position: absolute;
  top: 50%;
  left: 96px;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  cursor: pointer;

  &:hover {
    filter: brightness(70%);
    transition: filter 0.1s ease-in-out;
  }
`;

const NextButton = styled.img`
  position: absolute;
  top: 50%;
  right: 96px;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  cursor: pointer;

  &:hover {
    filter: brightness(70%);
    transition: filter 0.1s ease-in-out;
  }
`;
