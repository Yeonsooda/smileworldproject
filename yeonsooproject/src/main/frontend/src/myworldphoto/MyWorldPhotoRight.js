import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyWorldBtn from '../myworldhome/MyWorldBtn';
import MyWorldMusic from '../myworldhome/MyWorldMusic';
import './MyWorldPhotoRight.css';
import MyWorldPhotoRight_View from './MyWorldPhotoRight_View';
import MyWorldPhotoRight_View_basic from './MyWorldPhotoRight_View_basic';
import Pagination from './Pagination';

const MyWorldPhotoRight = () => {
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
  /* 미니룸 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("isMinimi", false);
  sessionStorage.setItem("isMiniroom", false);
  
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
  const toMainHome = () => {
    window.opener.location.reload();
    window.close();
    window.open("/", "_parent");
  }

  const [photoData, setPhotoData] = useState([]);
  useEffect(() => {
    axios.post('/getPhotoBoardList', null, {
      params: {
        board_userId: localStorage.getItem("userId"),
      }
    })
      .then((res) => {
        console.log(res);
        //alert("res"+JSON.stringify(res));
        //alert("res.data"+JSON.stringify(res.data));
        setPhotoData(res.data);
        // if (res.data.length > 0) {
        //   localStorage.setItem("isshow_photoview", "true")
        // } else {
        //   localStorage.setItem("isshow_photoview", "false")
        // }
        // alert(localStorage.getItem("isshow_photoview"))
        //alert(JSON.stringify(photoData));
        //alert(photoData);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  /* photoview 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(1);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

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
          <div id="rightcontainer_myworldphoto_view">          
            {
              photoData.length > 0 ?
              photoData.slice(offset, offset + limit).map(item => <MyWorldPhotoRight_View key={item.board_no} item={item} />)
              : <MyWorldPhotoRight_View_basic/>
            }

            {/* 페이지네이션 */}
            <div style={{marginTop: "30px"}}>
            <Pagination          
              total={photoData.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWorldPhotoRight;