package myworld.bean;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Component
@Data
public class MyWorldAdminMinimiDTO {
	private int minimi_no;
	private String minimi_label, minimi_value;
  	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy.MM.dd", timezone = "Asia/Seoul")
	private LocalDateTime date_created;

}
