import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyWorldBtn from '../myworldhome/MyWorldBtn';
import MyWorldMusic from '../myworldhome/MyWorldMusic';
import VisitorBook from "./VisitorBook";
import "./MyWorldVisitorRight.css";
import Pagination from './Pagination';


const MyWorldVisitorRight = () => {
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
  const [visitorData, setVisitorData] = useState([]);
  const [visitorBook, setVisitorBook] = useState("");
  /* photoview 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(1);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  useEffect(() => {
    axios.post('/getVisitorBoardList', null, {
      params: {
        board_userId: localStorage.getItem("userId"),
      }
    })
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res.data));
        setVisitorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const onChange = (e) => {
    setVisitorBook(e.target.value);
  }
  const onClick = () => {
    if (visitorBook === "") {
      return;
    } else {
      axios.post('/writeVisitorBoard', null, {
        params: {
          board_title: visitorBook,//리스트에 띄워보고 이상하면 지우기
          board_content: visitorBook,
          board_userId: localStorage.getItem("userId"),
          board_userNickname: localStorage.getItem("userNickname"),
          board_userImgMinimi: localStorage.getItem("userImg_minimi"),
        }
      })
        .then((res) => {
          console.log(res);
          //alert(JSON.stringify(res.data));
          setVisitorData(res.data);
          setVisitorBook("");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };
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
          <div id="rightcontainer_visitor">
            <div className="container_visitor">
              <div>
                <WritingZone
                  visitorBook={visitorBook}
                  onChange={onChange}
                  onClick={onClick}
                />
              </div>
              <div>
                {
                  visitorData.slice(offset, offset+limit).map((item) => (
                    <VisitorBook item={item} key={item.board_no} />))
                }
                <Pagination
                  total={visitorData.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const WritingZone = ({ visitorBook, onChange, onClick }) => {
  return (
    <>
      <div>
        {/* 기능 안됨 zone */}
        <div className="topBtn" style={{ marginBottom: "2%" }}>
          <button
            type="button"
            style={{ position: "relative", float: "right" }}
          >
            방명록관리
          </button>
          <button
            type="button"
            style={{
              position: "relative",
              float: "right",
              marginRight: "1%",
            }}
          >
            글꼴설정
          </button>
        </div>
        {/* 기능 안됨 zone */}
        <div id="writing">
          <div id="writingImgAndText">
            {/* 본인이미지 */}
            <img className="writingProfileImg" src={localStorage.getItem("userImg_minimi")} alt="userprofileImg" />
            <textarea
              id="innerGuest"
              className="visitorBook"
              name="guestText"
              rows="10"
              cols="33"
              onChange={onChange}
              value={visitorBook}
            ></textarea>
          </div>
          <button
            className="visitorbookBtn"
            onClick={onClick}
          >
            확인
          </button>
        </div>
      </div>

    </>
  );
};
export default MyWorldVisitorRight;