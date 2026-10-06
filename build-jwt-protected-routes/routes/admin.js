import express from 'express';
// import { findByEmail, readUsers, writeUsers } from '../utils/db.js';
// import { signToken } from '../utils/jwt.js';
import authenticate from '../middleware/authenticate.js';
import authorizeRole from '../middleware/authorize.js';
import { readUsers } from '../utils/db.js';

const router = express.Router();

router.get('/users', authenticate, authorizeRole('admin'), (req, res) => {
    const users = readUsers();
    users.forEach(user => {
        delete user.passwordHash; // Remove passwordHash before sending the response
    });
    res.json({users});
});

export default router;