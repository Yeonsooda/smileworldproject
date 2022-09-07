package user.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import myworld.service.MyWorldService;
import user.bean.UserDTO;
import user.service.UserService;

//@Controller
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private MyWorldService myworldService;
	
	@Autowired
	private HttpSession session;
	
	@PostMapping(value="userSignUp")
	//@ResponseBody
	public void userSignUp(@ModelAttribute UserDTO userDTO) {
		//System.out.println(userDTO);
		String userGender = userDTO.getUserGender();
		//System.out.println(userGender);
		String userId = userDTO.getUserId();
		System.out.println(userId);
		
		if(userGender.equals("남자")) {			
			userDTO.setUserImg_minimi("./img/minimi_boy.png");
			userDTO.setUserImg_miniroom("./img/miniroom2.gif");
			userDTO.setUserImg_gender("../image/gender_boy.jpg");
			userDTO.setUserProfile_myworldHome("./img/basicprofile_boy.jpg");
		}else { // if(userGender == "여자")
			userDTO.setUserImg_minimi("./img/minimi_girl.png");
			userDTO.setUserImg_miniroom("./img/miniroom.gif");
			userDTO.setUserImg_gender("../image/gender_girl.jpg");
			userDTO.setUserProfile_myworldHome("./img/basicprofile_girl.jpg");
		}
		//System.out.println("@@@@@@@@@@@@@추가"+userDTO.getUserImg_minimi());
		//System.out.println("@@@@@@@@@@@@@추가"+userDTO);
		userService.userSignUp(userDTO);
		
		//사진첩 기본글 세팅
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("board_title", "사이월드에 오신 것을 환영합니다!:)");
		map.put("board_content", "<figure class='image'><img src='./img/photoboard_basic.jpg'></figure>");
		map.put("board_folderNo", 0);
		map.put("board_userId", userId);
		myworldService.writePhotoBoard(map);
	}
	
	@PostMapping(value="userUpdate")
	public Map<String, String> userUpdate(@RequestParam Map<String, String> map) {
		System.out.println(map);
		String userGender = map.get("userGender");
		
		if(userGender.equals("남자")) {			
			map.put("userImg_minimi", "../image/minimi_boy.png");
			map.put("userImg_gender", "../image/gender_boy.jpg");
			map.put("userProfile_myworldHome", "./img/basicprofile_boy.jpg");
		}else { 
			map.put("userImg_minimi", "../image/minimi_girl.png");
			map.put("userImg_gender", "../image/gender_girl.jpg");
			map.put("userProfile_myworldHome", "./img/basicprofile_girl.jpg");
		}
		
		userService.userUpdate(map);
		
		return map;
	}
	
	@PostMapping(value="checkId")
	public String checkId(@RequestParam String userId) {//@ModelAttribute String userId @RequestParam String userId
		//System.out.println("+++++++++++++++++++"+userId);
		return userService.checkId(userId);
	}
	
	@PostMapping(value="userLogin")
	public UserDTO userLogin(@RequestParam Map<String, String> map, HttpSession session) {
		//System.out.println(map);
		UserDTO userDTO = userService.userLogin(map);
		session.setAttribute("userId_session", userDTO.getUserId());
		return userDTO;
	}
	
	@PostMapping(value="getUser")
	public UserDTO getUser() {
		String userId = (String) session.getAttribute("userId_session");
		return userService.getUser(userId);
	}
	
	@PostMapping(value="userLogout")
	public void userLogout() {		
		userService.userLogout();
	}
	
	@PostMapping(value="updateUserEmoti_myworldHome")
	public void updateUserEmoti_myworldHome(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		userService.updateUserEmoti_myworldHome(map);
	}
	
	@PostMapping(value="updateUserProfile_myworldHome")
	public Map<String, Object> updateUserProfile_myworldHome(@RequestParam(value="userProfile_myworldHome", required=false) MultipartFile userProfile_myworldHome, @RequestParam(value="userId", required=false) String userId) { //HttpServletRequest request,
		//System.out.println(userProfile_myworldHome);
		//String filePath = "D:\\SpringBoot\\workspace\\yeonsooproject\\src\\main\\frontend\\public\\img";
		String filePath = "C:\\SpringBoot\\workspace\\yeonsooproject\\src\\main\\frontend\\public\\img";
		String fileName = userProfile_myworldHome.getOriginalFilename();
		
		System.out.println(fileName);
		
		File file = new File(filePath, fileName); //파일생성
		
		try {
			FileCopyUtils.copy(userProfile_myworldHome.getInputStream(), new FileOutputStream(file));
		} catch (IOException e) {			
			e.printStackTrace();
		}
		
		Map<String, Object> map = new HashMap<String, Object>();				
		map.put("userProfile_myworldHome", "./img/"+fileName);
		map.put("userId", userId);
		//System.out.println(map);
		
		userService.updateUserProfile_myworldHome(map);
		
		return map;
	}
	
	@PostMapping(value="updateUserInfo_myworldHome")
	public void updateUserInfo_myworldHome(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		userService.updateUserInfo_myworldHome(map);
	}
	
	@PostMapping(value="updateUserTitle_myworldHome")
	public void updateUserTitle_myworldHome(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		userService.updateUserTitle_myworldHome(map);
	}
	//관리 페이지 > 미니룸 수정
	@PostMapping(value="/updateUserMiniroom")
	public UserDTO updateUserMiniroom(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		String userId = map.get("userId");
		userService.updateUserMiniroom(map);
		return userService.getUser(userId);
	}
	
	@PostMapping(value="deleteUser")
	public void deleteUser(@RequestParam String userId) {
		//System.out.println(map);
		userService.deleteUser(userId);
	}

}
