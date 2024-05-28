package com.ww.vetetableshoppingfe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/v1")
@Controller
public class AdminController {
    @GetMapping("/admin")
    public String adminHome() {
        return "/admin/index";
    }

    @RestController
    public class DataController {
        @GetMapping("/getData")
        public String getData() {
            return "<p>Đây là data demo.</p>";
        }
    }

}
