import React from "react";
import secureLocalStorage from 'react-secure-storage';
import "styles/AlarmModal.scss";
import HeartMessage from "assets/images/ReceivedHeart.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const ReceivedHeartAlarm = ({onClose, tableNumber, time}) => {

  const onAccept = () => {
    const response = fetchData('http://150.230.252.177:5000/send-like');
    if (response == null) {
      return response;
    }

    if(response.result && response.result !== 'fail') {
      // TODO : 합석 대기 모달 띄워야함
      alert('수락 완료!');
    } else {
      alert('수락 실패... 관리자에게 문의해주세요');
    }

    return response;
  }

  const onReject = () => {
    const response = fetchData('http://150.230.252.177:5000/reject');
    if (response == null) {
      return response;
    }

    if (response.result && response.result !== 'fail') {
      alert('거절 완료!');
    } else {
      alert('거절 실패... 관리자에게 문의해주세요');
    }

    return response;
  }

  const fetchData = async(url) => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
	method: 'POST',
	headers: {'Content-Type': 'application/json',},
	body: JSON.stringify({
	  'token': secureLocalStorage.getItem('token'),
          'code' : secureLocalStorage.getItem('code'),
	  'received_table' : tableNumber,
	}),
      })
      .then((res) => res.json())
      return response;
    } catch (error) {
      alert('에러가 발생했습니다!');
      return null;
    }
  }

  return (
    <div className="leftTimeAlarmBox receivedHeartBox">
      <div className="alarmTop">
        <div className="leftTimeImg">
          <img src={HeartMessage} alt="alarm img"></img>
        </div>
        <div className="lefTimeMessage">
          <span className="alarmSpanMiddle">
          { tableNumber  }번 테이블에서 하트를 보냈습니다.
          </span>
          <span className="alarmSpanSmall">
	  { time }
          </span>
        </div>
        <div className="alarmCloseBtn" onClick={onClose}>
          <img src={CloseBtn} alt="close img"></img>
        </div>
      </div>
      <div className="alarmBtnBox">
        {/* TODO: 만약 합석이 수락된다면 합석대기 모달, 아니라면 거절 처리 */}
	{/* TODO: onClick에 수락/거절 이후 UI 블라인드 처리 필요 */}
        <button className="blueBtn" onClick={onAccept}>합석</button>
        <button className="pinkBtn" onClick={onReject}>거절</button>
      </div>
      <div className="alertSpan">
        <span>합석 버튼을 클릭하면 다른 테이블의 메세지는 클릭할 수 없습니다.</span>
      </div>
    </div>
  );
}

export default ReceivedHeartAlarm;
