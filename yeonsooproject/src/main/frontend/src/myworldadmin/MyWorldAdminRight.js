import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyWorldBtn from '../myworldhome/MyWorldBtn';
import MyWorldMusic from '../myworldhome/MyWorldMusic';
import "./MyWorldAdminRight.css";

const MyWorldAdminRight = () => {
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit

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
    window.open.replace("/", "_parent");
  }

  const [userImg_minimi, setUserImg_minimi] = useState(sessionStorage.getItem("isMinimi") === "true"
    ? sessionStorage.getItem("userImg_minimi") : localStorage.getItem("userImg_minimi"));
  const [userImg_miniroom, setUserImg_miniroom] = useState(sessionStorage.getItem("isMiniroom") === "true"
    ? sessionStorage.getItem("userImg_miniroom") : localStorage.getItem("userImg_miniroom"));

  const [minimiData, setMinimiData] = useState([]);
  const [miniroomData, setMiniroomData] = useState([]);

  useEffect(() => {
    axios.post("/getAdminMinimiList", null)
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res));
        setMinimiData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    axios.post("/getAdminMiniroomList", null)
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res));
        setMiniroomData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const changeMinimi = (e) => {
    //alert(e.target.value)
    sessionStorage.setItem("isMinimi", true);
    sessionStorage.setItem("userImg_minimi", e.target.value);
    setUserImg_minimi(sessionStorage.getItem("userImg_minimi"));
    //alert(sessionStorage.getItem("isMinimi"))
  }

  //alert(sessionStorage.getItem("isMiniroom"))
  const changeMiniroom = (e) => {
    //alert(e.target.value)
    sessionStorage.setItem("isMiniroom", true);
    sessionStorage.setItem("userImg_miniroom", e.target.value);
    setUserImg_miniroom(sessionStorage.getItem("userImg_miniroom"));
  }

  const onSubmitMiniroom = () => {
    axios.post('/updateUserMiniroom', null, {
      params: {
        userId: localStorage.getItem("userId"),
        userImg_minimi: userImg_minimi,
        userImg_miniroom: userImg_miniroom,
      }
    })
      .then((res) => {
        console.log(res);
        //alert(JSON.stringify(res));
        sessionStorage.setItem("isMinimi", false);
        sessionStorage.setItem("isMiniroom", false);
        // setUserImg_minimi(res.data);
        // setUserImg_miniroom(res.data);
        localStorage.setItem("userImg_minimi", res.data.userImg_minimi);
        localStorage.setItem("userImg_miniroom", res.data.userImg_miniroom);
        window.location.reload('/myworldadmin')
      })
      .catch((err) => {
        console.log(err)
      });
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
          <div id="rightcontainer_admin">

            <div className='adminContainer'>

              <div id="miniroom_admin">
                <span className="bold"><span style={{ marginRight: "560px" }}>My miniroom</span>
                  <span style={{ color: "rgb(253, 117, 7)" }}>▶</span>
                  <span style={{ fontWeight: "bold", color: "black" }} onClick={onSubmitMiniroom}>
                    OK
                  </span>
                </span>
                <img src={userImg_miniroom} alt="miniroom" id="miniroomImg" />
                <img src={userImg_minimi} alt="minimi" id="minimiImg" />
              </div>
              <div>
              </div>

            </div>

            <div className='selectContainer'>
              <div id="selectContainer_sub_minimi">
                <span className="bold">Chocie minimi</span>

                <div className='selectMinimi'>
                  {
                    minimiData.map((item) => <><input key={item.minimi_no} type="radio" className="minimi" value={item.minimi_value} label={item.minimi_label}
                      name={userImg_minimi} checked={userImg_minimi === item.minimi_value} onChange={changeMinimi} />
                      <img alt="" src={item.minimi_value} width="70px" height="100px" /></>)
                  }
                </div>
              </div>

              <div id="selectContainer_sub_miniroom" >
                <span className="bold">Chocie miniroom</span>
                <div className='selectMiniroom'>
                  {

                    miniroomData.map((item) => <><input key={item.miniroom_no} type="radio" className="minimiroom" value={item.miniroom_value} label={item.miniroom_label}
                      name={userImg_miniroom} checked={userImg_miniroom === item.miniroom_value} onChange={changeMiniroom} />
                      <img alt="" src={item.miniroom_value} width="200px" height="150px" /></>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWorldAdminRight;