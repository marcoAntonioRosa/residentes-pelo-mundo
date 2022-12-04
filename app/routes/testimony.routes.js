const testimony = require("../controllers/testimony.controller.js");
const { authenticateToken } = require('../middlewares/authentication.middleware');
const { authRole } = require('../middlewares/role.middleware');
const { ROLE } = require('../utils/definitions');
const { canModifyTestimony } = require('../middlewares/access.midleware');
const router = require("express").Router();

router.post("/", authenticateToken, authRole(ROLE.student), testimony.create);
router.get("/", testimony.findAll);
router.get("/:id", testimony.findOne);
router.put("/:id", authenticateToken, authRole(ROLE.student), testimony.update);
router.delete("/:id", authenticateToken, canModifyTestimony, testimony.delete);
router.post("/approve/:id", authenticateToken, authRole(ROLE.admin), testimony.approve);

module.exports = router