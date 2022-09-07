import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MainRight.css';
import './MainUserUpdateFormRight.css';
import img02 from './image/searchicon.png';
import img05 from './image/miniroom.gif';
import img06 from './image/miniroom2.gif';
import img07 from './image/miniroom3.gif';

const MainUserUpdateFormRight = () => {
    /* ckeditor 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("profileKey", "0"); //프로필
    sessionStorage.setItem("photoKey", "0"); //사진첩 write
    sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
    /* 미니룸 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("isMinimi", false);
    sessionStorage.setItem("isMiniroom", false);

    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [userPwd, setUserPwd] = useState("");
    const [userPwdCheck, setUserPwdCheck] = useState("");    
    const [userNickname, setUserNickname] = useState(localStorage.getItem("userNickname"));
    const [userBirth, setUserBirth] = useState(localStorage.getItem("userBirth"));
    const [userGender, setUserGender] = useState(localStorage.getItem("userGender"));

    const handleChange = (e) => {
        console.log(e.target.value);
        setUserGender(e.target.value);
    };

    const [userPwdError, setUserPwdError] = useState(false);
    const [userPwdCheckError, setUserPwdCheckError] = useState(false);
    const [userNicknameError, setUserNicknameError] = useState(false);
    const [userBirthError, setUserBirthError] = useState(false);

    const onChangeUserPwd = (e) => {
        const userPwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if ((!e.target.value || (userPwdRegex.test(e.target.value)))) setUserPwdError(false);
        else setUserPwdError(true);

        if (!userPwdCheck || e.target.value === userPwdCheck) setUserPwdCheckError(false);
        else setUserPwdCheckError(true);
        setUserPwd(e.target.value);
    }

    const onChangeUserPwdCheck = (e) => {
        if (userPwd === e.target.value) setUserPwdCheckError(false);
        else setUserPwdCheckError(true);
        setUserPwdCheck(e.target.value);
    }

    const onChangeUserNickname = (e) => {
        setUserNicknameError(false);
        setUserNickname(e.target.value);
    }

    const onChangeUserBirth = (e) => {
        setUserBirthError(false);
        setUserBirth(e.target.value);
    }

    const validation = () => {        
        if (!userPwd) setUserPwdError(true);
        if (!userPwdCheck) setUserPwdCheckError(true);
        if (!userNickname) setUserNicknameError(true);
        if (!userBirth) setUserBirthError(true);


        if (userPwd && userPwdCheck && userNickname && userBirth) return (false);
        else return true;
    }

    const navigate = useNavigate();

    const onSubmit = () => {
        if (validation()) return;
        //API call
        else {
            const form = new FormData()
            form.append('userId', userId)
            form.append('userPwd', userPwd)
            form.append('userNickname', userNickname)
            form.append('userBirth', userBirth)
            form.append('userGender', userGender)

            axios.post('/userUpdate', form, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then((res) => {
                console.log(res);
                //alert(JSON.stringify(res.data));         
                localStorage.setItem('userNickname', res.data.userNickname);
                localStorage.setItem('userBirth', res.data.userBirth);
                localStorage.setItem('userGender', res.data.userGender);
                localStorage.setItem('userImg_minimi', res.data.userImg_minimi);
                localStorage.setItem('userImg_gender', res.data.userImg_gender);
                localStorage.setItem('userProfile_myworldHome', res.data.userProfile_myworldHome);
                window.alert('회원정보 수정 완료');
                //navigate('/');
                window.location.replace('/');
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    
    const onReset = () => {
        window.location.replace('/userUpdateForm');
    }

    return (
        <div id="outerright">
            <div id="dotright">
                <div className='search'>
                    <input type='text' value='' placeholder="검색어를 입력하세요!" className='searchKeyword' />
                    <button className='searchBtn' type='submit'><img src={img02} alt='search' width='20' /></button>
                </div>
                <div id="ifright">
                    <div className='updateFormContainer_main'>
                        <Container className="panel">
                            <div className="updateFormMsg">
                                <h3 style={{fontSize:"15pt", textAlign: 'left'}}>회원정보 수정</h3>
                                <hr style={{margin:'auto'}} width='425' />
                            </div> 
                            <Form> 
                                {/* 에러메시지 구역 */}
                                <Form.Group as={Row}>                                   
                                    { userPwdError || userPwdCheckError || userNicknameError || userBirthError ? 
                                        <Alert variant="danger" style={{ fontSize: 12 }}>
                                            {userPwdError ?
                                                <div>비밀번호는 최소 8자 이상이어야 합니다.(문자, 숫자, 특수문자 반드시 포함)</div> : null}
                                            {userPwdCheckError ?
                                                <div>입력하신 비밀번호가 일치하지 않습니다.</div> : null}
                                            {userNicknameError ?
                                                <div>닉네임을 입력해주세요.</div> : null}
                                            {userBirthError ?
                                                <div>생년월일을 입력해주세요.</div> : null}
                                        </Alert>
                                        : null}
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm >
                                        <div className='updateFormTitle'>아이디</div>
                                        <Form.Control style={{fontSize: 14}} value={userId} disabled />                                        
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm>
                                        <span className='updateFormTitle'>비밀번호</span>
                                        <Form.Control maxLength={20} placeholder='비밀번호 입력' style={{ fontSize: 14 }} value={userPwd} type={"password"} onChange={onChangeUserPwd} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm>
                                        <span className='updateFormTitle'>비밀번호 재확인</span>
                                        <Form.Control maxLength={20} placeholder='비밀번호 입력' style={{ fontSize: 14 }} value={userPwdCheck} type={"password"} onChange={onChangeUserPwdCheck} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm>
                                        <span className='updateFormTitle'>닉네임</span>
                                        <Form.Control maxLength={20} placeholder='닉네임 입력' style={{ fontSize: 14 }} value={userNickname} onChange={onChangeUserNickname} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm>
                                        <span className='updateFormTitle'>생년월일</span>
                                        <Form.Control value={userBirth} style={{ fontSize: 15 }} type="date" onChange={onChangeUserBirth} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Col sm>
                                        <span className='updateFormTitle'>성별</span>
                                        <div className='genderDiv'>
                                            <Form.Check inline label="남자" value="남자" name={userGender} type="radio" onChange={handleChange} checked={userGender === '남자'} />
                                            <Form.Check inline label="여자" value="여자" name={userGender} type="radio" onChange={handleChange} checked={userGender === '여자'} />
                                        </div>
                                    </Col>
                                </Form.Group>

                                {/* <div className="grid gap-1" style={{ marginBottom: 10 }}> */}
                                    <Button variant="primary" className="updateBtn" onClick={onSubmit}>
                                        회원정보 수정
                                    </Button>
                                    {"\u00A0"}{"\u00A0"}
                                    <Button variant="secondary" className="updateBtn" onClick={onReset}>
                                        다시작성
                                    </Button>
                                {/* </div> */}

                                {/* <span style={{ fontSize: 14 }}>기존 회원이신가요? <Link to="/" className="link">로그인</Link></span> */}
                            </Form>

                        </Container>
                        <div className='ad'>
                            <img src={img05} alt='miniroom1' width='250' height='180' />
                            <img src={img06} alt='miniroom2' width='250' height='180' />
                            <img src={img07} alt='miniroom3' width='250' height='180' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainUserUpdateFormRight;