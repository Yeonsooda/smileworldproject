package myworld.bean;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldDiaryCommentDTO {
	private int cmt_no, cmt_boardNo;
	private String cmt_content, cmt_userId_host, cmt_userId_writer, cmt_userNickname_writer;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;
}
