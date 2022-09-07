import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";/* , BrowserRouter, Route  */
import "./MyWorldDiaryLeft.css";

const DiaryTest_addFolder = () => {
    const [boldFont, setBold] = useState(1);

    const toggleList = () => {
        const inList = document.getElementById("inList");
        if (inList.style.display === "none") {
            inList.style.display = "flex";
        } else {
            inList.style.display = "none";
        }
    }

    const createFolder = () => {
        //const ul = document.createElement("ul");
        const div = document.createElement("div");
        const li = document.createElement("li");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const button2 = document.createElement("button");
        const cancelbutton = document.createElement("button");
        const cancelbutton2 = document.createElement("button");
        const deletebutton = document.createElement("button");
        const diaryList = document.getElementById("diaryList");

        li.className = 'listAdd';
        div.className = 'divAdd';

        input.style.width = "150px";
        input.style.height = "20px";
        input.style.fontSize = "10pt";

        button.style.width = "35px";
        button.style.height = "20px";
        button.style.marginRight = "5px";
        button.style.backgroundColor = "#298FA6";
        button.style.border = "none";
        button.style.color = "white";
        button.style.fontSize = "8pt";
        button.innerText = "등록";

        button2.style.width = "35px";
        button2.style.height = "20px";
        button2.style.marginRight = "5px";
        button2.style.backgroundColor = "#298FA6";
        button2.style.border = "none";
        button2.style.color = "white";
        button2.style.fontSize = "8pt";
        button2.innerText = "등록";

        cancelbutton.style.width = "35px";
        cancelbutton.style.height = "20px";
        cancelbutton.style.marginRight = "5px";
        cancelbutton.style.border = "none";
        cancelbutton.style.fontSize = "8pt";
        cancelbutton.innerText = "취소";

        cancelbutton2.style.width = "35px";
        cancelbutton2.style.height = "20px";
        cancelbutton2.style.marginRight = "5px";
        cancelbutton2.style.border = "none";
        cancelbutton2.style.fontSize = "8pt";
        cancelbutton2.innerText = "취소";

        deletebutton.style.width = "35px";
        deletebutton.style.height = "20px";
        deletebutton.style.backgroundColor = "#D42E3E";
        deletebutton.style.border = "none";
        deletebutton.style.color = "white";
        deletebutton.style.fontSize = "8pt";
        deletebutton.innerText = "삭제";

        diaryList.appendChild(div);
        div.appendChild(li);
        div.appendChild(input);
        div.appendChild(button);
        div.appendChild(cancelbutton);

        button.addEventListener("click", () => {
            //alert(input.value); 
            li.className = "list";
            li.innerHTML = input.value;
            div.removeChild(input);
            div.removeChild(button);
            div.removeChild(cancelbutton);
            axios.post('/addDiaryFolder', null, {
                params: {

                }
            });
        });
        cancelbutton.addEventListener("click", () => {
            diaryList.removeChild(div);
            // div.removeChild(li);
            // div.removeChild(input);
            // div.removeChild(button);
            // div.removeChild(cancelbutton);
            // div.removeChild(deletebutton);
        });

        li.addEventListener("click", () => {
            div.appendChild(input);
            input.value = li.innerHTML;
            li.className = "listAdd";
            li.innerHTML = "";
            div.appendChild(button2);
            div.appendChild(cancelbutton2);
            div.appendChild(deletebutton);
        });

        button2.addEventListener("click", () => {
            //alert(input.value); 
            li.className = "list";
            li.innerHTML = input.value;
            div.removeChild(input);
            div.removeChild(button2);
            div.removeChild(cancelbutton2);
            div.removeChild(deletebutton);
            axios.post('/updateDiaryFolder', null, {
                params: {

                }
            });
        });
        cancelbutton2.addEventListener("click", () => {
            //alert(input.value); 
            li.className = "list";
            li.innerHTML = input.value;
            div.removeChild(input);
            div.removeChild(button2);
            div.removeChild(cancelbutton2);
            div.removeChild(deletebutton);
        });
        deletebutton.addEventListener("click", () => {
            diaryList.removeChild(div);
            // div.removeChild(li);
            // div.removeChild(input);
            // div.removeChild(button);
            // div.removeChild(cancelbutton2);
            // div.removeChild(deletebutton);
            axios.post('/deleteDiaryFolder', null, {
                params: {

                }
            });
        });
    }

    return (
        <div id="diaryLeftContainer">
            <div id="smallContainer">
                <span className="bold">DIARY</span>
                <div id="diaryList">
                    <div style={{ fontSize: '10pt', color: 'rgb(79, 79, 79)', marginLeft: '210px' }} onClick={createFolder}>폴더 추가 <img src='../img/folder_add.png' width='15' alt='folder_add' /></div>
                    <Link
                        to="/myworlddiary"
                        style={{ textDecoration: 'none' }}
                        onClick={(() => setBold(1), toggleList)}
                    >
                        <li
                            className="list"
                            style={
                                boldFont === 1
                                    ? { fontWeight: "bold" }
                                    : { fontWeight: "" }
                            }
                        >
                            내 다이어리
                        </li>
                    </Link>
                    <ul className="toggleList" style={{ display: "block" }} >
                        <Link to="/myworlddiary" style={{ textDecoration: 'none' }} onClick={() => setBold(2)}>
                            <li
                                className="list"
                                id="inList"
                                style={
                                    boldFont === 2
                                        ? { fontWeight: "bold" }
                                        : { fontWeight: "" }
                                }
                            >
                                <img src='./img/folder.png' width='12' height='12' style={{ marginRight: '5px' }} />내 일기장
                            </li>
                        </Link>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default DiaryTest_addFolder;