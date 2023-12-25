import express from "express";

import { uploadCard } from "../controllers/controllers.js";

const router = express.Router();

router.post('/', uploadCard);

// router.get('/searchByID', searchById);
// router.get('/searchByName', searchByName);
// router.get('/searchByDOB', searchByDOB);
// router.get('/searchByExpiryDate', searchByExpiryDate);
// router.get('/searchByIssueDate', searchByIssueDate);

// router.patch('/editID', editID);

// router.delete('/deleteID', deleteID);

export default router;