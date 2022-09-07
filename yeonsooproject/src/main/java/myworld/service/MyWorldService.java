package myworld.service;

import java.util.List;
import java.util.Map;

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

public interface MyWorldService {

	public void insertmyworldHome_friendsmsg(Map<String, String> map);

	public List<MyWorldHomeDTO> getMyworldHome_friendsmsgList(String myworldHome_userId_host);

	public void writeMyworldProfile(Map<String, String> map);

	public void updateMyworldProfile(Map<String, String> map); 

	public MyWorldProfileDTO getMyworldProfile(String myworldProfile_userId);

	public void addDiaryFolder(Map<String, String> map);

	public List<MyWorldDiaryFolderDTO> getDiaryFolderList(String folder_userId);

	public void updateDiaryFolder(Map<String, String> map);

	public void deleteDiaryFolder(Map<String, String> map);

	public void writeDiaryBoard(Map<String, Object> map);

	public List<MyWorldDiaryBoardDTO> getDiaryBoardList(String board_userId);

	public void writeDiaryComment(Map<String, Object> map);

	public List<MyWorldDiaryCommentDTO> getDiaryCommentList(Map<String, Object> map);

	public void deleteDiaryBoard(Map<String, String> map);
	
	public void deleteDiaryComment(Map<String, String> map);
	
	public void addPhotoFolder(Map<String, String> map);

	public List<MyWorldPhotoFolderDTO> getPhotoFolderList(String folder_userId);

	public void updatePhotoFolder(Map<String, String> map);

	public void deletePhotoFolder(Map<String, String> map);

	public void writePhotoBoard(Map<String, Object> map);

	public void updatePhotoBoard(Map<String, Object> map);
	
	public MyWorldPhotoBoardDTO getPhotoBoard(Map<String, Object> map);

	public List<MyWorldPhotoBoardDTO> getPhotoBoardList(String board_userId);

	public void writePhotoComment(Map<String, Object> map);

	public List<MyWorldPhotoCommentDTO> getPhotoCommentList(Map<String, Object> map);

	public void deletePhotoBoard(Map<String, String> map);
	
	public void deletePhotoComment(Map<String, String> map);

	public void addAdminFolder(Map<String, String> map);

	public List<MyWorldAdminFolderDTO> getAdminFolderList(String folder_userId);

	public void updateAdminFolder(Map<String, String> map);

	public void deleteAdminFolder(Map<String, String> map);

	public List<MyWorldAdminMinimiDTO> getAdminMinimiList();

	public List<MyWorldAdminMiniroomDTO> getAdminMiniroomList();

	public void writeVisitorBoard(Map<String, String> map);

	public List<MyWorldVisitorBoardDTO> getVisitorBoardList(String board_userId);

	public void writeVisitorComment(Map<String, Object> map);

	public List<MyWorldVisitorCommentDTO> getVisitorCommentList(Map<String, Object> map);

	public void deleteVisitorBoard(Map<String, String> map);

	public void deleteVisitorComment(Map<String, String> map);

	public List<MyWorldAllBoardDTO> getMyworldAllBoardList(String board_userId);

	public int getDiaryBoardCnt(String board_userId);

	public int getPhotoBoardCnt(String board_userId);

	public int getVisitorBoardCnt(String board_userId);






}
