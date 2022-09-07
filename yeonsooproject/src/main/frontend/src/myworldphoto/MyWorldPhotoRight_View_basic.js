import React from 'react';

const MyWorldPhotoRight_View_basic = () => {
  /* ckeditor 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("profileKey", "0"); //프로필
  sessionStorage.setItem("photoKey", "0"); //사진첩 write
  sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
  /* 미니룸 수정 중 이동 시 키 변경 */
  sessionStorage.setItem("isMinimi", false);
  sessionStorage.setItem("isMiniroom", false);
  
    return (
        <>
            <div style={{ fontSize: '13pt', color: 'rgb(79, 79, 79)', marginRight: '640px', marginBottom: '-25px' }}
                onClick={() => {window.location.replace("/myworldphoto_editor")
                                localStorage.setItem("isshowWrite", true);
                                }}>사진 추가 <img src='../img/folder_add.png' width='15' alt='folder_add' /></div>
            <div className="photoAlbumContainer"/* id="container" */>
                <div id="picDiv1" className="pic">
                    <div className="picInfo">
                        <span
                            style={{ fontSize: "15pt", position: "relative", top: "10%" }}
                        >
                            {/* title */}
                            등록된 사진이 없어요! 사진을 등록해주세요!😊
                        </span >

                        <button
                            className="copyBtn"
                            type="button"
                            style={{ position: "relative", top: "9%", border: "1px gray solid" }}
                        >
                            주소복사
                        </button>
                    </div>

                    <div className="picWho" >
                        <span style={{ color: "#298fa6" }}>사이월드</span>
                        <span style={{ position: "relative", left: "68.5%" }}>
                            {/* date - 현재시간으로 바꾸면 좋을 듯*/}
                            {localStorage.getItem("userLogtime")}
                        </span>
                    </div>

                    <div className="picContentContainer">
                        <div className="picContent">
                            {/* content */}
                            <figure class='image'><img src='./img/photoboard_basic.jpg' /></figure>
                        </div>

                        <hr
                            style={{
                                borderStyle: "dotted",
                                borderColor: "gray",
                                marginBottom: "-10px",
                                width: "750px"
                            }}
                        />
                        <div className="everyBtnContainer">
                            <div className="everyBtn" style={{ marginLeft: "2%" }}>
                                <span style={{ float: "left", color: "#A3A3A3" }}>
                                    공개 설정 : 비공개
                                </span>
                                <span style={{ float: "right", color: "#bc8e5e" }}>
                                    <span>수정</span>
                                    <span>   |   </span>
                                    <span>삭제</span>
                                </span>
                            </div>
                        </div>
                    </div>
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
                            <input id="photocommentText1" type="text" size="30" disabled />
                            <button type="button" style={{ border: "1px gray solid" }} >
                                저장
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyWorldPhotoRight_View_basic;