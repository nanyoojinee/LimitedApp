'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DiaryTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #C8A2C8;
  margin:0px;
  font-style: italic;
  font-weight: 400;
`;

const ScrollContainer = styled.div`
  width: 48rem;
  height: 70vh;
  overflow-y: auto;
  margin: 0 10px;
  margin-bottom: 5rem;
  padding: 20px;
  background: #fdfdfd;
  background-image: linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 25px 25px, 25px 25px;
  border: 1px solid #dcdcdc;
  box-shadow: inset 0 0 10px #a0a0a0;
  border-radius: 4px;
  font-family: 'Times New Roman', Times, serif;
`;



const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  padding: 10px 20px; // 상단 패딩 및 좌우 패딩 조정
  margin-right: 5rem; // 오른쪽 여백 추가
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:hover,
  &:focus {
    border-color: #007bff;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: #007bff;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #0056b3;
    color: white;
  }
`;
// const ScrollContainer = styled.div`
//   width: 60rem;
//   height: 70vh;
//   overflow-x: hidden;
//   overflow-y: auto;
//   margin: 20px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   background-color: #f4f4f4; /* 밝은 회색 배경 */
//   box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 부드러운 그림자 효과 */
// `;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* 게시물 사이의 간격 */
`;
const PostTitleContainer = styled.div`
  width: 100%;
  background-color: #ccc; /* 타이틀 배경색을 회색으로 설정 */
  padding: 10px 20px;
  border-top-left-radius: 15px; /* 둥근 모서리를 타이틀 상단에만 적용 */
  border-top-right-radius: 15px;
  border-bottom: 2px solid #bbb; /* 타이틀과 내용을 구분하는 보더 */
  display: flex;
  justify-content: space-between; /* 타이틀과 날짜/시간을 양 끝으로 정렬 */
  align-items: center;
`;

const PostTitle = styled.h3`
  color: #333; /* 타이틀 글자색 */
  margin: 0; /* 기본 마진 제거 */
`;

const PostContent = styled.div`
  background-color: #fff; /* 내용 배경색을 흰색으로 설정 */
  padding: 20px;
  border: 1px solid #ddd;
  border-bottom-left-radius: 15px; /* 둥근 모서리를 내용 하단에만 적용 */
  border-bottom-right-radius: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ContentText = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
  color: #333; /* 내용 글자색 */
`;

// 기존 Post 컴포넌트 스타일에서 배경색, 보더 등의 스타일을 제거하거나 조정합니다.
const Post = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 타이틀과 내용 사이의 간격 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 15px; /* 둥근 모서리 */
  overflow: hidden; /* 자식 컴포넌트의 모서리가 Post 모서리를 따르도록 함 */
    &:hover {
     transform: translateY(-5px); /* 호버 시 약간 위로 올라가는 효과 */
   }
`;

const DateTime = styled.div`
  text-align: right;
  color: #888; /* 연한 글자색 */
  font-size: 0.8rem;
  margin-right: 50px;
`;

const CreatePostButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  padding: 0; /* 패딩 조정 */
  width: 60px; /* 버튼 크기 조정 */
  height: 60px; /* 버튼 크기 조정 */
  font-size: 24px;
  border-radius: 50%;
  background-image: linear-gradient(45deg, #007bff, #8844ee); /* 그라디언트 배경 */
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* 그림자 조정 */

  &:hover {
    background-image: linear-gradient(45deg, #0056b3, #6622cc); /* 호버 시 색상 변경 */
  }

`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100rem; /* 모달의 너비를 화면의 80%로 설정 */
  max-width: 700px; /* 최대 너비 설정 */
  box-shadow: 0 4px 15px rgba(0,0,0,0.2); /* 모달에 그림자 추가 */
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;

  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 42rem; /* 입력 필드를 폼에 꽉 차도록 설정 */
  }

  textarea {
    height: 200px; /* 텍스트 영역의 세로 크기를 증가 */
  }

  button {
    padding: 12px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    width: auto; /* 버튼 너비 자동 조정 */
    align-self: center; /* 폼 내에서 버튼을 중앙에 위치시킴 */

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Loading = styled.div`
  margin: 20px;
  font-size: 20px;
  text-align: center;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  font-size: 0.8rem;
  color: white;
  background-color: pink;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right; /* Position the delete button to the right */

  &:hover {
    background-color: darkred;
  }
`;


function Posts() {
  const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터된 게시물 목록
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null); // Intersection Observer를 위한 ref
const [isModalVisible, setIsModalVisible] = useState(false);

const [isSubmitting, setIsSubmitting] = useState(false); // 추가
    const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


  
    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/posts?page=${page}&limit=10`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setPosts([]);
                setPosts((prev) => [...prev, ...data]);
                console.log(posts);
            }
        else {
        throw new Error('Failed to fetch items.');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    //   if (data.length < 10) { // 데이터가 10개 미만이면 더 불러올 데이터가 없다고 가정
    //     setHasMore(false);
    //   }
    };


    useEffect(() => {
        fetchPosts();
    }, [page])
    useEffect(() => {
  // 선택된 날짜가 있을 경우, 해당 날짜에 맞는 게시글만 필터링
  if (selectedDate) {
      const filtered = posts.filter(post => {
          console.log("선택!")
          
      // 서버에서 받은 날짜와 DatePicker에서 선택한 날짜를 'YYYY-MM-DD' 형식으로 변환하여 비교
      const postDate = new Date(post.createdAt).toISOString().split('T')[0];
          const selectedDateString = selectedDate.toISOString().split('T')[0];
          
        return postDate === selectedDateString;

    });
      setFilteredPosts(filtered);
      console.log(filteredPosts);
  } else {
      setFilteredPosts(posts); // 날짜가 선택되지 않은 경우 모든 게시글을 표시
  }
}, [selectedDate, posts]);
 useEffect(() => {
    const options = {
      root: null, // 뷰포트를 root로 설정
      rootMargin: '20px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 관찰되는 요소가 화면에 나타나면 페이지 상태 증가
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행
const handleDelete = async (postId) => {
  try {
    const response = await fetch(`/api/posts`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId }),
    });

    if (!response.ok) {
      throw new Error('게시글을 삭제하는 데 실패했습니다.');
    }

    // 상태를 업데이트하여 삭제된 게시글을 바로 UI에서 제거합니다.
    // setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));

    // 성공적으로 삭제된 후에, 게시글 목록을 새로 불러옵니다.
    // 페이지를 1로 리셋하고, 전체 목록을 새로 불러옵니다.
    setPage(1);
    setPosts([]); // 현재 게시글 상태를 비웁니다.
    fetchPosts(); // 첫 페이지부터 게시글을 다시 불러옵니다.
  } catch (error) {
    console.error('게시글 삭제 중 오류가 발생했습니다:', error);
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();

if (isSubmitting) {
      // 이미 제출 중이라면 추가 제출 방지
      console.log('Submit is in progress.');
      return;
}
       setIsSubmitting(true); // 제출 시작 상태로 설정
    const { title, content } = event.target.elements;
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.value,
          content: content.value,
          // startDate와 endDate는 서버 코드에서 요구하는 형식에 맞게 설정해야 합니다.
          startDate: "2021-01-01",
          endDate: "2021-01-02",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }
console.log('Post created successfully');
      fetchPosts(); 
        setIsModalVisible(false); // 모달 닫기
    
      // 게시글 목록 갱신 로직 추가
   } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false); // 작업 완료 후, 제출 상태 해제
    }
  };
    
    
    return (
      <>
      <DatePickerContainer>
          <StyledDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        isClearable
        placeholderText="날짜를 선택하세요"
                />
            </DatePickerContainer>
            <DiaryTitle>芳名録</DiaryTitle>
      <LayoutContainer>
        <ScrollContainer>
        <PostContainer>
            {filteredPosts.map((post) => (
            <Post key={post.id}>
                <PostTitleContainer>
                <PostTitle>{post.title}</PostTitle>
                <DateTime>{formatDate(post.createdAt)}</DateTime>
                </PostTitleContainer>
                <PostContent>
                <ContentText>{post.content}</ContentText>
                <DeleteButton onClick={() => handleDelete(post.id)}>Delete</DeleteButton>
                </PostContent>
            </Post>
            ))}
        </PostContainer>
   </ScrollContainer>
      </LayoutContainer>
      <div ref={loader} /> {/* 관찰 대상 요소 */}
      <CreatePostButton onClick={() => setIsModalVisible(true)}>+</CreatePostButton>
      {isModalVisible && (
        <ModalBackdrop onClick={() => setIsModalVisible(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Form onSubmit={handleSubmit}>
              <input name="title" type="text" placeholder="Title" required />
              <textarea name="content" placeholder="Content" required />
              <button type="submit">Submit</button>
            </Form>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}

export default Posts;
