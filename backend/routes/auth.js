const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => res.json({ success: true, data: { token: 'mock-token', user: { name: 'Demo User', role: 'admin' } } }));
router.post('/register', (req, res) => res.json({ success: true, message: 'Registered successfully' }));
router.get('/me', (req, res) => res.json({ success: true, data: { name: 'Demo User', role: 'admin' } }));

module.exports = router;
