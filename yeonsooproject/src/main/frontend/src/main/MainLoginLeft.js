import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainLeft.css';
import './MainLoginLeft.css';
import img01 from './image/logo2.png';

const MainLoginLeft = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.post("/getUser")
            .then(response => {
                setUserData(response.data);
            });
    }, []);
    //alert(JSON.stringify(userData))

    const { userNickname, userImg_minimi } = userData
    //const navigate = useNavigate();

    const onLogout = () => {
        axios.post("/userLogout",
        ).then(function (res) {
            localStorage.clear();
            console.log("로그아웃 성공");
            //navigate('/');
            window.location.replace('/');
            alert("로그아웃 성공")
        }).catch(function (err) {
            console.log(`Error Message: ${err}`);
        })
    }

    const goToMyWorld = () => {
        //window.open('/myworld', "_blank")
        window.open("/myworld", "PopupWin", "width=1500, height=700");  
    }    

    const onDelete = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")) {
        axios.post("/deleteUser", null, {
            params: {
              userId: localStorage.getItem("userId"),
            }
        }).then((res) => {
            console.log(res);
            console.log("회원탈퇴 완료");
            localStorage.clear();
            alert("회원탈퇴가 완료되었습니다!")
            //navigate('/');
            window.location.replace('/');
        }).catch((err) => {
            console.log(err);
        })
        }
    }

    return (
        <div id="outerleft">
            <div id="dotleft">
                <Link to='/'>
                    <div className='logo'>{/* 로고 클릭 시 홈으로 이동 시키기 */}
                        <img src={img01} alt='logo' width='200' /> {/* onClick={()=> {history.push('/')}} */}
                    </div>
                </Link>
                <div id="ifleft">
                    <div className="MyPageContainer">
                        {/* <div className="MyPageContainer_title">
                            <h3 style={{fontSize:"14pt", float: 'left'}} >{userNickname}님의 사이월드</h3>
                            <button style={{float:'right'}}>로그아웃</button>
                        </div> */}
                        <div className="MyPageContainer_title">
                            <h3 style={{ fontSize: "14pt" }} >{userNickname}님의 사이월드</h3>
                        </div>                        
                        {/* <hr className='MyPageContainer_titleLine' /> */}
                        <br />

                        <div className='MyPageContainer_sub'>
                            <img src={userImg_minimi} width='80' height='130' alt='minimi' />
                        </div>                       

                        <br />
                        <Link to="/userUpdateForm" className="MypageLink" >내 정보관리</Link>
                        {"\u00A0"}{"\u00A0"}|{"\u00A0"}{"\u00A0"}
                        <Link to="/" className="MypageLink" onClick={onLogout}>로그아웃</Link>
                        {/* 기능구현 필요 */}
                        {"\u00A0"}{"\u00A0"}|{"\u00A0"}{"\u00A0"}
                        <Link to="/" className="MypageLink" onClick={onDelete} style={{color: "gray"}}>회원탈퇴</Link>
                        <br /><br />
                        <button className='ToMyWorldBtn' onClick={goToMyWorld}>내 미니홈피 가기▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLoginLeft;