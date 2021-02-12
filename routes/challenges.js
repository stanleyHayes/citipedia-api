import express from "express";
import {auth} from "../middleware/auth.js";
import {
    createChallenge,
    deleteChallenge,
    getChallenge,
    getChallenges,
    updateChallenge
} from "../controllers/challenges.js";

const router = express.Router({mergeParams: true});

router.post('/', auth, createChallenge);
router.get('/', auth, getChallenges);
router.get('/', auth, getChallenge);
router.put('/', auth, updateChallenge);
router.delete('/', auth, deleteChallenge);

export default router;