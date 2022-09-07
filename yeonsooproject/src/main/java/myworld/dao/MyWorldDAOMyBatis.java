package myworld.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import myworld.bean.MyWorldAdminFolderDTO;
import myworld.bean.MyWorldAdminMinimiDTO;
import myworld.bean.MyWorldAdminMiniroomDTO;
import myworld.bean.MyWorldAllBoardDTO;
import myworld.bean.MyWorldDiaryBoardDTO;
import myworld.bean.MyWorldDiaryCommentDTO;
import myworld.bean.MyWorldDiaryFolderDTO;
import myworld.bean.MyWorldHomeDTO;
import myworld.bean.MyWorldPhotoBoardDTO;
import myworld.bean.MyWorldPhotoCommentDTO;
import myworld.bean.MyWorldPhotoFolderDTO;
import myworld.bean.MyWorldProfileDTO;
import myworld.bean.MyWorldVisitorBoardDTO;
import myworld.bean.MyWorldVisitorCommentDTO;

@Repository
@Transactional
public class MyWorldDAOMyBatis implements MyWorldDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void insertmyworldHome_friendsmsg(Map<String, String> map) {
		sqlSession.insert("myworldSQL.insertmyworldHome_friendsmsg", map);
		
	}

	@Override
	public List<MyWorldHomeDTO> getMyworldHome_friendsmsgList(String myworldHome_userId_host) {		
		return sqlSession.selectList("myworldSQL.getMyworldHome_friensmsgList", myworldHome_userId_host);
	}

	@Override
	public void writeMyworldProfile(Map<String, String> map) {
		sqlSession.insert("myworldSQL.writeMyworldProfile", map);
		
	}

	@Override
	public void updateMyworldProfile(Map<String, String> map) {
		sqlSession.update("myworldSQL.updateMyworldProfile", map);
	}

	@Override
	public MyWorldProfileDTO getMyworldProfile(String myworldProfile_userId) {		
		return sqlSession.selectOne("myworldSQL.getMyworldProfile", myworldProfile_userId);
	}

	@Override
	public void addDiaryFolder(Map<String, String> map) {
		sqlSession.insert("myworldSQL.addDiaryFolder", map);		
	}

	@Override
	public List<MyWorldDiaryFolderDTO> getDiaryFolderList(String folder_userId) {
		return sqlSession.selectList("myworldSQL.getDiaryFolderList", folder_userId);
	}

	@Override
	public void updateDiaryFolder(Map<String, String> map) {
		sqlSession.update("myworldSQL.updateDiaryFolder", map);		
	}

	@Override
	public void deleteDiaryFolder(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteDiaryFolder", map);		
	}

	@Override
	public void writeDiaryBoard(Map<String, Object> map) {
		sqlSession.insert("myworldSQL.writeDiaryBoard", map);	
	}

	@Override
	public List<MyWorldDiaryBoardDTO> getDiaryBoardList(String board_userId) {
		return sqlSession.selectList("myworldSQL.getDiaryBoardList", board_userId);
	}

	@Override
	public void writeDiaryComment(Map<String, Object> map) {
		sqlSession.insert("myworldSQL.writeDiaryComment", map);		 
	}

	@Override
	public List<MyWorldDiaryCommentDTO> getDiaryCommentList(Map<String, Object> map) {
		return sqlSession.selectList("myworldSQL.getDiaryCommentList", map);
	}
	
	@Override
	public void deleteDiaryBoard(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteDiaryBoard", map);			
	}
	
	@Override
	public void deleteDiaryComment(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteDiaryComment", map);		
	}
	
	@Override
	public void addPhotoFolder(Map<String, String> map) {
		sqlSession.insert("myworldSQL.addPhotoFolder", map);		
	}

	@Override
	public List<MyWorldPhotoFolderDTO> getPhotoFolderList(String folder_userId) {
		return sqlSession.selectList("myworldSQL.getPhotoFolderList", folder_userId);
	}

	@Override
	public void updatePhotoFolder(Map<String, String> map) {
		sqlSession.update("myworldSQL.updatePhotoFolder", map);		
	}

	@Override
	public void deletePhotoFolder(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deletePhotoFolder", map);	
	}

	@Override
	public void writePhotoBoard(Map<String, Object> map) {
		sqlSession.insert("myworldSQL.writePhotoBoard", map);		
	}
	
	@Override
	public void updatePhotoBoard(Map<String, Object> map) {
		sqlSession.update("myworldSQL.updatePhotoBoard", map);
	}
	
	@Override
	public MyWorldPhotoBoardDTO getPhotoBoard(Map<String, Object> map) {
		return sqlSession.selectOne("myworldSQL.getPhotoBoard", map);
	}

	@Override
	public List<MyWorldPhotoBoardDTO> getPhotoBoardList(String board_userId) {
		return sqlSession.selectList("myworldSQL.getPhotoBoardList", board_userId);
	}

	@Override
	public void writePhotoComment(Map<String, Object> map) {
		sqlSession.insert("myworldSQL.writePhotoComment", map);
	}

	@Override
	public List<MyWorldPhotoCommentDTO> getPhotoCommentList(Map<String, Object> map) {		
		return sqlSession.selectList("myworldSQL.getPhotoCommentList", map);
	}

	@Override
	public void deletePhotoBoard(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deletePhotoBoard", map);
	}
	
	@Override
	public void deletePhotoComment(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deletePhotoComment", map);
	}

	@Override
	public void addAdminFolder(Map<String, String> map) {
		sqlSession.insert("myworldSQL.addAdminFolder", map);		
	}

	@Override
	public List<MyWorldAdminFolderDTO> getAdminFolderList(String folder_userId) {
		return sqlSession.selectList("myworldSQL.getAdminFolderList", folder_userId);
	}

	@Override
	public void updateAdminFolder(Map<String, String> map) {
		sqlSession.update("myworldSQL.updateAdminFolder", map);	
	}

	@Override
	public void deleteAdminFolder(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteAdminFolder", map);	
	}

	@Override
	public List<MyWorldAdminMinimiDTO> getAdminMinimiList() {
		return sqlSession.selectList("myworldSQL.getAdminMinimiList");
	}

	@Override
	public List<MyWorldAdminMiniroomDTO> getAdminMiniroomList() {
		return sqlSession.selectList("myworldSQL.getAdminMiniroomList");
	}

	@Override
	public void writeVisitorBoard(Map<String, String> map) {
		sqlSession.insert("myworldSQL.writeVisitorBoard", map);
	}

	@Override
	public List<MyWorldVisitorBoardDTO> getVisitorBoardList(String board_userId) {
		return sqlSession.selectList("myworldSQL.getVisitorBoardList", board_userId);
	}

	@Override
	public void writeVisitorComment(Map<String, Object> map) {
		sqlSession.insert("myworldSQL.writeVisitorComment", map);
	}

	@Override
	public List<MyWorldVisitorCommentDTO> getVisitorCommentList(Map<String, Object> map) {		// TODO Auto-generated method stub
		return sqlSession.selectList("myworldSQL.getVisitorCommentList", map);
	}

	@Override
	public void deleteVisitorBoard(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteVisitorBoard", map);
	}

	@Override
	public void deleteVisitorComment(Map<String, String> map) {
		sqlSession.delete("myworldSQL.deleteVisitorComment", map);		
	}

	@Override
	public List<MyWorldAllBoardDTO> getMyworldAllBoardList(String board_userId) {
		return sqlSession.selectList("myworldSQL.getMyworldAllBoardList", board_userId);
	}

	@Override
	public int getDiaryBoardCnt(String board_userId) {
		return sqlSession.selectOne("myworldSQL.getDiaryBoardCnt", board_userId);
	}

	@Override
	public int getPhotoBoardCnt(String board_userId) {
		return sqlSession.selectOne("myworldSQL.getPhotoBoardCnt", board_userId);
	}

	@Override
	public int getVisitorBoardCnt(String board_userId) {
		return sqlSession.selectOne("myworldSQL.getVisitorBoardCnt", board_userId);
	}
}
