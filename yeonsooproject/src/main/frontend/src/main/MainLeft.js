import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; //, useNavigate
import './MainLeft.css';
import img01 from './image/logo2.png';

const MainLeft = () => {
    const [userId, setUserId] = useState('')
    const [userPwd, setUserPwd] = useState('')

    const idRef = useRef(null)

    const onChangeUserId = (e) => {
        const { value } = e.target
        setUserId(value)
    }

    const onChangeUserPwd = (e) => {
        const { value } = e.target
        setUserPwd(value)
    }
    //const navigate = useNavigate();

    function login() { /* 시간되면 알럿 부트스트랩으로 바꾸기 */
        if (userId.trim() === "") {
            window.alert("아이디를 입력해주세요!");
        } else if (userPwd.trim() === "") {
            window.alert("비밀번호를 입력해주세요!");
        } else {
            axios.post("/userLogin",
                null,
                { params: { userId: userId, userPwd: userPwd } }
            ).then(function (res) {
                console.log(res.data);
                if (res.data !== null && res.data !== "") {
                    console.log("로그인 성공");
                    localStorage.clear();
                    localStorage.setItem('userNo', res.data.userNo);
                    /* 세션스토리지 사용하면 로그인 불가하지만 다시 방법 알아보기 */
                    localStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('userNickname', res.data.userNickname);
                    localStorage.setItem('userBirth', res.data.userBirth);
                    localStorage.setItem('userGender', res.data.userGender);
                    localStorage.setItem('userImg_minimi', res.data.userImg_minimi);
                    localStorage.setItem('userImg_miniroom', res.data.userImg_miniroom);
                    localStorage.setItem('userImg_gender', res.data.userImg_gender);
                    localStorage.setItem('userProfile_myworldHome', res.data.userProfile_myworldHome);
                    localStorage.setItem('userEmoti_myworldHome', res.data.userEmoti_myworldHome);
                    localStorage.setItem('userInfo_myworldHome', res.data.userInfo_myworldHome);
                    localStorage.setItem('userTitle_myworldHome', res.data.userTitle_myworldHome);
                    localStorage.setItem('userLogtime', res.data.userLogtime);
                    //navigate('/');
                    window.location.replace('/');
                } else {
                    window.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
                    setUserId("");
                    setUserPwd("");
                }
            }).catch(function (err) {
                console.log(`Error Message: ${err}`);
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
                    <div className="loginContainer">                        
                            <h3 style={{ fontSize: "17pt" }}>회원 로그인</h3>
                            <hr style={{ margin: 'auto' }} width='285' />                        
                        <br />
                        <table className='loginContainer_sub'>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="아이디를 입력하세요!" value={userId} onChange={onChangeUserId} ref={idRef} className="loginInput" />
                                    </td>
                                    <td rowSpan='2'>
                                        <button className='loginBtn' onClick={() => login()}>로그인</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="password" placeholder="비밀번호를 입력하세요!" value={userPwd} onChange={onChangeUserPwd} className="loginInput" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="loginEtcContainer">
                        <p className='loginEtcFont'>
                            아직 스마일 월드 회원이 아니신가요?
                            <Link to="/signup">
                                <button className='signupBtn'>회원가입</button>
                            </Link>
                        </p>
                        <p className='loginEtcFont'>
                            아이디 또는 비밀번호를 잊으셨나요?
                            <button className='finderBtn' >아이디/비밀번호 찾기</button>
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default MainLeft;