import React from 'react';
import MainRight from './main/MainRight';
import { Route, Routes } from 'react-router-dom';
import MainSignupRight from './main/MainSignupRight';
import MainUserUpdateFormRight from './main/MainUserUpdateFormRight';
import MyWorldHomeRight from './myworldhome/MyWorldHomeRight';
import MyWorldProfileRight from './myworldprofile/MyWorldProfileRight';
import MyWorldProfileRight_View from './myworldprofile/MyWorldProfileRight_View';
import MyWorldDiaryRight from './myworlddiary/MyWorldDiaryRight';
import MyWorldPhotoRight from './myworldphoto/MyWorldPhotoRight';
import MyWorldPhotoRight_Write from './myworldphoto/MyWorldPhotoRight_Write';

import MyWorldVisitorRight from './myworldvisitor/MyWorldVisitorRight';
import MyWorldAdminRight from './myworldadmin/MyWorldAdminRight';

import FriendWorldHomeRight from './friendworldhome/MyWorldHomeRight';

const RightScreen = () => {
    return (
       
        <Routes>
            <Route path="/" element={<MainRight/>} exact />
            <Route path="/signup" element={<MainSignupRight/>} />
            <Route path="/login" element={<MainRight/>} />
            <Route path="/userUpdateForm" element={<MainUserUpdateFormRight/>} />
            <Route path="/myworld" element={<MyWorldHomeRight/>} />
            
            <Route path="/friendworld">
                <Route path=":userId" element={<FriendWorldHomeRight/>} />
            </Route>

            <Route path="/myworldprofile" element={<MyWorldProfileRight_View/>} /> {/* 프로필 뷰 */}
            <Route path="/myworldprofile_editor" element={<MyWorldProfileRight/>} />  {/* 프로필 작성 및 수정 */}
            <Route path="/myworlddiary" element={<MyWorldDiaryRight/>} />
            {/* <Route path='/member' >
            <Route path=':memberId' element={<MemberDetail/>}/>
            </Route> */}
            <Route path="/myworldphoto" element={<MyWorldPhotoRight/>} />  {/* 사진첩 view */}
            <Route path="/myworldphoto_editor" element={<MyWorldPhotoRight_Write/>} /> {/* 사진첩 쓰기 */}
            
            <Route path="/myworldvisitor" element={<MyWorldVisitorRight/>} />
            <Route path="/myworldadmin" element={<MyWorldAdminRight/>} />
        </Routes>            
        
    );
};

export default RightScreen;