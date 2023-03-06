const express = require("express");
const {
  Register,
  Login,
  Create,
  Notes,
  Update,
  Delete,
} = require("./controller");
const router = express.Router();

require("./server");

router.post("/register", Register);

router.post("/login", Login);

router.post("/create", Create);

router.post("/notes", Notes);

router.post("/update", Update);

router.post("/delete", Delete);

module.exports = router;
