import express from "express";

import { uploadCard, search, editRecord, deleteRecord } from "../controllers/controllers.js";

const router = express.Router();

router.post('/', uploadCard);
router.get('/searchRecords', search);
router.patch('/editRecord', editRecord);
router.delete('/deleteRecord/:id', deleteRecord);

export default router;