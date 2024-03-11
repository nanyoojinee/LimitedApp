'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
import 'react-calendar/dist/Calendar.css';

const GlobalStyle = createGlobalStyle`
  .react-calendar {
    width: 500px;
    height: 400px;
    max-width: 100%;
    background: white;
    font-size: 18px; /* 폰트 크기 증가 */
    border-radius: 10px; /* 캘린더의 모서리를 둥글게 */
    box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* 그림자 효과 추가 */
    .react-calendar__navigation button {
      font-size: 1.2em; /* 네비게이션 버튼 폰트 크기 증가 */
    }
    .react-calendar__month-view__days__day {
      padding: 15px 0; /* 날짜 타일의 높이 증가 */
    }
    /* 선택된 날짜의 스타일 변경 */
    .react-calendar__tile--active,
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: #f28b82; /* 분홍색으로 변경 */
      color: white;
    }

    /* 오늘 날짜의 스타일 조정 */
    .react-calendar__tile--now {
      background: #fff7f7;
      border: 1px solid #f28b82; /* 분홍색 테두리 추가 */
    }

    .react-calendar__tile:hover {
      background-color: #ffe0e0; /* 호버 시 분홍색 계열로 변경 */
    }

  }
`;

const HorizontalContainer = styled.div`
  display: flex; /* 내부 요소를 가로로 배열 */
  justify-content: center; /* 내부 요소를 중앙 정렬 */
  width: 100%; /* 너비를 100%로 설정 */
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column; /* 변경: 세로 방향으로 내부 요소를 배치 */
  align-items: center; /* 내부 요소를 가로 중앙 정렬 */
  margin-top: 50px;
  padding: 20px;
`;


const CalendarContainer = styled.div`
  width: auto; /* 캘린더 너비 자동 조절 */
  padding: 20px;
  margin-right: 20px; // 캘린더와 데이터 표시 영역 사이의 간격
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

const EventFormContainer = styled.div`
  display: flex; /* 내부 요소를 가로로 배열 */
  flex-direction: column; /* 내용을 세로로 표시 */
  justify-content: center; /* 내부 요소를 중앙 정렬 */
  align-items: center; /* 내부 요소를 가로 중앙 정렬 */
  width: 50%; /* 너비를 100%로 설정하여 부모 컨테이너에 맞춤 */
  margin-top: 20px; /* 캘린더와의 간격 */
  background-color: #f9f9f9; /* 배경색 변경 */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 세련된 그림자 효과 */
  border-radius: 10px; /* 둥근 모서리 */
`;

const DataContainer = styled.div`
  width: 300px;
  max-height: 400px; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: #fff;
  margin-left: 50px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
`;

const DateTitle = styled.h2`
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
`;

const DataText = styled.p`
  color: #666;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 입력 필드 간격 조정 */
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 90%; /* 입력 필드 너비 */
  padding: 8px;
  margin: 5px 0; /* 상하 간격 조정 */
  border: 1px solid #ccc;
  border-radius: 5px; /* 입력 필드 둥근 모서리 */
  outline: none;
  box-shadow : none;
`;

const StyledTextarea = styled.textarea`
  width: 90%; /* 텍스트 영역 너비 */
  padding: 8px;
  margin: 5px 0; /* 상하 간격 조정 */
  border: 1px solid #ccc;
  border-radius: 5px; /* 텍스트 영역 둥근 모서리 */
  height: 100px; /* 텍스트 영역 높이 */
  outline: none;
  box-shadow : none;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px; /* 버튼 상단 간격 */
  background-color: #f28b82; /* 버튼 배경색 */
  color: white;
  border: none;
  border-radius: 5px; /* 버튼 둥근 모서리 */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e07770; /* 호버 시 색상 변경 */
  }
`;

const StyledDeleteButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

function EventForm({ onEventAdded }) {
  const [event, setEvent] = useState({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      await onEventAdded(event);
      setEvent({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
      });
  };

   return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput type="text" name="title" value={event.title} onChange={handleChange} placeholder="Title" required />
      <StyledTextarea name="description" value={event.description} onChange={handleChange} placeholder="Description" />
      <StyledInput type="datetime-local" name="startDate" value={event.startDate} onChange={handleChange} required />
      <StyledButton type="submit">Add Event</StyledButton>
    </StyledForm>
  );
}

export default function CalendarWithEventForm() {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]); // 이벤트 정보를 저장할 상태
  const [selectedData, setSelectedData] = useState(null);

  const handleEventAdded = async (event) => {
    console.log(event, "event!!!");
    const startDate = event.startDate.slice(0, 10);
    console.log(startDate);
    const response = await fetch(`http://localhost:3000/api/events/${startDate}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
    });
    const data = await response.json(); 
    console.log(data);
      // if (data.success) {
      //     alert('Event added successfully!');
      // } else {
      //     alert('Error adding event');
      // }
  };

  const handleDateChange = async (selectedDate) => {
    console.log(selectedDate, "selectedDate");
    onChange(selectedDate); // 캘린더의 날짜 상태를 업데이트
    const dateString = selectedDate.toISOString().slice(0, 10); // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
    setSelectedData(dateString);

    try {
      const response = await fetch(`http://localhost:3000/api/events/${dateString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // 서버로부터 받은 데이터
      console.log(data);
      // 이벤트 데이터 중 선택된 날짜와 시작 날짜가 일치하는 이벤트만 필터링하여 상태에 저장
      const filteredEvents = data.filter(event => {
        // 이벤트의 start_date에서 날짜 부분만 추출하여 비교
        const eventDate = event.start_date.slice(0, 10);
        console.log(eventDate);
        console.log(dateString,"date");
        return eventDate === dateString;
      });

      setEvents(filteredEvents); // 필터링된 이벤트 정보를 상태에 저장
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]); // 에러 발생 시 이벤트 정보를 빈 배열로 초기화
    }
  };

 const handleDeleteEvent = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eventId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // 성공 메시지 알림
      // 이벤트 목록에서 삭제된 이벤트를 제거
      setEvents(events.filter(event => event.id !== eventId));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert('이벤트 삭제 중 오류가 발생했습니다: ' + error.message);
  }
};
  
return (
  <>
    <GlobalStyle />
    <AppContainer>
      <HorizontalContainer>
        <CalendarContainer>
          <Calendar onChange={handleDateChange} value={value} />
        </CalendarContainer>
        {events.length > 0 && (
        <DataContainer>
          {events.map((event, index) => (
            <div key={index}>
              <DateTitle>{event.title}</DateTitle>
              <DataText>{event.description}</DataText>
              {/* 삭제 버튼 추가 */}
              <StyledButton onClick={() => handleDeleteEvent(event.id)}>삭제</StyledButton>
            </div>
          ))}
        </DataContainer>
      )}
      </HorizontalContainer>
      {selectedData && (
        <EventFormContainer>
          {/* <DateTitle>{value.toISOString().slice(0, 10)}</DateTitle> */}
          {/* <DataText>{selectedData}</DataText> */}
          <EventForm onEventAdded={handleEventAdded} />
        </EventFormContainer>
      )}
    </AppContainer>
  </>
);
}