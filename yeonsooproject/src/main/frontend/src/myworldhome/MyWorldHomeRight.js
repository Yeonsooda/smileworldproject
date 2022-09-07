import React, { useEffect, useState } from "react";
import MyWorldBtn from "./MyWorldBtn";
import MyWorldMusic from "./MyWorldMusic";
import './MyWorldHomeRight.css';
import axios from "axios";
import Pagination from "./Pagination";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

/* 게시판 최신글 리스트 -> 게시판 다 만들고 다시 생성하기 => 글자수 자르기가 string 타입일때만 되가지고 땀방울이 자꾸 나옴 */
const CreateList = (props) => {
  return (
    <div id="list">
      <span className={props.catalog === "photo" ? "photo" : "board"}>
      </span>
      {/* <span>{props.title}</span> */}
      <span>      
       {
          JSON.stringify(props.title).substring(0, 25).substring(JSON.stringify(props.title).substring(0, 25).length-1, JSON.stringify(props.title).substring(0, 25).length)  === '"' ?
          JSON.parse(JSON.stringify(props.title).substring(0, 25))
          : JSON.parse(JSON.stringify(props.title).substring(0, 25).concat('"'))              
        }
      </span>
    </div>
  );
};

const MyWorldHomeRight = () => {
  const {userId} = useParams();

  //alert(localStorage.getItem('userImg_miniroom'))
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit

  /* 미니룸 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("isMinimi", false);
  sessionStorage.setItem("isMiniroom", false);
  
  /* 대문글 수정 */
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

  /* 일촌평 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(5);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  /* 일촌평 등록 */
  const [onelineSay, setOnelineSay] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post("/getMyworldHome_friensmsgList", null, {
      params: {
        myworldHome_userId_host: localStorage.getItem("userId")
      },
      headers: { "content-type": "application/json" }
    })
      .then(res => setData(res.data))
  }, [])

  const onOnelineSay = (e) => {
    const { value } = e.target
    setOnelineSay(value);
  }

  const addOneLineSay = () => {
    axios.post("/myworldHome_friendsmsg", null, {
      params: {
        myworldHome_friendsmsgContent: onelineSay, //`${onelineSay} (${localStorage.getItem('userNickname')})`,
        myworldHome_userId_host: localStorage.getItem('userId'),
        myworldHome_userId_writer: localStorage.getItem('userId'),
        myworldHome_userNickname_writer: localStorage.getItem('userNickname'),
      },
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        console.log(res)
        //alert(JSON.stringify(res.data))
        //localStorage.setItem("data", JSON.stringify(res.data));
        //alert(localStorage.getItem("data"));
        setData(res.data);
        setOnelineSay("");
        alert("일촌평 등록 완료")
      })
      .catch((res) => {
        console.log(res)
      })
  }

  /* 메인 홈으로 이동 */
  const toMainHome = () => {
    window.opener.location.reload();
    window.close();
    window.open("/", "_parent");
  }

  /* 메인 게시판 리스트 가져오기 */
  const [allboardData, setAllboardData] = useState([]);
  useEffect(() => {
    axios.post("/getMyworldAllBoardList", null, {
      params: {
        board_userId: localStorage.getItem('userId'),
        /* myworldProfile_userId: localStorage.getItem('userId'), */
      },
      headers: { "content-type": "application/json" }
    })
      .then((res) => {
        console.log(res);
        setAllboardData(res.data);
        //alert(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

   /* 메인 게시판 리스트 총글수 가져오기 */
    const [allboardCnt, setAllboardCnt] = useState([]);
    useEffect(() => {
      axios.post("/getMyworldAllBoardCnt", null, {
        params: {
          board_userId: localStorage.getItem('userId'),
          /* myworldProfile_userId: localStorage.getItem('userId'), */
        },
        headers: { "content-type": "application/json" }
      })
        .then((res) => {
          console.log(res);
          setAllboardCnt(res.data);
          //alert(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])

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
          <div id="rightcontainer">

            {/* 최신글 리스트 띄우기 */}
            <div id="news">
              <span className="bold">Updated news</span>
              <div id="newsBox">
                <div id="newsBoard"> 
                  {
                  allboardData.map((item, index) => 
                    <CreateList key={index} catalog={item.board_name} title={item.board_title} />)              
                 }

                </div>
                <div id="newsBoard" className="right">
                  <div id="list">
                    <span>다이어리 {allboardCnt.diaryBoardCnt} </span>
                    <span>{"\u00A0"}{"\u00A0"}사진첩 {allboardCnt.photoBoardCnt} </span>
                  </div>
                  <div id="list">
                    <span>방명록 {allboardCnt.visitorBoardCnt} </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 미니룸 : 관리 페이지 못만들면 이미지 업로더 기능으로 변경 */}            
            <div id="miniroom">
              <span className="bold">Miniroom</span> 
              <img src={localStorage.getItem('userImg_miniroom')} alt="miniroom" id="miniroomImg" /> 
              <img src={localStorage.getItem("userImg_minimi")} alt="minimi" id="minimiImg" /> {/* "./image/minimi_girl.png" */}
            </div>
            <div>
            </div>
              
            {/* 일촌평 */}
            <div id="friendSay">
              <span className="bold">What Friends Say <span style={{ color: "black", fontSize: "10pt" }}>{"\u00a0"}{"\u00a0"}한마디로 표현해봐~~!</span></span>

              <div id="inputSay">
                <span className="bold">Friends Say</span>
                <input
                  placeholder="내용을 입력하세요."
                  value={onelineSay}
                  onChange={onOnelineSay}
                />
                <button className="friendsMsgBtn" onClick={addOneLineSay}>확인</button>
              </div>
              <div id="sayList">
                {/* 일촌평 넣어지는 곳 새로운 데이터를 넣으면서 맵으로 쪼로로록 가져오기*/}
                <ul>
                  {
                    data.slice(offset, offset + limit).map((item, index) => <li className="friendsmsgLi" key={index}>
                      {item.myworldHome_friendsmsgContent} <Link to={`/friendworld/${item.myworldHome_userId_writer}`}><span style={{color: "#298fa6"}}>({item.myworldHome_userNickname_writer})</span></Link>
                    </li>)
                  }
                 {/*  {
                    data.slice(offset, offset + limit).map((item, index) => <li className="friendsmsgLi" key={index}>
                      {item.myworldHome_friendsmsgContent} <span style={{color: "#298fa6"}}>({item.myworldHome_userNickname_writer})</span>
                    </li>)
                  } */}
                </ul>
                <Pagination
                  total={data.length}
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


export default MyWorldHomeRight;
