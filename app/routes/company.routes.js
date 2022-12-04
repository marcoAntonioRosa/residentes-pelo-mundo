const company = require("../controllers/company.controller.js");
const { authenticateToken } = require('../middlewares/authentication.middleware');
const { authRole } = require('../middlewares/role.middleware');
const { ROLE } = require('../utils/definitions');
const router = require("express").Router();

router.post("/", authenticateToken, authRole(ROLE.admin), company.create);
router.get("/", company.findAll);
router.get("/findAllBasic", company.findAllBasic);
router.get("/:id", company.findOne);
router.put("/:id", authenticateToken, authRole(ROLE.admin), company.update);
router.delete("/:id", authenticateToken, authRole(ROLE.admin), company.delete);

module.exports = router