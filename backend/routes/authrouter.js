import express from 'express';
import { signup, login, getAllUsers, createOrFindConversation,messagesPushing } from '../controller/authcontroller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// User routes
router.get('/users',authenticateToken, getAllUsers);

// Conversation routes
router.post('/conversations',createOrFindConversation);
router.post('/messages',messagesPushing)

export default router;
