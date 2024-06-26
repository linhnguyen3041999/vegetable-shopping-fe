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

    @GetMapping("/blog")
    public String getBlog() {
        return "users/blog";
    }

    @GetMapping("/contact")
    public String getContact() {
        return "users/contact";
    }

    @GetMapping("/shop-details")
    public String getShopDetails() {
        return "users/shop-details";
    }

    @GetMapping("/shoping-cart")
    public String getShoppingCart() {
        return "users/shoping-cart";
    }

    @GetMapping("/checkout-form")
    public String getCheckoutForm() {
        return "users/checkout";
    }

    @GetMapping("shop-grid")
    public String getShop() {
        return "users/shop-grid";
    }

    @GetMapping("/product/product-detail")
    public String getProductDetail() {
        return "users/shop-details";
    }

    @GetMapping("/blog-details")
    public String showBlogDetails() {
        return "users/blog-details";
    }

}
