const playlist = require("../models/playlist_model"); 
const { catchAsync, AppError, handleDBErrors } = require("./error");
const RoomService = require('../models/room_model');

const playlistController = {
    addPlaylist: catchAsync(async (req, res, next) => {
        const { id_playlist, name_playlist, playlist_cat, playlist_type } = req.body;
        const newPlaylist = await playlist.addPlaylist(id_playlist, name_playlist, playlist_cat, playlist_type);
        res.status(201).json({
            status: 'success',
            data: {
                playlist: newPlaylist
            }
        });
    }),
    getAllPlaylists: catchAsync(async (req, res, next) => {
        const playlists = await playlist.getAllPlaylists();
        res.status(200).json({
            status: 'success',
            results: playlists.length,
            data: {
                playlists
            }
        });
    }),
    getPlaylistById: catchAsync(async (req, res, next) => {
        const { id_playlist } = req.params;
        const playlistData = await playlist.getPlaylistById(id_playlist);
        if (!playlistData) {
            return next(new AppError('No playlist found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                playlist: playlistData
            }
        });
    }),
    deletePlaylist: catchAsync(async (req, res, next) => {
        const { id_playlist } = req.params;
        const deletedPlaylist = await playlist.deletePlaylist(id_playlist);
        if (!deletedPlaylist) {
            return next(new AppError('No playlist found with that ID', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    }),
    ajoutMotCleDansPlaylist: catchAsync(async (req, res, next) => {
        const { id_playlist, id_keyword } = req.body;
        const newKeyword = await playlist.ajoutMotCleDansPlaylist(id_playlist, id_keyword);
        res.status(201).json({
            status: 'success',
            data: {
                keyword: newKeyword
            }
        });
    }),
    addCoursToPlaylist: catchAsync(async (req, res, next) => {
        const { id_playlist, id_cour } = req.body;
        const { id_user } = req.params; // ID de l'utilisateur propriétaire

        // 1. Vérifier que l'utilisateur possède la playlist
        const userPlaylists = await playlist.getPlaylistsByUserId(id_user);
        if (!userPlaylists.some(p => p.id_playlist === id_playlist)) {
            return next(new AppError('Unauthorized - Not your playlist', 403));
        }

        // 2. Ajouter le cours à la playlist
        const relation = await PlaylistCour.addPlaylistCour(id_playlist, id_cour);

        // 3. Créer automatiquement une salle si elle n'existe pas
        const cours = await Cours.getCoursById(id_cour);
        if (!cours.room_name) {
            const roomName = await RoomService.createRoomForCours(id_cour, `room-${id_cour}`);
        }

        res.status(201).json({
            status: 'success',
            data: {
                relation,
                roomCreated: !cours.room_name
            }
        });
    }),
};

module.exports = playlistController;
