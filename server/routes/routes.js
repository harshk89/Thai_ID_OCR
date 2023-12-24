import express from "express";

// import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, getPostsByUserId } from "../controllers/posts.js";

const router = express.Router();

router.post('/', uploadID);

router.get('/searchByID', searchById);
router.get('/searchByName', searchByName);
router.get('/searchByDOB', searchByDOB);
router.get('/searchByExpiryDate', searchByExpiryDate);
router.get('/searchByIssueDate', searchByIssueDate);

router.patch('/editID', editID);

router.delete('/deleteID', deleteID);

export default router;