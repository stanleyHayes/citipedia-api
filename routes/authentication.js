import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router({mergeParams: true});

const {
    register,
    login,
    getLoggedInAccount,
    deleteAccount,
    updateProfile,
    resetPassword,
    verifyAccount,
    forgotPassword
} = require('../controllers/authentication');

router.post('/register', register);
router.post('/login', login);
router.put('/me', auth, updateProfile);
router.get('/me', auth, getLoggedInAccount);
router.delete('/me', auth, deleteAccount);
router.put('/:token/verify-password', verifyAccount);
router.post('/:token/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);