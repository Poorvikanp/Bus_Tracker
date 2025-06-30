const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', busController.getAllBuses);
router.get('/direction/:direction', busController.getBusesByDirection);
router.get('/:id', busController.getBusById);

// Protected routes (for conductors/drivers)
router.post('/update/:id', auth, busController.updateBusStatus);
router.post('/', busController.createBus);
router.delete('/:id', busController.deleteBus);

module.exports = router; 