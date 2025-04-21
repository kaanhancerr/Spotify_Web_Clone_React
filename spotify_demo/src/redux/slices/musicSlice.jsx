import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const music_url = 'https://cdn.oneri.io/web-team/case/spotify.json';

export const getAllMusicDetails = createAsyncThunk('musicDetails', async () => {
    const response = await axios.get(music_url);
    return response.data;

})

const musicSlice = createSlice({
    name: 'music',
    initialState: {
        recently_played: [],
        recommended: [],
        current_track: {
            title: '',
            artist: '',
            album: '',
            duration: '',
            cover_image: ''
        },
        user: {
            name: '',
            profile_picture: '',
        },
        playlists: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setRecommended: (state, action) => {
            state.recommended = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.current_track = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMusicDetails.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(getAllMusicDetails.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.recently_played = action.payload.recently_played;
            state.recommended = action.payload.recommended;
            state.current_track = action.payload.current_track;
            state.user = action.payload.user;
            state.playlists = action.payload.playlists;
        })
        builder.addCase(getAllMusicDetails.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})
export const { setCurrentTrack, setRecommended } = musicSlice.actions

//Burada MusicActions {setCurrentTrack, setRecommended} sadece bir isim. Bu şu anlama gelir:
//Artık musicSlice.actions objesine, dışarıdan MusicActions adıyla erişebilirim.



export default musicSlice.reducer