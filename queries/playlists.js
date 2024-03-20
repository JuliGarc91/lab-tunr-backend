const db = require('../db/dbConfig');

const getAllPlaylists = async () => { // params order / is_fave
    try {
        const allPlaylists = await db.any('SELECT * FROM playlists;')
        console.log(allPlaylists);
        return allPlaylists;
    } catch (error) {
        return error
    }
};

const getPlaylist = async (id) => {
    try {
        const onePlaylist = await db.one("SELECT * FROM playlists WHERE id=$1", id);
        return onePlaylist;
    } catch (error) {
        return error;
    }
}

const updatePlaylist = async (playlist) => {
    const { id, name, category, description, song_id } = playlist;
    try {
        const updatedPlaylist = await db.one(
            "UPDATE playlists SET name=$1, category=$2, description=$3, song_id=$4 WHERE id=$5 RETURNING *",
            [name, category, description, song_id, id]
        );
        return updatedPlaylist;
    } catch (error) {
        throw error;
    }
};

const createPlaylist = async (playlist) => {
    const { name, category, description, song_id } = playlist;
    try {
        const newPlaylist = await db.one(
            "INSERT INTO playlists (name, category, description, song_id) VALUES($1,$2,$3,$4) RETURNING *",[name, category, description, song_id]
        );
        return newPlaylist;
    } catch (error) {
        return error;
    }
};

const deletePlaylist = async (id) => {
    try {
        const deletedPlaylist = await db.one("DELETE FROM playlists WHERE id = $1 RETURNING *", id
        );
        return deletedPlaylist;
    } catch (error) {
        return error;
    }
};

module.exports={
    getAllPlaylists,
    getPlaylist,
    updatePlaylist,
    createPlaylist,
    deletePlaylist
};