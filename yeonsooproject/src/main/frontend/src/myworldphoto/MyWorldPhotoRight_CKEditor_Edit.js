import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios';
import { Button } from 'react-bootstrap';

const MyWorldPhotoRight_CKEditor_Edit = () => {
   
    //alert(JSON.stringify(props))
    //alert(localStorage.getItem("viewContent_photo"));
    //alert(localStorage.getItem("photoBoard_no_forEdit"));
    //alert(sessionStorage.getItem("photoKey_edit"))
    /* ckeditor 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("profileKey", "0"); //프로필
    sessionStorage.setItem("photoKey", "0"); //사진첩 write
    /* 미니룸 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("isMinimi", false);
    sessionStorage.setItem("isMiniroom", false);
    
    const [title, setTitle] = useState(() => sessionStorage.getItem("photoKey_edit") === "1" ? (sessionStorage.getItem("ckTitle_photo_edit")) : (localStorage.getItem("viewTitle_photo")));
    const [content, setContent] = useState(() => sessionStorage.getItem("photoKey_edit") === "1" ? (sessionStorage.getItem("ckContent_photo_edit")) : (localStorage.getItem("viewContent_photo"))); //sessionStorage.getItem("ckContent")
    
    // sessionStorage.setItem("ckTitle_photo_edit", e.target.value)
    // alert("나는 세션"+sessionStorage.getItem("ckTitle_photo_edit"))

    const custom_config = {
        extraPlugins: [MyCustomUploadAdapterPlugin], 
        removePlugins: ["Title"],
        placeholder: '내용을 입력해주세요!',       
        toolbar: {
            items: [ 
                "heading",
                "|",
                "alignment",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "fontFamily",
                "fontSize",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "uploadImage",
                "insertImage",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "undo",
                "redo"
            ]
        },
        image:{		
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    value: null,
                    label: 'Original'
                },
                {
                    name: 'resizeImage:40',
                    value: '40',
                    label: '40%'                    
                },
                {
                    name: 'resizeImage:60',
                    value: '60',
                    label: '60%'
                }
            ],
            toolbar: [ 
                "imageStyle:inline", 
                "imageStyle:block",  
                "imageStyle:side",
                "|",
                "toggleImageCaption", 
                "imageTextAlternative",
                "imageResize"]},
        table: {
            contentToolbar: ["tableColumn","tableRow","mergeTableCells"]}
    }

    /* update로 바꿔주기 */
    const onSubmitPhoto = () => {
        if (content === "") {
            alert("내용을 입력해주세요!")
        }
        //alert(data);
        else {
            axios.post("/updatePhotoBoard", null, {
                params: {
                    board_title: title,
                    board_content: content,
                    board_no: localStorage.getItem("photoBoard_no_forEdit"),
                    board_folderNo: 0,
                    board_userId: localStorage.getItem("userId"),
                    board_userNickname: localStorage.getItem("userNickname"),
                },
                headers: { "content-type": "application/json" }
            })
                .then((res) => {
                    console.log(res);
                    // localStorage.setItem("viewTitle_photo", title)
                    // localStorage.setItem("viewContent_photo", content)
                    alert("전송성공");
                    setTitle("");
                    setContent("");
                    sessionStorage.setItem("photoKey_edit", "0");
                    window.location.replace('/myworldphoto');
                })
                .catch((res) => {
                    console.log(res);
                })
        }

    }

    const onReset = () => {
        setContent("");
        sessionStorage.setItem("photoKey_edit", "0");
        window.location.replace('/myworldphoto');
    }

    const onChangePhotoTitle = (e) => {
        //alert(e.target.value)
        //setTitle(e.target.value);
        setTitle(sessionStorage.setItem("ckTitle_photo_edit", e.target.value))
        // alert("나는 세션"+sessionStorage.getItem("ckTitle_photo_edit"))
        sessionStorage.setItem("photoKey_edit", "1");
    }

    return (
        <>
            <div className="photoEditContainer">
                <div id="picEditDiv1" className="picEdit">
                    <div className='picTitleEditDiv'>
                        <textarea className="picTitleEdit" placeholder='제목을 입력해주세요!' name="title" value={title} onChange={onChangePhotoTitle}/>
                    </div> 

                    <div className="picContentEdit">
                    <CKEditor
                        required
                        editor={ClassicEditor}
                        config={custom_config}
                        data={content}
                        onChange={(event, editor) => {
                            const data2 = editor.getData();
                            //setContent(data2)
                            //alert(data2)
                            sessionStorage.setItem("ckContent_photo_edit", data2);
                            setContent(sessionStorage.getItem("ckContent_photo_edit"));
                            //alert("나는 세션"+sessionStorage.getItem("ckContent_photo_edit"))
                            sessionStorage.setItem("photoKey_edit", "1");
                        }}
                    />
                    <div className='photoEditBtnContainer'>
                        <Button variant="primary" className="photoEditBtn" onClick={onSubmitPhoto}>
                            수정
                        </Button>
                        {"\u00A0"}{"\u00A0"}
                        <Button variant="secondary" className="photoEditBtn" onClick={onReset}>
                            취소
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}

class MyUploadAdapter {
    constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
        // URL where to send files.
        this.url = `/uploadMyworldImg`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            //alert(JSON.stringify(response))
            //console.log(JSON.stringify(response))

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: `./img/${response.filename}`//response.url                
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        this.loader.file.then(result => {
            data.append('myworldImg', result);
            this.xhr.send(data);
        }
        )
    }
}
export default MyWorldPhotoRight_CKEditor_Edit;