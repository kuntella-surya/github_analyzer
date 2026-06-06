import {analyzeProfile} from "../controllers/analyzeprofile.js";
import {getAllProfiles,getProfileByUsername} from "../controllers/getprofile.js";
import express from "express";
const router = express.Router();
router.post("/analyze/:username", analyzeProfile);
router.get("/profiles", getAllProfiles);
router.get("/profiles/:username", getProfileByUsername);
export default router;