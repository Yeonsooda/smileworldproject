import React from 'react';
import styled from "styled-components";

const Pagination_cmt = ({ total, limit, page, setPage }) => {
    // 올림 차수로 계산 
    const numPages = Math.ceil(total / limit);

    return (
        <>
            {
                total > 0 &&
                <Nav>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        &lt;
                    </Button>
                    {Array(numPages)
                        .fill()
                        .map((v, i) => (
                            <Button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 ? "page" : null}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                        &gt;
                    </Button>
                </Nav>
            }
        </>
    );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  /* margin: 16px; */
`;

const Button = styled.button`
  border: none;
  /* border-radius: 8px; */
  padding: 8px;
  margin-bottom: 10px;
  background: white;
  color: black;
  font-size: 10px; 
  height: 28px; 

  &:hover {
    background: rgb(253, 216, 189);
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: lightgray;
    color: black;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: rgb(253, 117, 7);;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination_cmt;