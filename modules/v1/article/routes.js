const express = require("express");
const authMiddleware = require("../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("../../../utils/middlewares/accessLevelMiddleware");
const { uploader } = require("../../../utils/uploader");
const { roles } = require("../../../utils/constants");
const {
  addArticle,
  removeArticle,
  getAll,
  getArticle,
  updateArticle,
} = require("./controller");

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    authMiddleware,
    accessLevelMiddleware(roles.author),
    uploader("public/articles/covers").single("upload"),
    addArticle
  );

router
  .route("/:id")
  .get(getArticle)
  .delete(authMiddleware, accessLevelMiddleware(roles.admin), removeArticle)
  .put(
    authMiddleware,
    accessLevelMiddleware(roles.author),
    uploader("public/articles/covers").single("upload"),
    updateArticle
  );

module.exports = router;
