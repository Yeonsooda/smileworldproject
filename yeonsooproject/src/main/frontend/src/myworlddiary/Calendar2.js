import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './Calendar2.css'; // css import

const Calendar2 = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div style={{fontSize: '8pt'}}>
            <Calendar onChange={onChange} value={value}/>
            {/* <div className="text-gray-500 mt-4">
                {moment(value).format("YYYY년 MM월 DD일")}                 
            </div> */}
        </div>
    );
};

export default Calendar2;