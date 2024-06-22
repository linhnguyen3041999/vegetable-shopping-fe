package com.vegetableshoppingfe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/vegetable-shopping")
public class UserController {

    @GetMapping("/home")
    public String getHome() {
        return "users/index";
    }

    @GetMapping("/product/product-detail")
    public String getProductDetail() {
        return "users/shop-details";
    }

    @GetMapping("/shopping-cart")
    public String getShoppingCart() {
        return "users/shopping-cart";
    }

    @GetMapping("/shopping-cart/checkout")
    public String getCheckout() {
        return "/users/checkout-form";
    }

    @GetMapping("/user/login")
    public String getLogin() {
        return "/users/login";
    }
}
