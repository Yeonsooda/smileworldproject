import React from 'react';
import './MainRight.css';
import img02 from './image/searchicon.png';
import img03 from './image/siworld.gif';
import img04 from './image/minimi.png';

const MainRight = () => {
    /* ckeditor 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("profileKey", "0"); //프로필
    sessionStorage.setItem("photoKey", "0"); //사진첩 write
    sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
    /* 미니룸 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("isMinimi", false);
    sessionStorage.setItem("isMiniroom", false);
    
    return (
        <div id="outerright">
            <div id="dotright">
                <div className='search'>
                    <input type='text' value='' placeholder="검색어를 입력하세요!" className='searchKeyword' />
                    <button className='searchBtn' type='submit'><img src={img02} alt='search' width='20' /></button>
                </div>
                <div id="ifright">
                    <div className='mainHome'>
                        <img src={img03} width='750' height='450' alt='miniroom' />
                        <br />
                        <p style={{ marginTop: 20 }}>이곳은 여러분의 스마일 월드입니다.<img src={img04} width='50' alt='minimi' style={{ marginBottom: 35 }} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainRight;