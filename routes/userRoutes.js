import express from "express";
import { registerGetFn, userResiter} from "../controller/userConteroller/registerController.js";
import { loginGetFn, loginPost } from "../controller/userConteroller/loginController.js";
import { homeRender } from "../controller/userConteroller/home.js";
import { otp } from "../controller/userConteroller/otpController.js";
import passport from "passport";
import '../controller/userConteroller/googleAuth.js'
import { authFailure, authProtected, authSuccess, googleAuthCallback } from "../controller/userConteroller/googleAuth.js";
import { getSingleProdect } from "../controller/userConteroller/getSingleProdect.js";
import { getCategory } from "../controller/userConteroller/categoryController.js";
import { getCheckout } from "../controller/userConteroller/checkoutController.js";
import { getContact } from "../controller/userConteroller/contactController.js";
import {  addToCart, cartRenderPage} from "../controller/userConteroller/cartController.js";
import { clearTheHeader, protectedHand } from "../controller/userConteroller/protectedRoutes.js";
import { logoutFn } from "../controller/userConteroller/logoutController.js";
import { removeWhislist, renderWishlistPage, whislistFn } from "../controller/userConteroller/whislistController.js";

const router=express.Router();

router.get("/",clearTheHeader,homeRender)
router.get("/register",registerGetFn);
router.post("/register",userResiter)
router.post("/send-otp",otp)
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));
// Callback route
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);
router.get('/auth/google/success', authSuccess);
// Route for login failure
router.get('/auth/google/failure', authFailure);
router.get('/auth/protected', protectedHand, authProtected);
router.get("/login",clearTheHeader,loginGetFn)
router.post("/login",loginPost)
router.get("/logout",logoutFn)
router.get("/category",clearTheHeader,getCategory)
router.get("/checkout",protectedHand,getCheckout)
router.get("/contact",clearTheHeader,getContact)
router.get("/singleprodect/:id",clearTheHeader,getSingleProdect)
router.get("/whislistAdd/:id",protectedHand,whislistFn)
router.get('/wishlist', protectedHand,renderWishlistPage)
router.get("/remove-from-wishlist/:id",removeWhislist)
router.get("/addToCart/:id",protectedHand,addToCart)
router.get("/cart",cartRenderPage)
export default router