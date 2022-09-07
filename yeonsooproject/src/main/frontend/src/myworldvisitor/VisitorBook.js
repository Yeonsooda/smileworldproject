import axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "./image/Home.png";
import "./MyWorldVisitorRight.css";
import Pagination_cmt from "./Pagination_cmt";

const VisitorBook = (props) => {
  //alert(JSON.stringify(props))
  const [cmtData, setCmtData] = useState([]);
  const [cmt, setCmt] = useState("");

  /* photoview 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(5);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  useEffect(() => {
    axios.post('/getVisitorCommentList', null, {
      params: {
        cmt_boardNo: props.item.board_no,
        cmt_userId_host: localStorage.getItem("userId"),
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
  }, []);

  const writeComment = (e) => {
    setCmt(e.target.value);
  }
  const submitComment = () => {
    if (cmt === "") {
      return;
    } else {
      axios.post('/writeVisitorComment', null, {
        params: {
          cmt_content: cmt,//`${cmt} (${localStorage.getItem("userNickname")})`,
          cmt_boardNo: props.item.board_no,
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
  };

  const deleteVisitorBook = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios.post('/deleteVisitorBook', null, {
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
          window.location.reload('/myworldvisitor');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  return (
    <>
      <div className="writed">
        <div className="writedInfo">
          <div className="infoLeft" >
            <span style={{ marginLeft: "2%" }}> No.{props.item.board_no}</span>
            <span style={{ marginLeft: "2%", color: "#298fa6" }}>
              {props.item.board_userNickname}
            </span>

            <img
              style={{
                width: "16px",
                height: "16px",
                marginLeft: "1px",
                display: "inline",
              }}
              src={Home}
              alt="Home"
            />
            <span style={{ marginLeft: "10px", color: "#AAABAD" }}>
              {/* 작성일 */}
              {props.item.date_created}
            </span>
          </div>

          <div className="infoLeft" >
            <span
              style={{ float: "right", marginLeft: "5px", marginRight: "5px" }}
            >
              신고
            </span>
            <span style={{ float: "right", marginLeft: "5px" }}>|</span>
            <span style={{ float: "right", marginLeft: "5px" }} onClick={deleteVisitorBook}>삭제</span>
            <span style={{ float: "right", marginLeft: "5px" }}>|</span>
            <span style={{ float: "right" }}>비밀로 하기</span>
          </div>
        </div>
        <div className="writedImgAndText">
          {/* 본인 이미지 */}
          <img className="writedProfileImg" src={props.item.board_userImgMinimi} alt="userprofileImg" />
          <textarea
            className="writedText"
            name="writedText"
            rows="10"
            cols="33"
            readOnly
          >
            {props.item.board_content}
          </textarea>
        </div>
        <div className="writeComment">
          {/* 댓글 조로록 */}

          <div id="parent2">
            {
              cmtData.slice(offset, offset+limit).map((item) => (
                <div className="visitorCmtDiv" key={item.cmt_no}>
                  {item.cmt_content} <span style={{ color: "#298fa6" }}>({item.cmt_userNickname_writer})</span>
                 {/*  <br />
                  <br /> */}
                </div>))
            }
            <Pagination_cmt
              total={cmtData.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>

          <div className="visitorCmtContainer">
            <textarea
              id="a2"
              className="commentText"
              name="guestText"
              rows="10"
              cols="33"
              value={cmt}
              onChange={(e) => writeComment(e)}
            ></textarea>
            <button
              className="visitorCmtBtn"
              onClick={submitComment}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorBook;
