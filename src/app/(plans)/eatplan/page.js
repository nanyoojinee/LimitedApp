'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageContainer, WhiteBox, GreenBox, LineBox, InputContainer, Input, SubmitButton, ItemText, ActionButton, Index, StyledLink, RenderPage, PaginationWrapper, PageButton, ArrowButton, Ellipsis, SearchInputContainer, SearchInput, SearchIcon } from '../../components/CommonPlan';
import HomePage from '../../components/PlanIndex';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const EatPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 4;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  // 별도로 정의한 fetchItems 함수
  const fetchItems = async () => {
    try {
      const response = await fetch(`../../api/plans/eatplan?page=${currentPage}&limit=${itemsPerPage}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
        setTotalItems(data.totalItems);
      } else {
        throw new Error('Failed to fetch items.');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage]); // currentPage 변경 시 데이터 재요청
 useEffect(() => {
    if (searchTerm) {
      const filtered = items.filter(item => 
        item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.link && item.link.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items); // 검색어가 없으면 전체 아이템 목록을 보여줌
    }
  }, [searchTerm, items]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!textInput && !linkInput) return;

    try {
      const response = await fetch('../../api/plans/eatplan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput, link: linkInput || null }),
      });
      if (response.ok) {
        setCurrentPage(1); // 데이터 추가 후 첫 페이지로 이동
          fetchItems(); // 최신 데이터 요청
          setTextInput(''); // 텍스트 입력 상태를 빈 문자열로 설정
            setLinkInput('');
      } else {
        throw new Error('Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

    const handleDelete = async (index) => {
        const itemToDelete = items[index];
    try {
      const response = await fetch(`../../api/plans/eatplan`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemToDelete.id }),
      });
      if (response.ok) {
        fetchItems(); // 항목 삭제 후 최신 데이터 요청
      } else {
        throw new Error('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  // Custom Pagination Component
const PaginationComponent = ({ currentPage, totalPages, onChange }) => {
  const maxPageButtonCount = 7;
  let startPage, endPage;
  if (totalPages <= maxPageButtonCount) {
    // 전체 페이지 수가 최대 페이지 버튼 수보다 적거나 같은 경우
    startPage = 1;
    endPage = totalPages;
  } else {
    // 현재 페이지가 4보다 크고, 전체 페이지 수에서 현재 페이지를 뺀 값이 3보다 클 경우
    if (currentPage > 4 && currentPage < totalPages - 3) {
      startPage = currentPage - 3;
      endPage = currentPage + 3;
    } else if (currentPage <= 4) {
      // 현재 페이지가 4 이하인 경우
      startPage = 1;
      endPage = maxPageButtonCount;
    } else {
      // 현재 페이지가 전체 페이지 수에서 3을 뺀 값보다 큰 경우
      startPage = totalPages - (maxPageButtonCount - 1);
      endPage = totalPages;
    }
  }

  return (
    <PaginationWrapper>
      {currentPage > 1 && (
        <ArrowButton onClick={() => onChange(currentPage - 1)}>&lt;</ArrowButton>
      )}
      {startPage > 1 && (
        <>
          <PageButton onClick={() => onChange(1)}>1</PageButton>
          {startPage > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <PageButton key={page} onClick={() => onChange(page)} isCurrent={currentPage === page}>
          {page}
        </PageButton>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Ellipsis>...</Ellipsis>}
          <PageButton onClick={() => onChange(totalPages)}>{totalPages}</PageButton>
        </>
      )}
      {currentPage < totalPages && (
        <ArrowButton onClick={() => onChange(currentPage + 1)}>&gt;</ArrowButton>
      )}
    </PaginationWrapper>
  );
};


   return (
    <PageContainer>
      <Index>
        <HomePage />
      </Index>
       <WhiteBox>
          <h2>Let's Eat together</h2>
         <SearchInputContainer>
           <SearchIcon icon={faSearch} />
          <SearchInput
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           />
        </SearchInputContainer>
        <GreenBox>
          {(filteredItems.length > 0 ? filteredItems : items).map((item, index) => (
            <LineBox key={index}>
              <ItemText>{item.text}</ItemText>
              <Link href={item.link || '#'} passHref>
                <StyledLink target="_blank" rel="noopener noreferrer">{item.link || 'No Link'}</StyledLink>
              </Link>
              <ActionButton onClick={() => handleDelete(index)}>Delete</ActionButton>
            </LineBox>
          ))}
          <RenderPage>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handleChangePage}
            />
          </RenderPage>
        </GreenBox>
        <InputContainer>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Text.."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Input
              placeholder="Link.."
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
            />
            <SubmitButton type="submit" onChange={handleSubmit}>⬆️</SubmitButton>
          </form>
        </InputContainer>
      </WhiteBox>
    </PageContainer>
  );
};

export default EatPage;