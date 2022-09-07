import axios from 'axios';
import React, { useState } from 'react';
import MyWorldBtn from '../myworldhome/MyWorldBtn';
import MyWorldMusic from '../myworldhome/MyWorldMusic';
import './MyWorldProfileRight.css';
import Editor from './MyWorldProfileRight_CKEditor';

const MyWorldProfileRight = () => {
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
  /* 미니룸 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("isMinimi", false);
  sessionStorage.setItem("isMiniroom", false);
  
  //alert(localStorage.getItem("viewContent"))
  /* 대문글 작성 시작 */
  const [myworldTitleText, setMyworldTitleText] = useState(localStorage.getItem("myworldHome_title"));

  const [isEdit, setIsEdit] = useState(false);

  const onClickedEdit = () => {
    setIsEdit(true);
  }

  const onChangeMyworldTitleText = (e) => {
    setMyworldTitleText(e.target.value);
  }

  const onSubmitTitleText = () => {
    axios.post("/updateUserTitle_myworldHome", null, {
      params: {
        myworldHome_userId: localStorage.getItem('userId'),
        myworldHome_title: myworldTitleText
      },
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        console.log(res);
        setIsEdit(false);
        localStorage.setItem("myworldHome_title", myworldTitleText);
        alert("대문글 등록 완료");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  /* 대문글 작성 끝 */

  /* 메인 홈으로  */
  const toMainHome = () => {
    window.opener.location.reload();
    window.close();
    window.open("/", "_parent");
  }

  return (
    <div id="outerright">
      <div id="dotright">
        <div className='MyWorldTitle' >
          {!isEdit &&
            <>
              <span className='title' onClick={onClickedEdit}>{localStorage.getItem("myworldHome_title") === null ? `${localStorage.getItem("userNickname")}님의 사이월드` : localStorage.getItem("myworldHome_title")}</span>
            </>}
          {isEdit &&
            <>
              <input type="text" className="myworldTitleText" value={myworldTitleText} onChange={onChangeMyworldTitleText} />
              <span style={{ color: "rgb(253, 117, 7)", fontSize: "10pt" }}>▶</span>
              <span style={{ fontWeight: "bold", fontSize: "10pt" }} onClick={onSubmitTitleText}>
                OK
              </span>
            </>}
          <span style={{ float: 'right', marginTop: 30 }}>www.smileworld.com/{localStorage.getItem("userId")}</span>
        </div>

        <div id="button">
          <MyWorldBtn />
        </div>
        <div id="music">
          <MyWorldMusic />
        </div>

        <div id="toMain">
          <button className="toMainBtn" onClick={toMainHome}>메인홈으로 가기▶</button>
        </div>

        <div id="ifright_MyWorld">
          <div id="rightcontainer_MyWorldProfile">
            <Editor />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default React.memo(MyWorldProfileRight);