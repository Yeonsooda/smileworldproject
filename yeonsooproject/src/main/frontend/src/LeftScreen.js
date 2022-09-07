import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLeft from './main/MainLeft';
import MainLoginLeft from './main/MainLoginLeft';
import MyWorldDiaryLeft from './myworlddiary/MyWorldDiaryLeft';
import MyWorldHomeLeft from './myworldhome/MyWorldHomeLeft';
import MyWorldPhotoLeft from './myworldphoto/MyWorldPhotoLeft';
import MyWorldAdminLeft from './myworldadmin/MyWorldAdminLeft';

import FriendWorldHomeLeft from './friendworldhome/MyWorldHomeLeft';

const LeftScreen = () => {
    return (        
        <Routes>
            {localStorage.getItem('userId') === null ? 
            <Route path="/" element={<MainLeft/>} exact /> : <Route path="/" element={<MainLoginLeft/>} />}            
            <Route path="/signup" element={<MainLeft/>} />
            <Route path="/userUpdateForm" element={<MainLoginLeft/>} />
            <Route path="/myworld" element={<MyWorldHomeLeft/>} />
                         
            <Route path="/friendworld">
                <Route path=":userId" element={<FriendWorldHomeLeft/>} />
            </Route>
            
            <Route path="/myworldprofile" element={<MyWorldHomeLeft/>} />
            <Route path="/myworldprofile_editor" element={<MyWorldHomeLeft/>} />  

            <Route path="/myworlddiary" element={<MyWorldDiaryLeft/>} />
            <Route path="/myworldphoto" element={<MyWorldPhotoLeft/>} /> {/* 사진첩 view */}
            <Route path="/myworldphoto_editor" element={<MyWorldPhotoLeft/>} />  {/* 사진첩 write */}

            <Route path="/myworldvisitor" element={<MyWorldHomeLeft/>} />
            <Route path="/myworldadmin" element={<MyWorldAdminLeft/>} />

        </Routes>
    );
};

export default LeftScreen;