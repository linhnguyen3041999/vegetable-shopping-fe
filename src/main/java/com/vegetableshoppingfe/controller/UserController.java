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

    @GetMapping("/blog")
    public String getBlog(){
        return "users/blog";
    }

    @GetMapping("/contact")
    public String getContact(){
        return "users/contact";
    }

    @GetMapping("/shop-details")
    public String getShopDetails(){
        return "users/shop-details";
    }

    @GetMapping("/blog-details")
    public String getBlogDetails(){
        return "users/blog-details";
    }

    @GetMapping("/shop-grid")
    public String getShop(){
        return "users/shop-grid";
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

    @GetMapping("/user/login")
    public String login() {
        return "users/login";
    }

    @GetMapping("/shopping-cart/checkout/vnpay-payment")
    public String checkoutVNPayPayment() {
        return "users/vnpay_status";
    }
}
