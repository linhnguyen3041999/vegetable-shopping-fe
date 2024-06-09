package com.ww.vetetableshoppingfe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/home")
    public String getHome() {
        return "user/index";
    }

    @GetMapping("/product/product-detail")
    public String getProductDetail() {
        return "user/shop-details";
    }

    @GetMapping("/shopping-cart")
    public String getShoppingCart() {
        return "user/shopping-cart";
    }

    @GetMapping("/shopping-cart/checkout")
    public String getCheckout() {
        return "/user/checkout-form";
    }
}
