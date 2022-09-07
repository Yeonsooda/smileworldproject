package myworld.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import myworld.dao.MyWorldDAO;

@Service
public class MyWorldServiceImpl implements MyWorldService {
	@Autowired
	private MyWorldDAO myworldDAO;

	@Override
	public void insertmyworldHome_friendsmsg(Map<String, String> map) {
		myworldDAO.insertmyworldHome_friendsmsg(map);
		
	}

	@Override
	public List<MyWorldHomeDTO> getMyworldHome_friendsmsgList(String myworldHome_userId_host) {		
		return myworldDAO.getMyworldHome_friendsmsgList(myworldHome_userId_host);
	}

	@Override
	public void writeMyworldProfile(Map<String, String> map) {
		myworldDAO.writeMyworldProfile(map);
		
	}

	@Override
	public void updateMyworldProfile(Map<String, String> map) {
		myworldDAO.updateMyworldProfile(map);		
	}

	@Override
	public MyWorldProfileDTO getMyworldProfile(String myworldProfile_userId) {		
		return myworldDAO.getMyworldProfile(myworldProfile_userId);
	}

	@Override
	public void addDiaryFolder(Map<String, String> map) {
		myworldDAO.addDiaryFolder(map);
	}

	@Override
	public List<MyWorldDiaryFolderDTO> getDiaryFolderList(String folder_userId) {
		return myworldDAO.getDiaryFolderList(folder_userId);
	}

	@Override
	public void updateDiaryFolder(Map<String, String> map) {
		myworldDAO.updateDiaryFolder(map);		
	}

	@Override
	public void deleteDiaryFolder(Map<String, String> map) {
		myworldDAO.deleteDiaryFolder(map);
	}

	@Override
	public void writeDiaryBoard(Map<String, Object> map) {
		myworldDAO.writeDiaryBoard(map);		
	}

	@Override
	public List<MyWorldDiaryBoardDTO> getDiaryBoardList(String board_userId) {
		return myworldDAO.getDiaryBoardList(board_userId);
	}

	@Override
	public void writeDiaryComment(Map<String, Object> map) {
		myworldDAO.writeDiaryComment(map);		
	}

	@Override
	public List<MyWorldDiaryCommentDTO> getDiaryCommentList(Map<String, Object> map) {
		return myworldDAO.getDiaryCommentList(map);
	}

	@Override
	public void deleteDiaryBoard(Map<String, String> map) {
		myworldDAO.deleteDiaryBoard(map);		
	}
	
	@Override
	public void deleteDiaryComment(Map<String, String> map) {
		myworldDAO.deleteDiaryComment(map);		
	}
	
	@Override
	public void addPhotoFolder(Map<String, String> map) {
		myworldDAO.addPhotoFolder(map);
	}

	@Override
	public List<MyWorldPhotoFolderDTO> getPhotoFolderList(String folder_userId) {
		return myworldDAO.getPhotoFolderList(folder_userId);
	}

	@Override
	public void updatePhotoFolder(Map<String, String> map) {
		myworldDAO.updatePhotoFolder(map);		
	}

	@Override
	public void deletePhotoFolder(Map<String, String> map) {
		myworldDAO.deletePhotoFolder(map);
	}

	@Override
	public void writePhotoBoard(Map<String, Object> map) {
		myworldDAO.writePhotoBoard(map);		
	}
	
	@Override
	public void updatePhotoBoard(Map<String, Object> map) {
		myworldDAO.updatePhotoBoard(map);		
	}
	
	@Override
	public MyWorldPhotoBoardDTO getPhotoBoard(Map<String, Object> map) {
		return myworldDAO.getPhotoBoard(map);	
	}

	@Override
	public List<MyWorldPhotoBoardDTO> getPhotoBoardList(String board_userId) {
		return myworldDAO.getPhotoBoardList(board_userId);
	}

	@Override
	public void writePhotoComment(Map<String, Object> map) {
		myworldDAO.writePhotoComment(map);	
	}

	@Override
	public List<MyWorldPhotoCommentDTO> getPhotoCommentList(Map<String, Object> map) {
		return myworldDAO.getPhotoCommentList(map);
	}

	@Override
	public void deletePhotoBoard(Map<String, String> map) {
		myworldDAO.deletePhotoBoard(map);
	}
	
	@Override
	public void deletePhotoComment(Map<String, String> map) {
		myworldDAO.deletePhotoComment(map);
	}

	@Override
	public void addAdminFolder(Map<String, String> map) {
		myworldDAO.addAdminFolder(map);		
	}

	@Override
	public List<MyWorldAdminFolderDTO> getAdminFolderList(String folder_userId) {
		return myworldDAO.getAdminFolderList(folder_userId);
	}

	@Override
	public void updateAdminFolder(Map<String, String> map) {
		myworldDAO.updateAdminFolder(map);
	}

	@Override
	public void deleteAdminFolder(Map<String, String> map) {
		myworldDAO.deleteAdminFolder(map);
	}

	@Override
	public List<MyWorldAdminMinimiDTO> getAdminMinimiList() {
		return myworldDAO.getAdminMinimiList();
	}

	@Override
	public List<MyWorldAdminMiniroomDTO> getAdminMiniroomList() {
		return myworldDAO.getAdminMiniroomList();
	}

	@Override
	public void writeVisitorBoard(Map<String, String> map) {
		myworldDAO.writeVisitorBoard(map);
	}

	@Override
	public List<MyWorldVisitorBoardDTO> getVisitorBoardList(String board_userId) {
		return myworldDAO.getVisitorBoardList(board_userId);
	}

	@Override
	public void writeVisitorComment(Map<String, Object> map) {
		myworldDAO.writeVisitorComment(map);
	}

	@Override
	public List<MyWorldVisitorCommentDTO> getVisitorCommentList(Map<String, Object> map) {
		return myworldDAO.getVisitorCommentList(map);
	}

	@Override
	public void deleteVisitorBoard(Map<String, String> map) {
		myworldDAO.deleteVisitorBoard(map);
	}

	@Override
	public void deleteVisitorComment(Map<String, String> map) {
		myworldDAO.deleteVisitorComment(map);
	}

	@Override
	public List<MyWorldAllBoardDTO> getMyworldAllBoardList(String board_userId) {
		return myworldDAO.getMyworldAllBoardList(board_userId);
	}

	@Override
	public int getDiaryBoardCnt(String board_userId) {
		return myworldDAO.getDiaryBoardCnt(board_userId);
	}

	@Override
	public int getPhotoBoardCnt(String board_userId) {
		return myworldDAO.getPhotoBoardCnt(board_userId);
	}

	@Override
	public int getVisitorBoardCnt(String board_userId) {
		return myworldDAO.getVisitorBoardCnt(board_userId);
	}
}
