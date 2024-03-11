'use client'
import Link from 'next/link';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const MainLink = styled.p`
  margin: 5px;
  padding: 10px;
  background-color: #DCE8D0;
  color: black;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
  &:hover {
    background-color: #C2D4BF;
  }
`;

const HomePage = () => {
  return (
    <MainContainer>
      <Link href="/goplan" passHref><MainLink>👟</MainLink></Link>
      <Link href="/eatplan" passHref><MainLink>🍔 </MainLink></Link>
      <Link href="/doplan" passHref><MainLink>✊</MainLink></Link>
    </MainContainer>
  );
};

export default HomePage;
