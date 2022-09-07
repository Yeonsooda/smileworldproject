import React, { useState } from 'react';
import "./MyWorldBtn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const MyWorldBtn = () => {
  //alert(localStorage.getItem("toggleBtn"))
  //alert(sessionStorage.getItem("toggleBtn"))
  const [toggle, setToggle] = useState(() => sessionStorage.getItem("toggleBtn") === null
    || sessionStorage.getItem("toggleBtn") === ""
    || sessionStorage.getItem("toggleBtn") === "undefined"
    ? 1 : sessionStorage.getItem("toggleBtn"));

  const navigate = useNavigate();

  /* 토글이 1로 돌아갔다 움직임 오류 수정 필요 
    => 새로고침 시 값이 초기화되지 않도록 세션스토리지 값을 활용함
    => (토글버튼이 바로 변하지 않고 2번만에 변함 / 윈도우창을 껐다 켜지 않는 이상 세션값이 살아있는 문제)*/
  return (
    <div className='myWorldBtn'>
      <Link to="/myworld"
        onClick={() => {
          setToggle(1)
          sessionStorage.setItem("toggleBtn", 1)
          //alert(sessionStorage.getItem("toggleBtn"))
        }}
        style={{ textDecoration: 'none' }} >
        <button
          style={{
            backgroundColor: toggle === 1 ? "white" : "#298fa6",
            color: toggle === 1 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(1)
            sessionStorage.setItem("toggleBtn", 1)
            //alert(sessionStorage.getItem("toggleBtn"))
            //navigate("/myworld")
          }}
        >
          홈
        </button>
      </Link>

      <Link to="/myworldprofile"
        onClick={() => {
          setToggle(2)
          sessionStorage.setItem("toggleBtn", 2)
          //alert(sessionStorage.getItem("toggleBtn"))
        }}
        style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: toggle === 2 ? "white" : "#298fa6",
            color: toggle === 2 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(2)
            sessionStorage.setItem("toggleBtn", 2)
            //alert(sessionStorage.getItem("toggleBtn"))
            //navigate("/myworldprofile" )

          }}
        >
          프로필
        </button>
      </Link>

      <Link to="/myworlddiary"
        onClick={() => {
          setToggle(3)
          sessionStorage.setItem("toggleBtn", 3)
          //alert(sessionStorage.getItem("toggleBtn"))
        }}
        style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: toggle === 3 ? "white" : "#298fa6",
            color: toggle === 3 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(3)
            sessionStorage.setItem("toggleBtn", 3)
            //alert(sessionStorage.getItem("toggleBtn"))
            //navigate("/myworlddiary")
          }}
        >
          다이어리
        </button>
      </Link>

      <Link to="/myworldphoto"
        onClick={() => {
          setToggle(4)
          sessionStorage.setItem("toggleBtn", 4)
          //alert(sessionStorage.getItem("toggleBtn"))
        }}
        style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: toggle === 4 ? "white" : "#298fa6",
            color: toggle === 4 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(4)
            sessionStorage.setItem("toggleBtn", 4)
            //alert(sessionStorage.getItem("toggleBtn"))
            //navigate("/myworldphoto")
          }}
        >
          사진첩
        </button>
      </Link>

      <Link to="/myworldvisitor"
        onClick={() => {
          setToggle(5)
          sessionStorage.setItem("toggleBtn", 5)
          //alert(sessionStorage.getItem("toggleBtn"))    
        }}
        style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: toggle === 5 ? "white" : "#298fa6",
            color: toggle === 5 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(5)
            sessionStorage.setItem("toggleBtn", 5)
            //alert(sessionStorage.getItem("toggleBtn"))
            //navigate("/myworldvisitor")
          }}
        >
          방명록
        </button>
      </Link>

      <Link to="/myworldadmin"
        onClick={() => {
          setToggle(6)
          sessionStorage.setItem("toggleBtn", 6)
          //alert(sessionStorage.getItem("toggleBtn"))
          //alert(toggle)
        }}
        style={{ textDecoration: 'none' }}>
        <button
          style={{
            backgroundColor: toggle === 6 ? "white" : "#298fa6",
            color: toggle === 6 ? "#298fa6" : "white",
          }}
          onClick={() => {
            setToggle(6)
            sessionStorage.setItem("toggleBtn", 6)
            //alert(sessionStorage.getItem("toggleBtn"))
            //alert(toggle)
            //navigate('/myworldadmin');
          }}
        >
          관리
        </button>
      </Link>
    </div>
  );
};

export default MyWorldBtn;