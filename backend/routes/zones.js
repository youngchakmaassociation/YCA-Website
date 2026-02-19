const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ success: true, count: 0, data: [] }));
router.get('/:id', (req, res) => res.json({ success: true, data: {} }));
router.post('/', (req, res) => res.json({ success: true, data: req.body }));
router.put('/:id', (req, res) => res.json({ success: true, data: req.body }));
router.delete('/:id', (req, res) => res.json({ success: true, data: {} }));

module.exports = router;
