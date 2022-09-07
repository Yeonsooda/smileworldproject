import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyWorldBtn from '../myworldhome/MyWorldBtn';
import MyWorldMusic from '../myworldhome/MyWorldMusic';
import './MyWorldProfileRight.css';
import parse from 'html-react-parser';
import '../CKEditor_content.css'

const MyWorldProfileRight_View = () => {
    /* ckeditor 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("profileKey", "0"); //프로필
    sessionStorage.setItem("photoKey", "0"); //사진첩 write
    sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
    
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
        window.close();
        window.open("/", "_parent");
    }

    /* viewContent */
    //alert(`나는 로컬스토리지 ${localStorage.getItem("viewContent")}`)
    //alert(document.getElementById("myworldProfileRight_ViewContainer").innerHTML())
    //const [content, setContent] = useState("프로필을 등록해주세요!");
    const [content, setContent] = useState("") //localStorage.getItem("viewContent")
    /* () => 
                                localStorage.getItem("viewContent") === 'undefined' 
                                || localStorage.getItem("viewContent") === null 
                                || localStorage.getItem("viewContent") === "" 
                                ? "프로필을 등록해주세요!:)"
                                : localStorage.getItem("viewContent"))  */

    /*  useEffect(() => { */
    axios.post('/getMyworldProfile', null, {
        params: {
            myworldProfile_userId: localStorage.getItem('userId'),
        }
    })
        .then((res) => {
            console.log(res)
            //alert(content) //미입력 상태(null)일때는 useState 설정에 따라 컨텐트 값 입력됨
            //alert(JSON.stringify(res)) //미입력 상태(null)일때는 ""
            //alert(JSON.stringify(res.data.myworldProfile_profileContent)) //미입력 상태(null)일때는 undefined
            if (res.data.myworldProfile_profileContent === undefined) {
                setContent("프로필을 등록해주세요!:)")
                localStorage.setItem("viewContent", "프로필을 등록해주세요!:)")
            } else {
                //setContent(res.data.myworldProfile_profileContent)
                //alert(content)//미입력 상태(null)일때는 useState 설정에 따라 컨텐트 값 입력됨
                //alert(`나는 컨텐트 ${content}`)
                setContent(res.data.myworldProfile_profileContent)
                localStorage.setItem("viewContent", res.data.myworldProfile_profileContent)

                //alert(`나는 로컬스토리지2 ${localStorage.getItem("viewContent")}`) 
            }
        })
        .catch((err) => {
            console.log(err)
        })
    /* }, [])  */

    const onClickEditAtView = () => {
        window.location.replace('/myworldprofile_editor')
        //  localStorage.getItem("viewContent") === 'undefined' 
        // || localStorage.getItem("viewContent") === null 
        // || localStorage.getItem("viewContent") === "" 
        localStorage.getItem("viewContent") === "프로필을 등록해주세요!:)"
            ? localStorage.setItem("viewContent", "")
            : localStorage.setItem("viewContent", localStorage.getItem("viewContent"))
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

                        <div className="profileEditContainer">
                            <div className="profileEditTitle">
                                <h3 style={{ fontSize: "17pt", textAlign: 'left' }}>{localStorage.getItem('userNickname')}님의 프로필</h3>
                                <hr style={{ margin: 'auto' }} width='609.5' />
                            </div>
                            <div className='profileViewToEditBtnContainer'>
                                <span style={{ color: "#298FA6", fontSize: "10pt", marginLeft: "540px" }}>▶</span>
                                <span style={{ fontWeight: "bold", fontSize: "10pt" }} onClick={onClickEditAtView}>
                                    EDIT
                                </span>
                            </div>
                            <div className='ck-content' id='myworldProfileRight_ViewContainer'>

                                {
                                    /* content === 'undefined'  || content === null  || content === ""  && */
                                    content === "프로필을 등록해주세요!:)"
                                        ? "프로필을 등록해주세요!:)" : parse(content)
                                    /* parse(<p>"프로필을 등록해주세요!:)"</p>) */
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};


export default MyWorldProfileRight_View;