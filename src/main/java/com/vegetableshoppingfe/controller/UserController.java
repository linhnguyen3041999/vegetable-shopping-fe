package com.vegetableshoppingfe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/vegetable-shopping")
public class UserController {

    @GetMapping("/home")
    public String getHome() {
        return "users/index";
    }

    @GetMapping("/register")
    public String getRegister() {
        return "users/register";
    }

    @GetMapping("/update-password")
    public String getUpdatePassword() {
        return "users/update-password";
    }

    @GetMapping("/update-info")
    public String getUpdateInfo() {
        return "users/update-info";
    }

    @GetMapping("/product/product-detail")
    public String getProductDetail() {
        return "users/shop-details";
    }

    @GetMapping("/shopping-cart")
    public String getShoppingCart() {
        return "users/shoping-cart";
    }

    @GetMapping("/shopping-cart/checkout")
    public String getCheckout() {
        return "/users/checkout-form";
    }

    @GetMapping("/blog")
    public String getBlog() {
        return "users/blog";
    }

}
