package user.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import user.bean.UserDTO;
import user.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDAO userDAO = null;
	
	@Autowired
	private HttpSession session;

	@Override
	public void userSignUp(UserDTO userDTO) {	
		userDAO.userSignUp(userDTO);
	}
	
	@Override
	public void userUpdate(Map<String, String> map) {
		userDAO.userUpdate(map);		
	}
	
	@Override
	public String checkId(String userId) {	
		UserDTO userDTO = userDAO.checkId(userId);
		//System.out.println("##################"+userId);
		//System.out.println("##################"+userDTO);
		
		if(userDTO == null) {
			return "true";
		}else {
			return "false";
		}		
	}

	@Override
	public UserDTO userLogin(Map<String, String> map) {
		return userDAO.userLogin(map);
	}

	@Override
	public UserDTO getUser(String userId) {		
		return userDAO.getUser(userId);
	}

	@Override
	public void userLogout() {
		session.invalidate();		
	}

	@Override
	public void updateUserEmoti_myworldHome(Map<String, String> map) {
		userDAO.updateUserEmoti_myworldHome(map);		
	}

	@Override
	public void updateUserProfile_myworldHome(Map<String, Object> map) {
		userDAO.updateUserProfile_myworldHome(map);		
	}

	@Override
	public void updateUserInfo_myworldHome(Map<String, String> map) {
		userDAO.updateUserInfo_myworldHome(map);		
	}

	@Override
	public void updateUserTitle_myworldHome(Map<String, String> map) {
		userDAO.updateUserTitle_myworldHome(map);
		
	}

	@Override
	public void updateUserMiniroom(Map<String, String> map) {
		userDAO.updateUserMiniroom(map);
	}
	
	@Override
	public void deleteUser(String userId) {
		userDAO.deleteUser(userId);
	}

}
