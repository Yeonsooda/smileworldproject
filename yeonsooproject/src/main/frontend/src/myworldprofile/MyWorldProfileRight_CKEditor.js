import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './MyWorldProfileRight.css';

const MyWorldProfileRight_CKEditor = () => {
    //alert(sessionStorage.getItem("profileKey"))
    //alert(localStorage.getItem("viewContent"));

    /* ckeditor 수정 중 이동 시 키 변경 */
    sessionStorage.setItem("photoKey", "0"); //사진첩 write
    sessionStorage.setItem("photoKey_edit", "0"); //사진첩 edit
    
    const [content, setContent] = useState(() => sessionStorage.getItem("profileKey") === '1' ? (sessionStorage.getItem("ckContent")) : (localStorage.getItem("viewContent"))); //sessionStorage.getItem("ckContent")
    const custom_config = {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        removePlugins: ["Title"],
        placeholder: '프로필을 입력해주세요!',
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
        image: {
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
                "imageResize"]
        },
        table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
        }
    }

    const onSubmitProfile = () => {
        if (content === "") {
            alert("프로필을 입력해주세요!")
        }
        //alert(data);
        else {
            axios.post("/writeMyworldProfile", null, {
                params: {
                    myworldProfile_profileContent: content,
                    myworldProfile_userId: localStorage.getItem("userId")
                },
                headers: { "content-type": "application/json" }
            })
                .then((res) => {
                    console.log(res);
                    localStorage.setItem("viewContent", content)
                    alert("전송성공");
                    setContent("");
                    window.location.replace('/myworldprofile');
                })
                .catch((res) => {
                    console.log(res);
                })
        }
    }

    const onReset = () => {
        window.location.replace('/myworldprofile');
        setContent("");
    }

    return (
        <>
            <div className="profileEditContainer">
                <div className="profileEditTitle">
                    <h3 style={{ fontSize: "17pt", textAlign: 'left' }}>{localStorage.getItem('userNickname')}님의 프로필</h3>
                    <hr style={{ margin: 'auto' }} width='609.5' />
                </div>
                <CKEditor
                    required
                    editor={ClassicEditor}
                    config={custom_config}
                    data={content}
                    onChange={(event, editor) => {
                        const data2 = editor.getData()
                        setContent(data2)
                        //alert(data2)
                        sessionStorage.setItem("ckContent", data2)
                        sessionStorage.setItem("profileKey", "1");
                        //alert(sessionStorage.getItem("profileKey"))
                    }}
                />
                <div className='profileEditBtnContainer'>
                    <Button variant="primary" className="profileEditBtn" onClick={onSubmitProfile}>
                        저장
                    </Button>
                    {"\u00A0"}{"\u00A0"}
                    <Button variant="secondary" className="profileEditBtn" onClick={onReset}>
                        취소
                    </Button>
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

export default React.memo(MyWorldProfileRight_CKEditor)