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

    @GetMapping("/checkout")
    public String getCheckout2(){
        return "users/checkout";
    }

    @GetMapping("/contact")
    public String getContact() {
        return "users/contact";
    }

    @GetMapping("/shop-details")
    public String getShopDetails() {
        return "users/shop-details";
    }

    @GetMapping("/checkout-form")
    public String getCheckoutForm() {
        return "users/checkout";
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

    @GetMapping("/shoping-cart")
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

    @GetMapping("/user/register")
    public String resgister() {
        return "users/register";
    }

    @GetMapping("/user/update-account")
    public String updateAccount() {
        return "users/update-info";
    }

    @GetMapping("user/home")
    public String getHome1() {
        return "users/index";
    }

    @GetMapping("user/blog")
    public String getBlog1() {
        return "users/blog";
    }

    @GetMapping("user/blog-details")
    public String getBlogDetails1(){
        return "users/blog-details";
    }

    @GetMapping("/user/change-password")
    public String changePassword() {
        return "users/change-password";
    }

    @GetMapping("user/shoping-cart")
    public String getShoppingCart1() {
        return "users/shoping-cart";
    }

    @GetMapping("user/shopping-cart/checkout")
    public String getCheckout1() {
        return "/users/checkout-form";
    }

    @GetMapping("user/contact")
    public String getContact1() {
        return "users/contact";
    }

    @GetMapping("user/shop-grid")
    public String getShop1(){
        return "users/shop-grid";
    }
}
