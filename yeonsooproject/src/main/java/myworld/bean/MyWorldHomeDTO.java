package myworld.bean;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldHomeDTO {
	private int myworldHome_friendsmsgNo;
	private String myworldHome_userId_host, myworldHome_userId_writer, myworldHome_userNickname_writer, myworldHome_friendsmsgContent;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;
}
