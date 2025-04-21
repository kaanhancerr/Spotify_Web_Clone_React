import React, { useState } from "react";
import '../css/Sidebar.css';
import spotify from '../assets/spotify-logo.jpg'
import { AiFillHome } from "react-icons/ai";
import { CiSearch, CiFilter } from "react-icons/ci";
import { BiLibrary } from "react-icons/bi";
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');

    const { playlists } = useSelector((store) => store.music);

    const filteredPlaylists = (playlists.filter((newList) =>
        newList.title.toLowerCase().includes(searchText.toLocaleLowerCase())
        // newList in titleini alip kucuk harflere ceviriyoruz. includes fonksiyonu da bir stringin ya da bir array’in içinde belirli bir değerin olup olmadığını kontrol eder.
        // yani burda includes (Title'ın içinde searchText yazıyor mu?)
        //"includes" fonksiyonu, küçük harfe çevrilmiş title içinde, küçük harfe çevrilmiş searchText ifadesi geçiyor mu? diye kontrol eder. Geçiyorsa true döner.
    ));


    return (
        <div className="sidebar">
            <img src={spotify} alt="" className="img-spotify" />
            {/* <img src="../assets/spotify-logo.jpg" alt="Spotify Logo" /> */}
            <ul className="ul-nav">
                <li className="li-container" ><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('/')} > <AiFillHome className="icons" /> Giriş</button></li>
                <li className="li-container"><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('browse')} > <CiSearch className="icons" />Gözat</button></li>
                <li className="li-container"><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('/library')} ><BiLibrary className="icons" /> Kitaplık</button></li>
            </ul>
            <p className="letter-spacing">Çalma Listelerin</p>
            <TextField size="small" variant="outlined" placeholder="Ara"
                value={searchText} onChange={(e) => setSearchText(e.target.value)}
                sx={{
                    marginTop: '14px',
                    marginLeft: '24px',
                    height: 35,
                    width: 177,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: 18,

                    '& .MuiInputBase-input': {
                        color: 'white'
                    },

                    '& .MuiOutlinedInput-root.Mui-focused': {
                        '& fieldset': {
                            borderColor: 'transparent',

                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><SearchIcon sx={{ color: 'white', opacity: 0.6, fontSize: 22 }} /></InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end"> <FilterAltIcon sx={{ color: 'white', opacity: 0.6, fontSize: 22 }} /></InputAdornment>
                    )
                }}


            />
            {/* <div className="search-box-container">
                <CiSearch className="search-icon" />
                <input type="text" placeholder="Ara" className="search-input" />
                <CiFilter className="search-filter" />
            </div> */}
            <ul className="ul-nav">
                {filteredPlaylists.map((list, index) => (
                    <li style={{ width: 172, height: 18, marginTop: 16 }} key={index}>
                        <button style={{ fontSize: 14, fontWeight: 500 }}> {list.title} </button>
                    </li>
                ))}
            </ul>

            {/* Dinamik tasarim olmadan onceki hali (alttaki) */}

            {/* <ul className="ul-nav">
                <li><button>Calma listesi 1</button></li>
                <li><button>Calma listesi 2</button></li>
                <li><button>Calma listesi 3</button></li>
            </ul> */}
        </div>
    )
}

export default Sidebar;