package user.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import user.bean.UserDTO;

@Repository
@Transactional
public class UserDAOMyBatis implements UserDAO{
	@Autowired
	private SqlSession sqlSession = null;

	@Override
	public void userSignUp(UserDTO userDTO) {
		sqlSession.insert("userSQL.userSignUp", userDTO);		
	}
	
	@Override
	public void userUpdate(Map<String, String> map) {
		sqlSession.update("userSQL.userUpdate", map);	
	}

	@Override
	public UserDTO checkId(String userId) {		
		return sqlSession.selectOne("userSQL.checkId", userId);
	}

	@Override
	public UserDTO userLogin(Map<String, String> map) {		
		return sqlSession.selectOne("userSQL.userLogin", map);
	}

	@Override
	public UserDTO getUser(String userId) {		
		return sqlSession.selectOne("userSQL.getUser", userId);
	}

	@Override
	public void updateUserEmoti_myworldHome(Map<String, String> map) {
		sqlSession.update("userSQL.updateUserEmoti_myworldHome", map);		
	}

	@Override
	public void updateUserProfile_myworldHome(Map<String, Object> map) {
		sqlSession.update("userSQL.updateUserProfile_myworldHome", map);		
	}

	@Override
	public void updateUserInfo_myworldHome(Map<String, String> map) {
		sqlSession.update("userSQL.updateUserInfo_myworldHome", map);		
	}

	@Override
	public void updateUserTitle_myworldHome(Map<String, String> map) {
		sqlSession.update("userSQL.updateUserTitle_myworldHome", map);		
	}

	@Override
	public void updateUserMiniroom(Map<String, String> map) {
		sqlSession.update("userSQL.updateUserMiniroom", map);
	}

	@Override
	public void deleteUser(String userId) {
		sqlSession.delete("userSQL.deleteUser", userId);
	}


}
