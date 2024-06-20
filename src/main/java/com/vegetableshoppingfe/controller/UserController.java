package com.vegetableshoppingfe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/vegetable-shopping")
public class UserController {

    @GetMapping

    @GetMapping("/home")
    public String getHome() {
        return "users/index";
    }
        return "users/index";
    }

    @GetMapping("/register")
    public String getRegister(){ return "users/register";}
}
