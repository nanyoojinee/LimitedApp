import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

export const WhiteBox = styled.div`
  background-color: #fff;
  width: 60%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 5rem;
`;

export const GreenBox = styled.div`
  background-color: #DCE8D0;
  width: 90%;
  height: 70vh;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LineBox = styled.div`
  background-color: #DCE8D0;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainer = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
  width: 20rem;
  background-color: #FFECEC;
  border: 1px solid #DDDDDD;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  background-color: #FFECEC;
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  padding: 10px 20px;
  color: gray;
`;

export const ItemText = styled.span`
    margin-left: 1rem;
`;

export const ActionButton = styled.button`
  height: 2rem;
  padding: 0rem 1rem;
  margin-right: 1rem;
  font-size:0.7rem;
  cursor: pointer;
  background-color: #FFA07A;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FF6347;
  }
`;

export const Index = styled.div`
    position: absolute;
    top: 7.5rem;
    left: 16.5rem;
`;

export const StyledInput = styled.input`
  // Input 스타일을 여기에 추가
  padding: 10px;
  margin: 0 5px 10px 0; // 예시 마진, 필요에 따라 조정
  border: 1px solid #ccc; // 경계선 색상 변경
  border-radius: 4px; // 경계선 둥글게
  
  &:focus {
    outline: none; // 포커스 상태에서 테두리 제거
    border-color: #777; // 포커스 상태에서 경계선 색상 변경, 필요에 따라 조정
  }
`;

export const StyledLink = styled.p`
  text-decoration: none;
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 20rem; // 링크가 차지할 수 있는 최대 너비를 제한
`;

export const RenderPage = styled.div`
    display: flex;
    justify-content: center;
    padding:20px;
    position:absolute;
    bottom:5rem;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  background: ${(props) => (props.isCurrent ? 'pink' : 'transparent')};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

export const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  position: relative;
  margin-right:32px;
`;

export const SearchInput = styled.input`
  padding: 10px 30px 10px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SearchWrapper = styled.div`
  position: relative;
  align-self: flex-end;
  margin-right: 20px;
`;
