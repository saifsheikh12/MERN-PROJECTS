const { Router } = require("express");
const express=require("express")
const router=express.Router();
const postController=require("../controller/postController")
const commentController=require("../controller/commentController")


router.post("/post",postController.createpost)
router.get("/getpost/:postId",postController.getpost)
router.delete("/deletepost/:postId",postController.deletepost)
router.put("/updatepost/:postId",postController.updatepost)



router.post("/comment",commentController.createcomment)
router.get("/getcomment/:commentId",commentController.getcomment)
router.delete("/deletecomment/:commentId",commentController.deletecomment)
router.put("/updatecomment/:commentId",commentController.updatecomment)



module.exports=router

