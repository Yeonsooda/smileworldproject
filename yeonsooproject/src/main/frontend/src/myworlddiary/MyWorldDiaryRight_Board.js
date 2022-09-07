import moment from "moment";
import React, { useEffect, useState } from "react";
import "./MyWorldDiaryRight.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './Calendar2.css'; // css import
import axios from "axios";

import Pagination from "./Pagination";
import Pagination_cmt from "./Pagination_cmt";


const Writing = () => {

  const [data, setData] = useState([]);
  /* diaryboard 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(1);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  const [diaryInfo, setDiaryInfo] = useState({ title: "", content: "", }); //id=0 제거
  const { title, content } = diaryInfo;

  useEffect(() => {
    axios.post('/getDiaryBoardList', null, {
      params: {
        board_userId: localStorage.getItem("userId"),
      }
    })
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res));
        setData(res.data);
        //alert(JSON.stringify(folderData));
      })
      .catch((err) => {
        console.log(err)
      });
  }, [])

  const setNew = (e) => {
    //alert(e.target.id)
    //alert(JSON.stringify(diaryInfo))
    const { name, value } = e.target;
    setDiaryInfo({
      ...diaryInfo,
      [name]: value,
    });
    //alert(JSON.stringify(diaryInfo)) 
  };

  const addDiary = () => {
    if (title === "") {
      alert("제목을 입력해주세요!")
    } else if (content === "") {
      alert("내용을 입력해주세요!")
    } else {
      axios.post('/writeDiaryBoard', null, {
        params: {
          board_title: title,
          board_content: content,
          board_folderNo: 0,
          board_userId: localStorage.getItem("userId"),
          board_userNickname: localStorage.getItem("userNickname"),
        }
      })
        .then((res) => {
          console.log(res);
          //alert(JSON.stringify(res.data));
          setData(res.data);
          setDiaryInfo({
            title: "",
            content: "",
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  const [value, onChange] = useState(new Date());

  return (
    <>
      {/* <div className="diaryTitle">
        <h3 style={{ fontSize: "17pt", textAlign: 'left' }}>{localStorage.getItem('userNickname')}님의 다이어리</h3>
        <hr style={{ margin: 'auto' }} width='600' />
      </div> */}
      <div id="writeContainer">

        <div className='calendarContainer'>
          <div style={{ fontSize: '8pt' }}>
            <Calendar onChange={onChange} value={value} />
            <div className="text-gray-500 mt-4" style={{ display: 'none' }}>
              {moment(value).format("YYYY-MM-DD-")}
            </div>
          </div>
        </div>

        <div id="write">
          <div className="writeDiaryBtnContainer">
            <span style={{ color: "rgb(253, 117, 7)", fontSize: "10pt" }}>▶</span>
            <span style={{ fontWeight: "bold", fontSize: "10pt" }} onClick={addDiary}>
              OK
            </span>
          </div>
          <div className="diaryFormTitleDiv">
            Title
          </div>
          <textarea
            placeholder="제목을 입력하세요."
            id="diaryTitle"
            name="title"
            rows="1"
            cols="40"/* "54" */
            minLength="1"
            style={{resize: 'none'}}
            value={title}
            onChange={setNew}
            overflow='auto'
          />
          <div className="diaryFormTitleDiv">Content</div>
          <textarea
            placeholder="내용을 입력하세요."
            id="diaryContent"
            name="content"
            rows="8"
            cols="40"/* "54" */
            minLength="1"
            style={{resize: 'none'}}
            value={content}
            onChange={setNew}
          />
        </div>

      </div>
      {/* 진짜 데이터 저장 후 가져올게욤! */}
      {/* 페이지네이션 */}
      {
        data.slice(offset, offset + limit).map(item => <CreateDiary key={item.id} item={item} />)
      }
      <Pagination 
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

const CreateDiary = (props) => {  
  //alert(JSON.stringify(props))
  //alert(props.item.board_no)
  /* diarycmt 페이징처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(3);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  const [cmtData, setCmtData] = useState([]);
  const [cmt, setCmt] = useState("");

  /* useEffect(() => { */
    axios.post('/getDiaryCommentList', null, {
      params: {
        cmt_boardNo: props.item.board_no,
        cmt_userId_host: localStorage.getItem("userId"),
        cmt_userId_writer: localStorage.getItem("userId"),
      }
    })
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res));
        setCmtData(res.data);
        //alert(JSON.stringify(folderData));
      })
      .catch((err) => {
        console.log(err)
      });
  /* }, []) */

  const writeCmt = (e) => {
    setCmt(e.target.value);
    //alert(cmt)
  }
  const addCmt = (e) => {
    //alert(e.target.value)
    if (cmt === "") {
      alert("댓글을 입력해주세요!")
    } else {
      axios.post('/writeDiaryComment', null, {
        params: {
          cmt_content: cmt,//`${cmt} (${localStorage.getItem("userNickname")})`,
          cmt_boardNo: e.target.value,
          cmt_userId_host: localStorage.getItem("userId"),
          cmt_userId_writer: localStorage.getItem("userId"),
          cmt_userNickname_writer: localStorage.getItem("userNickname"),
        }
      })
        .then((res) => {
          console.log(res);
          //alert(JSON.stringify(res.data));
          setCmtData(res.data);
          setCmt("");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  const deleteDiary = (e) => {
    //alert(props.item.board_no);
    if(window.confirm("정말로 삭제하시겠습니까?")) {
      axios.post('/deleteDiary', null, {
        params: {
          cmt_boardNo: props.item.board_no,
          cmt_userId_host: localStorage.getItem("userId"),
          board_no: props.item.board_no,
          board_userId: localStorage.getItem("userId"),
        }
      })
        .then((res) => {
          console.log(res);
          //alert(JSON.stringify(JSON.stringify(res)));
          window.location.reload('/myworlddiary');
        })
        .catch((err) => {
          console.log(err);
        })
    } 
  }

  return (
    <div id="diary">
      <div id="content">

        <div className="DeleteDiaryBtnContainer">
          <span className="bold" style={{float: "left"}}>{props.item.board_title}</span>
          <span style={{ float: "right"}}>
          <span style={{ color: "#D42E3E", fontSize: "10pt"/*  marginLeft: "509px" */ }}>▶</span>
          <span style={{ fontWeight: "bold", fontSize: "10pt"}} onClick={deleteDiary}>
            DEL
          </span>
          </span>
        </div>
        <br/><br/>       
        <div className='diaryContentView'>{props.item.board_content}</div>
        {/* <br /> */}
        {/* 공개설정은 설정이 불가능함 */}
        <div id="setting"><span style={{ fontSize: '9pt' }}>공개설정 : 전체공개</span>
          <span>{"\u00a0"}{"\u00a0"}{"\u00a0"}{"\u00a0"}</span>
          <span style={{ fontSize: '9pt' }}>작성일 : {props.item.date_created} </span>
        </div>
      </div>
      {/* 댓글 입력창 */}
      <div id="diarycomment" className="diarycomment">
        <div id="cmtWrite">
          <span>댓글 :</span>
          <input
            id="cmt"
            placeholder="댓글을 입력하세요."
            value={cmt}
            onChange={writeCmt}
            style={{ border: '1px solid gray' }}
          />
          <button className='cmtBtn' value={props.item.board_no} onClick={addCmt}>등록</button>
        </div>
      <div id="cmtList" className="cmtList">
        <ul>
          {
            cmtData.slice(offset, offset + limit).map((item) => <li className="cmtLi" key={item.cmt_no}>
              {item.cmt_content} <span style={{color: "#298fa6"}}>({item.cmt_userNickname_writer})</span>
            </li>)
          }          
        </ul>
        <Pagination_cmt 
          total={cmtData.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
      </div>
    </div>
  );
}

const MyWorldDiaryRight_Board = (props) => {
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit

  return (
    <div id="diaryRightContainer">
      <Writing />
    </div>
  );
}

export default MyWorldDiaryRight_Board;