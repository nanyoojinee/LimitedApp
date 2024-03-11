'use client'
import React, { useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; 
  height: 500px; 
`;

const Image = styled.img`
  width: 50%; 
  max-height: 100%; 
  object-fit: contain; 
  flex-shrink: 0;
  margin: 10px;
`;

const Arrow = styled.div`
  position: absolute;
  font-size: 40px;
  color: #FFBFBF;
  top: 50%;
  transform: translateY(-50%); 
  ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  transition: background-color 0.3s; 

  &:hover {
    background-color: #ccc; 
  }
`;


const Button = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1rem; /* 패딩 조정 */
  font-size: 1rem;
  background: #FFBFBF;
  position: absolute; /* 절대 위치 */
  right: 20px; /* 오른쪽에서 20px 떨어진 위치 */
  bottom: 20px; /* 아래쪽에서 20px 떨어진 위치 */
  transition: background-color 0.3s; /* 배경색 변경 시 트랜지션 효과 */

  &:hover {
    background: #FD7F7F;
  }
  &:active {
    background: #FFBFBF;
  }
`;


const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/photo1.JPG', '/photo2.JPG']; 

  const goPrev = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const goNext = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const handleImageUpload = () => {
    // 이미지 업로드 로직을 여기에 구현합니다.
    console.log('이미지 업로드');
  };

  return (
    <Container>
      <Arrow direction="left" onClick={goPrev}>{"<"}</Arrow>
      <ImageWrapper style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <Image key={index} src={src} />
        ))}
      </ImageWrapper>
      <Arrow direction="right" onClick={goNext}>{">"}</Arrow>
    </Container>
  );
};

export default Banner;
