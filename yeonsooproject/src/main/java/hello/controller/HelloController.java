package hello.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController
@Controller
//@CrossOrigin(origins="http://localhost:3000")
public class HelloController {
	
//	@GetMapping("/hello")
//	public String hello() {
//		return "헬로우 공쥬님~!";
//	}
	
//	@GetMapping("/")
//	public String home() {
//		return "/";
//	}
//	
//	@GetMapping("/ProductList")
//	public String ProductList() {
//		return "/ProductList";
//	}

    @GetMapping({"/", "/error"})
    public String index() {
        return "index.html";
    }

    public String getErrorPath() {
        return "/error";
    }
}
