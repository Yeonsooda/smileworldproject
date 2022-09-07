import React from 'react';
import ReactAudioPlayer from "react-audio-player";
import musicimg from "./image/music.png";
import music from "./비가오는날엔.mp3";
import './MyWorldMusic.css';

const MyWorldMusic = () => {
    return (
        <div id="psyworldhome">
            <div id="musicouter">
                <div id="musicinner">
                    <div
                        style={{
                            fontSize: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <img
                            src={musicimg}
                            alt="music"
                            width="20px"
                            height="20px"
                            style={{ margin: "10px" }}
                        />
                        비스트-비가 오는 날엔(On Rainy Days)
                    </div>
                </div>
                <ReactAudioPlayer id="music" src={music} autoPlay controls />
            </div>            
        </div>
    );
};

export default MyWorldMusic;