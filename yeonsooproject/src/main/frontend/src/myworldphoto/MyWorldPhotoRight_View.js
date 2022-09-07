import React, { useEffect, useState } from "react";
import "./MyWorldPhotoRight.css";
import parse from 'html-react-parser';
import '../CKEditor_content.css'
import axios from "axios";
import Pagination_cmt from "./Pagination_cmt";

const MyWorldPhotoRight_View = (props) => {
  //alert("props"+JSON.stringify(props.item.board_no))
  //alert("props"+JSON.stringify(props))
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
  /* 미니룸 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("isMinimi", false);
  sessionStorage.setItem("isMiniroom", false);

  const [cmtData, setCmtData] = useState([]);
  const [cmt, setCmt] = useState("");

  useEffect(() => {
    axios.post('/getPhotoCommentList', null, {
      params: {
        cmt_boardNo: props.item.board_no,
        cmt_userId_host: localStorage.getItem("userId"),
        cmt_userId_writer: localStorage.getItem("userId")
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
  }, [])

  const writeCmt_photo = (e) => {
    setCmt(e.target.value)
  }
  const addCmt_photo = (e) => {
    //alert(JSON.stringify(props.item.board_no))
    if (cmt === "") {
      alert("댓글을 입력해주세요!")
    } else {
      axios.post('/writePhotoComment', null, {
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

  /* 사진첩 삭제  */
  const deletePhoto = () => {
    //alert(props.item.board_no)
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios.post('/deletePhoto', null, {
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

  /* diaryboard 페이징 처리 */
  // 페이지당 제한하고 싶은 게시물의 갯수
  const [limit, setLimit] = useState(5);
  // 페이지
  const [page, setPage] = useState(1);
  // 해당 페이지의 첫게시물의 위치계산 
  const offset = (page - 1) * limit;

  return (
    <>
      <div style={{ fontSize: '13pt', color: 'rgb(79, 79, 79)', marginRight: '640px', marginBottom: '-25px' }}
        onClick={() => {
          window.location.replace("/myworldphoto_editor");
          localStorage.setItem("isshowWrite", true);
        }}>사진 추가 <img src='../img/folder_add.png' width='15' alt='folder_add' /></div>
      <div className="photoAlbumContainer"/* id="container" */>
        <div id="picDiv1" className="pic">
          <div className="picInfo">
            <span
              style={{ fontSize: "15pt", position: "relative", top: "10%" }}
            >
              {/* title */}
              {props.item.board_title}
            </span>

            <button
              className="copyBtn"
              type="button"
              style={{ position: "relative", top: "9%", border: "1px gray solid" }}
            >
              주소복사
            </button>
          </div>

          <div className="picWho" >
            <span style={{ color: "#298fa6", float: "left" }}>{props.item.board_userNickname}</span>
            <span style={{float: "right" /* position: "relative", left: "73.5%"  */}}>
              {/* date */}
              {props.item.date_created}
            </span>
          </div>

          <div className="picContentContainer">
            <div className="picContent">
              {/* content */}
              {parse(props.item.board_content)}
            </div>

            <hr
              style={{
                borderStyle: "dotted",
                borderColor: "gray",
                marginBottom: "-10px",
                width: "750px"
              }}
            />
            </div>

            <div className="everyBtnContainer">
              <div className="everyBtn" style={{ marginLeft: "2%" }}>
                <span style={{ float: "left", color: "#A3A3A3" }}>
                  공개 설정 : 비공개
                </span>
                <span style={{ float: "right", color: "#bc8e5e" }}>
                  <span onClick={() => {
                    /* 수정창에서 띄울 데이터를 여기서 받아주기 */
                    axios.post("/getPhotoBoard", null, {
                      params: {
                        board_no: props.item.board_no, //localStorage.getItem("photoBoard_no_forEdit"),
                        board_userId: localStorage.getItem("userId"),
                      },
                      headers: { "content-type": "application/json" }
                    })
                      .then((res) => {
                        console.log(res);
                        //alert(res.data.board_title)
                        // setTitle(res.data.board_title);
                        // setContent(res.data.board_content);            
                        localStorage.setItem("viewTitle_photo", res.data.board_title);
                        localStorage.setItem("viewContent_photo", res.data.board_content);
                        //alert(localStorage.getItem("viewContent_photo"));
                        //alert("가져온타이틀"+title)
                        //alert("가져온컨텐츠"+content)
                      })
                      .catch((res) => {
                        console.log(res);
                      });
                    localStorage.setItem("isshowWrite", false);
                    localStorage.setItem("photoBoard_no_forEdit", props.item.board_no);
                    sessionStorage.setItem("photoKey_edit", "0");
                    window.location.replace("/myworldphoto_editor");
                  }}>수정</span>
                  <span>   |   </span>
                  <span onClick={deletePhoto}>삭제</span>
                </span>
              </div>
            </div>
          {/* </div> */}
          <hr
            style={{
              borderStyle: "dotted",
              borderColor: "gray",
              marginTop: "5px",
              width: "750px"
            }}
          />

          <div className="photocommentContainer">
            <div id="photocomment1" className="photocomment" style={{ padding: "1%" }} >
              {
                cmtData.slice(offset, offset + limit).map((item) => <div className="photocommentList" key={item.cmt_id} >
                  {item.cmt_content} <span style={{ color: "#298fa6" }}>({item.cmt_userNickname_writer})</span>
                </div>)
              }

            </div>
            {/* 페이지네이션 */}
            <div style={{ marginTop: "10px", marginBottom: "-10px" }}>
              <Pagination_cmt
                total={cmtData.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>

            <div id="picToPicSpace"></div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <form
              style={{
                textAlign: "center",
              }}
            >
              댓글{"\u00A0"}{"\u00A0"}
              <input id="photocommentText1" type="text" size="30" value={cmt} onChange={writeCmt_photo} />
              <button type="button" style={{ border: "1px gray solid" }} onClick={addCmt_photo/* () => addCmt_photo(1) */}>
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyWorldPhotoRight_View;