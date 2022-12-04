const authentication = require("../controllers/authentication.controller.js");
const router = require("express").Router();

router.post("/login", authentication.login);
router.post("/refreshToken", authentication.refreshToken);
router.delete("/logout", authentication.logout);

module.exports = router