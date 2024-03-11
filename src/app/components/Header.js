'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Face from '../../../public/Face.png';
import Heart from '../../../public/Heart.png';

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #000;

  &:hover {
    color: #0070f3;
  }
`;
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-left: 10px;
`;

const Logo = styled.img`
  height: 35px;
  cursor: pointer;
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 35px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const MenuItem = styled.h1`
  font-size: 18px;
  padding: 10px 0;
  cursor: pointer;
  color: #000;
  text-decoration: none;

  &:hover {
    color: #0070f3;
  }
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HeaderContainer>
      <LogoBox>
        <Link href="/" passHref>
          <Logo src={Heart.src} alt="logo" />
        </Link>
        <Link href="/calendar" passHref>
          <Logo src={Face.src} alt="logo" />
        </Link>
      </LogoBox>
      <HamburgerButton onClick={toggleModal}>☰</HamburgerButton>
      <Modal isOpen={isModalOpen}>
        <CloseButton onClick={toggleModal}>&times;</CloseButton> 
        <Link href="/calendar" passHref>
          <MenuItem>Calendar</MenuItem>
        </Link>
        <Link href="/goplan" passHref>
          <MenuItem>Plan</MenuItem>
        </Link>
        <Link href="/posts" passHref>
          <MenuItem>Posts</MenuItem>
        </Link>
        <Link href="/login" passHref>
          <MenuItem>Login</MenuItem>
        </Link>
      </Modal>
    </HeaderContainer>
  );
};

export default Header;