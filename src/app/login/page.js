'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 서버에 로그인 요청을 보냅니다.
    const response = await fetch('../api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: "여기에_실제_ID_토큰_값" }),
        })

    const data = await response.json();

    if (response.ok) {
      alert('로그인 성공!');
      // 성공 시 필요한 동작을 여기에 추가합니다.
    } else {
      alert(data.message); // 실패 시 메시지를 표시합니다.
    }
  };

 const responseGoogle = (response) => {
  // Extract the ID token from the Google authentication response
  const idToken = response.tokenId;

  // Send the ID token to your server
 fetch('../api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: "your_id_token" }),
})
.then(response => {
  if (response.headers.get("content-type").includes("application/json")) {
    return response.json();
  } else {
    throw new Error('Received non-JSON response from the server.');
  }
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

};


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </Form>
      <GoogleLogin
        clientId="168168387862-iqhvspre972b2ols23km8nmrkie70hrd.apps.googleusercontent.com"
        buttonText="구글로 로그인하기"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
  );
}
