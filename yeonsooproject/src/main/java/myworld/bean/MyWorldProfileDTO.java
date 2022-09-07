package myworld.bean;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldProfileDTO {
	//private int myworldProfile_profileNo;
	private String myworldProfile_profileContent, myworldProfile_userId, myworldProfile_boardName;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;
}