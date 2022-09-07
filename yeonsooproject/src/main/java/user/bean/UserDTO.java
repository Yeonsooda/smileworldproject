package user.bean;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class UserDTO {
	private int userNo;
	private String userId, userPwd, userNickname, userBirth, userGender, userImg_minimi, userImg_miniroom, userImg_gender, userProfile_myworldHome, userEmoti_myworldHome, userInfo_myworldHome, userTitle_myworldHome, userAuth, userSalt, userSocial, userKakaoId, userGrade; // 
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd HH:MM:SS", timezone = "Asia/Seoul")
	private LocalDateTime userLogtime;
}
