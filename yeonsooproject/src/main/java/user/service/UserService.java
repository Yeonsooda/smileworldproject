package user.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import user.bean.UserDTO;

public interface UserService {

	public void userSignUp(UserDTO userDTO);
	
	public void userUpdate(Map<String, String> map);

	public String checkId(String userId);
	
	public UserDTO userLogin(Map<String, String> map);

	public UserDTO getUser(String userId);

	public void userLogout();

	public void updateUserEmoti_myworldHome(Map<String, String> map);

	public void updateUserProfile_myworldHome(Map<String, Object> map);

	public void updateUserInfo_myworldHome(Map<String, String> map);

	public void updateUserTitle_myworldHome(Map<String, String> map);

	public void updateUserMiniroom(Map<String, String> map);

	public void deleteUser(String userId);


}
