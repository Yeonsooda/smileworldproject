package myworld.bean;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldAdminFolderDTO {
	private int folder_no;
	private String folder_name, folder_userId;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;
}
