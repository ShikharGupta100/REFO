const {Router} = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middlewares")

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * 
 */
authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * 
 */
authRouter.post("/login",authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get("/logout",authMiddleware.authUser,authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's details
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getmeController);

module.exports = authRouter;