const express = require('express');
const router = express.Router();
const roomController = require('../controller/room_controller');

router.get('/user/:userId', roomController.getUserRooms);
router.post('/token', roomController.generateRoomToken);
router.post('/create', roomController.createRoom);


module.exports = router;