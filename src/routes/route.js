const express = require('express');

const router = express.Router();
const personController=require("../controllers/controller");
const Middleware =require("../middleWare/auth")

router.post("/person",personController.createPerson);
router.post("/login",personController.login);
router.put("/update/:personId",Middleware.authorize,personController.updatePerson);
router.get("/getDetailsById/:personId",Middleware.authorize,personController.getDetailsById)


module.exports = router;
















