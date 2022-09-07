import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './MyWorldAdminLeft.css';
import menubar_sub from "./image/menubar_sub.png"

const MyWorldAdminLeft = () => {
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

    const [boldFont, setBold] = useState(1);

    const toggleList = () => {
        const inList = document.getElementById("inList_adminFolder");
        if (inList.style.display === "none") {
            inList.style.display = "flex";
        } else {
            inList.style.display = "none";
        };
        setBold(1);
    }

    useEffect(() => {
        /* 여기!! */
        axios.post('/getAdminFolderList', null, {
            params: {
                folder_userId: localStorage.getItem("userId"),
            }
        })
            .then((res) => {
                console.log(res);
                //alert(JSON.stringify(res));
                setFolderData(res.data);
                //alert(JSON.stringify(folderData));
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const [folderData, setFolderData] = useState([]);
    const createFolder = () => {
        const div = document.createElement("div");
        const li = document.createElement("li");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const cancelbutton = document.createElement("button");
        const adminList2 = document.getElementById("adminList2");

        li.className = 'listAdd_adminFolder';
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

        cancelbutton.style.width = "35px";
        cancelbutton.style.height = "20px";
        cancelbutton.style.marginRight = "5px";
        cancelbutton.style.border = "none";
        cancelbutton.style.fontSize = "8pt";
        cancelbutton.innerText = "취소";

        adminList2.appendChild(div);
        div.appendChild(li);
        div.appendChild(input);
        div.appendChild(button);
        div.appendChild(cancelbutton);

        /* 여기! */
        button.addEventListener("click", () => {
            if (input.value === "") {
                alert("폴더명을 입력해주세요!")
            } else {
                //alert(input.value); 
                axios.post('/addAdminFolder', null, {
                    params: {
                        folder_name: input.value,
                        folder_userId: localStorage.getItem("userId"),
                    }
                })
                    .then((res) => {
                        console.log(res);
                        //alert(JSON.stringify(res));
                        div.removeChild(li);
                        div.removeChild(input);
                        div.removeChild(button);
                        div.removeChild(cancelbutton);
                        setFolderData(res.data);
                        //alert(JSON.stringify(folderData));
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        });

        cancelbutton.addEventListener("click", () => {
            adminList2.removeChild(div);
        });
    }

    const editFolderName = (e) => {
        //alert("클릭클릭")
        //alert(e.target.id)
        //alert(e.target.value)

        const div = document.getElementById(e.target.value);
        const li = document.getElementById(e.target.id);
        localStorage.setItem("li.innerHTML", li.innerHTML);
        const input = document.createElement("input");
        const button2 = document.createElement("button");
        const cancelbutton2 = document.createElement("button");
        const deletebutton = document.createElement("button");
        const adminList2 = document.getElementById("adminList2");

        input.style.width = "150px";
        input.style.height = "20px";
        input.style.fontSize = "10pt";

        button2.style.width = "35px";
        button2.style.height = "20px";
        button2.style.marginRight = "5px";
        button2.style.backgroundColor = "#298FA6";
        button2.style.border = "none";
        button2.style.color = "white";
        button2.style.fontSize = "8pt";
        button2.innerText = "등록";

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

        /* 수정화면 띄우기 */
        input.value = li.innerHTML;
        li.innerHTML = "";
        li.className = "listAdd_adminFolder";
        div.appendChild(li);
        div.appendChild(input);
        div.appendChild(button2);
        div.appendChild(cancelbutton2);
        div.appendChild(deletebutton);

        /* 여기!! */
        /* 폴더명 업데이트 */
        button2.addEventListener("click", () => {
            //alert(input.value);
            //alert(e.target.value); 
            if (input.value === "") {
                alert("폴더명을 입력해주세요!")
            } else {
                axios.post('/updateAdminFolder', null, {
                    params: {
                        folder_name: input.value,
                        folder_userId: localStorage.getItem("userId"),
                        folder_no: e.target.value
                    }
                })
                    .then((res) => {
                        console.log(res)
                        //alert(JSON.stringify(res.data))
                        li.className = "list_adminFolder";
                        li.innerHTML = input.value;

                        //div.removeChild(li);
                        div.removeChild(input);
                        div.removeChild(button2);
                        div.removeChild(cancelbutton2);
                        div.removeChild(deletebutton);
                        setFolderData(res.data);
                        //window.location.reload('/myworldadmin')
                        //alert(JSON.stringify(folderData));
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        });

        /* 폴더명 업데이트 취소*/
        cancelbutton2.addEventListener("click", () => {
            li.className = "list_adminFolder";
            li.innerHTML = localStorage.getItem("li.innerHTML");
            div.removeChild(input);
            div.removeChild(button2);
            div.removeChild(cancelbutton2);
            div.removeChild(deletebutton);
        });

        /* 여기!! */
        /* 폴더명 삭제 */
        deletebutton.addEventListener("click", () => {
            axios.post('/deleteAdminFolder', null, {
                params: {
                    folder_userId: localStorage.getItem("userId"),
                    folder_no: e.target.value
                }
            })
                .then((res) => {
                    console.log(res)
                    //alert(JSON.stringify(res))
                    adminList2.removeChild(div);
                })
                .catch((err) => {
                    console.log(err)
                });
        });
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

                    <div id="adminLeftContainer">
                            <div id="smallContainer">
                                <span className="bold">Admin</span>
                                <div id="adminList" >
                                    <div style={{ fontSize: '10pt', color: 'rgb(79, 79, 79)', marginLeft: '210px' }}
                                        onClick={createFolder}>폴더 추가 <img src='../img/folder_add.png' width='15' alt='folder_add' /></div>
                                    <Link
                                        to="/myworldadmin"
                                        className='adminLink'
                                        style={{ textDecoration: 'none' }}
                                        onClick={(() => setBold(1), toggleList)}
                                    >
                                        <li
                                            className="list_adminFolder"
                                            style={
                                                boldFont === 1
                                                    ? { fontWeight: "bold" }
                                                    : { fontWeight: "" }
                                            }
                                        >
                                            미니홈피관리
                                        </li>
                                    </Link>
                                    <ul className="toggleList" style={{ display: "block" }} >
                                        <Link to="/myworldadmin" style={{ textDecoration: 'none' }} onClick={() => setBold(2)}>
                                            <li
                                                className="list_adminFolder"
                                                id="inList_adminFolder"
                                                style={
                                                    boldFont === 2
                                                        ? { fontWeight: "bold" }
                                                        : { fontWeight: "" }
                                                }
                                            >
                                                <img src={menubar_sub} width='12' height='12' style={{ marginRight: '5px' }} />힝속았지?
                                            </li>
                                        </Link>
                                    </ul>
                                </div>

                                {/* folderList를 조로록 가져와 볼게요 */}
                                <div id="adminList2">
                                    {
                                        folderData.map((item) => <div className="divAdd" id={item.folder_no} key={item.folder_no}>
                                            <li className="list_adminFolder" value={item.folder_no} id={Math.random()} onClick={editFolderName}>
                                                {item.folder_name}
                                            </li>
                                        </div>)
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

export default MyWorldAdminLeft;