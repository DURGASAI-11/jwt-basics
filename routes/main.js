const express = require("express");
const router = express.Router();

const authController = require("../controllers/main");

const authMiddleware = require("../middleware/auth");

router
  .route("/dashboard")
  .get(authMiddleware.authenticationMiddleware, authController.dashbord);
router.route("/login").post(authController.login);

module.exports = router;
