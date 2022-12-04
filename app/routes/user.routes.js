const user = require("../controllers/user.controller.js");
const { authenticateToken } = require('../middlewares/authentication.middleware');
const { authRole } = require('../middlewares/role.middleware');
const { ROLE } = require('../utils/definitions');
const { canModify } = require('../middlewares/access.midleware');
const router = require("express").Router();

// router.post("/", authenticateToken, authRole(ROLE.admin), user.create);
router.post("/", user.create);
router.get("/", authenticateToken, user.findAll);
router.get("/:id", authenticateToken, user.findOne);
router.put("/:id", authenticateToken, canModify ,user.update);
router.delete("/:id", authenticateToken, canModify, user.delete);

module.exports = router