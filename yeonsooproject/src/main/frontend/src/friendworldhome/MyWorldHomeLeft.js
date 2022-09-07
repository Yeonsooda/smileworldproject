import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './MyWorldHomeLeft.css';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

const Today = () => {
    const [feelings, setFeelings] = useState(localStorage.getItem('userEmoti_myworldHome'));    
    const onHandleChange = (e) => {        
        setFeelings(e.target.value)
        //alert(feelings)
    }    
    useEffect(() => {
        console.log(feelings);
        //alert(feelings)
        /* axios 감정 이모티콘 저장 */
        axios.post('/updateUserEmoti_myworldHome', null, {
            params: {
                userId: localStorage.getItem('userId'),
                userEmoti_myworldHome: feelings
            },
            headers: { "content-type": "application/json" },
        })
        .then((res) => {
            console.log(res);
            localStorage.setItem('userEmoti_myworldHome', feelings);
        })
        .catch((err) => {
            console.log(err);
        })   
  
    }, [feelings]);        

    return (
        <div id="today">
            TODAY IS...
            <select
                id="feelings"
                value={feelings}
                onChange={onHandleChange}            >
                <option value="delight">기쁨😁</option>
                <option value="happy">행복😊</option>
                <option value="angry">화남😡</option>
                <option value="excited">슬픔😭</option>
                <option value="annoying">짜증남😒</option>
                <option value="hungry">배고픔🤤</option>
            </select>
        </div>
    );
};

const Info = () => {
    const [infoValue, setInfoValue] = useState(localStorage.getItem('userInfo_myworldHome'));
    //const [editValue, setEditValue] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isOk, setIsOk] = useState(false);
  
    const onClickedEdit = () => {
        setInfoValue("");
        setIsEdit(true);

        const input = document.createElement("input");
        const button = document.createElement("button");
        const deleteButton = document.createElement("button");
        const edit = document.getElementById("editView"); 
    
        button.style.width = "50px";
        button.style.height = "30px";
        button.style.marginTop = "5px";
        button.style.marginRight = "10px";
        button.style.backgroundColor = "#298FA6"  
        button.style.border = "none"  
        button.style.color = "white"   
        button.innerText = "등록";

        deleteButton.style.width = "50px";
        deleteButton.style.height = "30px";
        deleteButton.style.marginTop = "10px";   
        //deleteButton.style.backgroundColor = "white"
        deleteButton.style.border = "none" 
        deleteButton.innerText = "취소";
        
        input.style.width = "200px";
        input.style.height = "180px";
        input.style.whiteSpace = "pre-wrap";         

        input.value = localStorage.getItem('userInfo_myworldHome');        
        //input.placeholder = "내용을 입력하세요."; 
       
        edit.appendChild(input);        
        edit.appendChild(button);
        edit.appendChild(deleteButton);
        button.addEventListener("click", () => {            
            setInfoValue(input.value);
            setIsOk(true);            
            //localStorage.setItem('userInfo_myworldHome', infoValue);
            edit.removeChild(input);
            edit.removeChild(button);
            edit.removeChild(deleteButton);
        });
        deleteButton.addEventListener("click", () => {                        
            setInfoValue(localStorage.getItem('userInfo_myworldHome'));
            setIsEdit(false);
            edit.removeChild(input);
            edit.removeChild(button);
            edit.removeChild(deleteButton);
        });   
    }

    const onSubmitInfo = () => {
        axios.post('/updateUserInfo_myworldHome', null, {
            params: {
                userId: localStorage.getItem('userId'),
                userInfo_myworldHome: infoValue
            },
            headers: { "content-type": "application/json" },
        })
        .then((res) => {
            console.log(res);
            setIsEdit(false);
            setIsOk(false);
            localStorage.setItem("userInfo_myworldHome", infoValue);
            alert("소개글 등록 완료");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div id="info">
                {infoValue}
                <div id="editView"></div>
            </div>

            <div id="edit">
                {
                    !isEdit && 
                        <>
                        <span style={{ color: "#298FA6" }}>▶</span>
                        <span style={{ fontWeight: "bold" }} onClick={onClickedEdit}>
                            EDIT
                        </span>
                        </>
                }
                {
                    isEdit && isOk &&
                        <>
                        <span style={{ color: "rgb(253, 117, 7)" }}>▶</span>
                        <span style={{ fontWeight: "bold" }} onClick={onSubmitInfo}>
                            OK
                        </span>
                        </>
                }             
            </div>
        </>
    );
};

const PsyInfo = () => {
    return (
        <div id="psyInfo">
            <span style={{ fontSize: "12pt", color: "#298FA6" }}>{localStorage.getItem('userNickname')}{"\u00A0"}
                                                                <img src={localStorage.getItem('userImg_gender')}/>{"\u00A0"}
                                                                <span style={{ fontSize: "10pt", color: "black" }}>{/* #E66E28 */}
                                                                    {localStorage.getItem('userBirth')}
                                                                </span>
            </span>            
        </div>
    );
};

const MyWorldHomeLeft = () => {
    /* 유저 정보에 집어넣어야 되겠다 */
    let chk = localStorage.getItem("check");
    let ttl = localStorage.getItem("total");
    if (chk == null) {
        localStorage.setItem("check", 1);
    } else {
        chk++;
        localStorage.setItem("check", chk);
    }
    if (ttl == null) {
        localStorage.setItem("total", 1);
    } else {
        ttl++;
        localStorage.setItem("total", ttl);
    }

    const [Image, setImage] = useState(localStorage.getItem('userProfile_myworldHome'));
    //alert(localStorage.getItem('userProfile_myworldHome'))
    const [file, setFile] = useState("");

    const fileInput = useRef(null);
    const onChange = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0])            
            //alert(JSON.stringify(file))
            //alert(JSON.stringify(Image))
        }else{ //업로드 취소할 시
            setImage(localStorage.getItem('userProfile_myworldHome'))
            return
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)   
                //alert(Image)             
            }
        }
        reader.readAsDataURL(e.target.files[0])
        }
    
    const toProfileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userProfile_myworldHome', file)
        formData.append('userId', localStorage.getItem('userId'))
        /* axios로 전달 */
        axios.post('/updateUserProfile_myworldHome', formData, {
            /*{ params: {
                userId: localStorage.getItem('userId'),
                userProfile_myworldHome: Image
            },*/ 
            headers: { "content-type": `multipart/form-data` },
        })
        .then((res) => {
            console.log(res);
            //alert(JSON.stringify(res));
            //alert(JSON.stringify(res.data.userProfile_myworldHome));            
            setImage(res.data.userProfile_myworldHome);         
            console.log(Image);
            localStorage.setItem('userProfile_myworldHome', Image);
            alert('사진등록 완료')
        })
        .catch((err) => {
            console.log(err);
            alert('사진등록 실패')
        })   
    }

    return (
        <div id="outerleft">
            <div id="dotleft">
                <div className='todayCnt'>
                    <p style={{ fontSize: "15px" }}>
                        <span>Today&nbsp;&nbsp;</span>
                        <span id="check" style={{ color: "red" }}>
                            {chk}
                        </span>
                        <span>
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;TOTAL {ttl}
                            <span id="ttlchk"></span>
                        </span>
                    </p>
                </div>

                <div id="ifleft_MyWorld">
                    <div id="leftcontainer">
                        <Today />
                        <img 
                            src={Image}
                            style={{margin:'10px'}} 
                            /* size={200} */
                            width='200' 
                            height='200'
                            onClick={()=>{fileInput.current.click()}}/>
                        <input 
                            type='file' 
                            style={{display:'none'}}
                            accept='image/gif, image/jpg, impge/png, image/jpeg' 
                            name='profile_img'
                            onChange={onChange}
                            ref={fileInput}/>            
                        <div id="editProfile">
                            <span style={{ color: "rgb(253, 117, 7)" }}>▶</span>
                            <span style={{ fontWeight: "bold" }} onClick={toProfileUpload}>
                                OK
                            </span>
                        </div> 

                        <Info />
                        <PsyInfo />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWorldHomeLeft;