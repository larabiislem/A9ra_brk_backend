const RoomService = require('../models/room_model');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.getUserRooms = handleDBErrors(catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const rooms = await RoomService.getUserRooms(userId);
  
  res.status(200).json({
    status: 'success',
    data: {
      rooms
    }
  });
}));

exports.generateRoomToken = handleDBErrors(catchAsync(async (req, res, next) => {
  const { userId, roomName } = req.body;
  
  
  const hasAccess = await RoomService.validateUserAccess(userId, roomName);
  if (!hasAccess) {
    return next(new AppError('Unauthorized access to this room', 403));
  }

  // Générer le token LiveKit (implémentation réelle nécessite livekit-server-sdk)
  const token = "mock-token-" + Math.random().toString(36).substring(7);
  
  res.status(200).json({
    status: 'success',
    data: {
      token
    }
  });
}));

exports.createRoom = handleDBErrors(catchAsync(async (req, res, next) => {
    const { roomName, userId } = req.body;
    
    const room = await RoomService.createRoom(roomName, userId);
    
    res.status(201).json({
        status: 'success',
        data: {
        room
        }
    });
    }));