package myworld.bean;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldAllBoardDTO {
	private int board_no, board_folderNo, board_view_cnt, board_cmt_cnt;
	private String board_name, board_title, board_content, board_userId, board_userNickname, board_userImgMinimi;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;
  	
	private String myworldProfile_profileContent, myworldProfile_userId, myworldProfile_boardName;
}
