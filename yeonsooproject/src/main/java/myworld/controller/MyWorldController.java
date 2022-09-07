package myworld.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
import myworld.service.MyWorldService;
import com.google.gson.JsonObject;

@RestController
public class MyWorldController {
	@Autowired
	private MyWorldService myworldService;

	/* myworldhome */
	@PostMapping(value="myworldHome_friendsmsg")
	public List<MyWorldHomeDTO> myworldHome_friendsmsg(@RequestParam Map<String, String> map) {
		myworldService.insertmyworldHome_friendsmsg(map);
		String myworldHome_userId_host = map.get("myworldHome_userId_host"); 
		List<MyWorldHomeDTO> list = myworldService.getMyworldHome_friendsmsgList(myworldHome_userId_host);
		//System.out.println("##########map="+map);
		//System.out.println("##########list="+list);
		
		return list;
	}
	
	@PostMapping(value="getMyworldHome_friensmsgList")
	public List<MyWorldHomeDTO> getMyworldHome_friensmsgList(@RequestParam String myworldHome_userId_host) {
		return myworldService.getMyworldHome_friendsmsgList(myworldHome_userId_host);
	}	
	
	/* 이미지 업로드 공통 사용 */
	@PostMapping(value="uploadMyworldImg") //return값이 string이면 res전달 안됨
	public Map<String, String> uploadMyworldImg(HttpServletRequest request, @RequestParam(value="myworldImg", required=false) MultipartFile myworldImg) { // (value="body", required=false) HttpServletRequest request,
		//System.out.println(myworldImg);
		
		//String filePath = "D:\\SpringBoot\\workspace\\yeonsooproject\\src\\main\\frontend\\public\\img";
		String filePath = "C:\\SpringBoot\\workspace\\yeonsooproject\\src\\main\\frontend\\public\\img";
		String fileName = myworldImg.getOriginalFilename();
		
		//System.out.println(fileName);
		
		File file = new File(filePath, fileName); //파일생성
		
		try {
			FileCopyUtils.copy(myworldImg.getInputStream(), new FileOutputStream(file));
		} catch (IOException e) {			
			e.printStackTrace();
		}
		
		Map<String, String> map = new HashMap<String, String>();				
		map.put("filename", fileName);
		//System.out.println(map);
		   
		return map;
	}
	
	/* myworldprofile */
	@PostMapping(value="writeMyworldProfile")
	public void writeMyworldProfile(@RequestParam Map<String, String> map) {
		//System.out.println(map.get("myworldProfile_userId"));
		MyWorldProfileDTO myworldProfileDTO = myworldService.getMyworldProfile(map.get("myworldProfile_userId"));
		//System.out.println("@@@@@@@ckcontent"+map);
		System.out.println(myworldProfileDTO);
		if(myworldProfileDTO == null) {
			myworldService.writeMyworldProfile(map);
		}else{
			myworldService.updateMyworldProfile(map);
		};
	}
	
	@PostMapping(value="getMyworldProfile")
	public MyWorldProfileDTO getMyworldProfile(@RequestParam String myworldProfile_userId) {		
		return myworldService.getMyworldProfile(myworldProfile_userId);
	}
	
	/* myworlddiary */
	@PostMapping(value="addDiaryFolder")
	public List<MyWorldDiaryFolderDTO> addDiaryFolder(@RequestParam Map<String, String> map) {
		System.out.println(map);
		myworldService.addDiaryFolder(map);
		return myworldService.getDiaryFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="getDiaryFolderList")
	public List<MyWorldDiaryFolderDTO> getDiaryFolderList(@RequestParam String folder_userId) {
		return myworldService.getDiaryFolderList(folder_userId); 
	}
	
	@PostMapping(value="updateDiaryFolder")
	public List<MyWorldDiaryFolderDTO> updateDiaryFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.updateDiaryFolder(map);
		return myworldService.getDiaryFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="deleteDiaryFolder")
	public void deleteDiaryFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deleteDiaryFolder(map);		
	}
	
	@PostMapping(value="writeDiaryBoard")
	public List<MyWorldDiaryBoardDTO> writeDiaryBoard(@RequestParam Map<String, Object> map) { 
		System.out.println(map); 
		myworldService.writeDiaryBoard(map);
		return myworldService.getDiaryBoardList((String)(map.get("board_userId"))); 
	}
	
	@PostMapping(value="getDiaryBoardList")
	public List<MyWorldDiaryBoardDTO> getDiaryBoardList(@RequestParam String board_userId) {
		return myworldService.getDiaryBoardList(board_userId); 
	}
	
	@PostMapping(value="writeDiaryComment")
	public List<MyWorldDiaryCommentDTO> writeDiaryComment(@RequestParam Map<String, Object> map) { 
		//System.out.println(map); 
		myworldService.writeDiaryComment(map);
		return myworldService.getDiaryCommentList(map); 
	}
	
	@PostMapping(value="getDiaryCommentList")
	public List<MyWorldDiaryCommentDTO> getDiaryCommentList(@RequestParam Map<String, Object> map) { 
		//System.out.println(map);
		return myworldService.getDiaryCommentList(map); 
	}
	
	@PostMapping(value="deleteDiary")
	public void deleteDiary(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deleteDiaryBoard(map);
		myworldService.deleteDiaryComment(map);
	}
	
	/* myworldphotofolder */	
	@PostMapping(value="addPhotoFolder")
	public List<MyWorldPhotoFolderDTO> addPhotoFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.addPhotoFolder(map);
		return myworldService.getPhotoFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="getPhotoFolderList")
	public List<MyWorldPhotoFolderDTO> getPhotoFolderList(@RequestParam String folder_userId) {
		return myworldService.getPhotoFolderList(folder_userId); 
	}
	
	@PostMapping(value="updatePhotoFolder")
	public List<MyWorldPhotoFolderDTO> updatePhotoFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.updatePhotoFolder(map);
		return myworldService.getPhotoFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="deletePhotoFolder")
	public void deletePhotoFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deletePhotoFolder(map);		
	}

	/* myworldphotoboard */
	@PostMapping(value="writePhotoBoard")
	public void writePhotoBoard(@RequestParam Map<String, Object> map) {
		//System.out.println("@@@@@@@ckcontent"+map);
		myworldService.writePhotoBoard(map);
	}
	
	@PostMapping(value="updatePhotoBoard")
	public void updatePhotoBoard(@RequestParam Map<String, Object> map) {
		System.out.println("@@@@@@@ckcontent"+map);
		myworldService.updatePhotoBoard(map);
	}
	
	@PostMapping(value="getPhotoBoard")
	public MyWorldPhotoBoardDTO getPhotoBoard(@RequestParam Map<String, Object> map) {		
		return myworldService.getPhotoBoard(map);
	}
	
	@PostMapping(value="getPhotoBoardList")
	public List<MyWorldPhotoBoardDTO> getPhotoBoardList(@RequestParam String board_userId) {
		return myworldService.getPhotoBoardList(board_userId); 
	}
	
	@PostMapping(value="writePhotoComment")
	public List<MyWorldPhotoCommentDTO> writePhotoComment(@RequestParam Map<String, Object> map) { 
		System.out.println(map); 
		myworldService.writePhotoComment(map);
		return myworldService.getPhotoCommentList(map); 
	}
	
	@PostMapping(value="getPhotoCommentList")
	public List<MyWorldPhotoCommentDTO> getPhotoCommentList(@RequestParam Map<String, Object> map) { 
		//System.out.println(map);
		return myworldService.getPhotoCommentList(map); 
	}
	
	@PostMapping(value="deletePhoto")
	public void deletePhoto(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deletePhotoBoard(map);
		myworldService.deletePhotoComment(map);
	}
	
	/* myworldadmin */
	@PostMapping(value="addAdminFolder")
	public List<MyWorldAdminFolderDTO> addAdminFolder(@RequestParam Map<String, String> map) {
		System.out.println(map);
		myworldService.addAdminFolder(map);
		return myworldService.getAdminFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="getAdminFolderList")
	public List<MyWorldAdminFolderDTO> getAdminFolderList(@RequestParam String folder_userId) {
		return myworldService.getAdminFolderList(folder_userId); 
	}
	
	@PostMapping(value="updateAdminFolder")
	public List<MyWorldAdminFolderDTO> updateAdminFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.updateAdminFolder(map);
		return myworldService.getAdminFolderList(map.get("folder_userId")); 
	}
	
	@PostMapping(value="deleteAdminFolder")
	public void deleteAdminFolder(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deleteAdminFolder(map);		
	}

	@PostMapping(value="getAdminMinimiList")
	public List<MyWorldAdminMinimiDTO> getAdminMinimiList() {
		return myworldService.getAdminMinimiList(); 
	}
	
	@PostMapping(value="getAdminMiniroomList")
	public List<MyWorldAdminMiniroomDTO> getAdminMiniroomList() {
		return myworldService.getAdminMiniroomList(); 
	}

	@PostMapping(value="writeVisitorBoard")
	public List<MyWorldVisitorBoardDTO> writeVisitorBoard(@RequestParam Map<String, String> map) { 
		System.out.println(map); 
		myworldService.writeVisitorBoard(map);
		return myworldService.getVisitorBoardList((String)(map.get("board_userId"))); 
	}
	
	@PostMapping(value="getVisitorBoardList")
	public List<MyWorldVisitorBoardDTO> getVisitorBoardList(@RequestParam String board_userId) { 
		return myworldService.getVisitorBoardList(board_userId); 
	}
	
	@PostMapping(value="writeVisitorComment")
	public List<MyWorldVisitorCommentDTO> writeVisitorComment(@RequestParam Map<String, Object> map) { 
		System.out.println(map); 
		myworldService.writeVisitorComment(map);
		return myworldService.getVisitorCommentList(map); 
	}
	
	@PostMapping(value="getVisitorCommentList")
	public List<MyWorldVisitorCommentDTO> getVisitorCommentList(@RequestParam Map<String, Object> map) { 
		//System.out.println(map);
		return myworldService.getVisitorCommentList(map); 
	}
	
	@PostMapping(value="deleteVisitorBook")
	public void deleteVisitorBook(@RequestParam Map<String, String> map) {
		//System.out.println(map);
		myworldService.deleteVisitorBoard(map);
		myworldService.deleteVisitorComment(map);
	}
	
	@PostMapping(value="getMyworldAllBoardList")
	public List<MyWorldAllBoardDTO> getMyworldAllBoardList(@RequestParam String board_userId) { 
		return myworldService.getMyworldAllBoardList(board_userId);
	}
	
	@PostMapping(value="getMyworldAllBoardCnt")
	public Map<String, Integer> getMyworldAllBoardCnt(@RequestParam String board_userId) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		
		map.put("diaryBoardCnt", myworldService.getDiaryBoardCnt(board_userId));
		map.put("photoBoardCnt", myworldService.getPhotoBoardCnt(board_userId));
		map.put("visitorBoardCnt", myworldService.getVisitorBoardCnt(board_userId));
		
		return map;
	}
	
}	

