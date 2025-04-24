import React, { useState } from "react";
import { Box, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SpotifyLogo1 } from "../icons/icons";
const Sidebar = () => {

    const [anchorEl, setAnchorEl] = useState(null); //menunun acildigi konum bilgisini burda tutacagiz.
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); // calma listesini tutucak(ikon tiklanan)

    const handleMenuClick = (event, list) => {
        event.stopPropagation(); // sadece iconbutton calissin bunun parent ogeleri calismasin. Bu olay yukarı yayılmasın, sadece bu üç nokta ikonuyla sınırlı kalsın! 
        setAnchorEl(event.currentTarget); //  tıklanan MoreHorizIcon’ın DOM elementini verir. “Material UI menüsünü bu üç nokta ikonunun hemen altında aç!”
        setSelectedPlaylist(list); // tiklanan iconun bulundugu calma listini tutar.
    }

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedPlaylist(null);
    }

    const handleEdit = () => {
        console.log('Duzenleme yapildi');
        handleClose();
    }

    const handleDelete = () => {
        console.log('Silindi');

        const updatePlaylists = newFilteredPlaylists.filter((list) => (
            list !== selectedPlaylist
        ))
        setNewFilteredPlaylists(updatePlaylists);
        handleClose();
    }

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');

    const { playlists } = useSelector((store) => store.music);

    const filteredPlaylists = (playlists.filter((newList) =>
        newList.title.toLowerCase().includes(searchText.toLocaleLowerCase())
        // newList in titleini alip kucuk harflere ceviriyoruz. includes fonksiyonu da bir stringin ya da bir array’in içinde belirli bir değerin olup olmadığını kontrol eder.
        // yani burda includes (Title'ın içinde searchText yazıyor mu?)
        //"includes" fonksiyonu, küçük harfe çevrilmiş title içinde, küçük harfe çevrilmiş searchText ifadesi geçiyor mu? diye kontrol eder. Geçiyorsa true döner.
    ));

    const [newFilteredPlaylists, setNewFilteredPlaylists] = useState([]);
    // Gecici veri cogaltma scroll denemesi icin

    if (filteredPlaylists.length > 0) {
        for (let i = 0; i < 20; i++) {
            newFilteredPlaylists.push(filteredPlaylists[i % filteredPlaylists.length]);
        }
    }

    const menuItems = [
        { icon: <HomeIcon sx={{ width: 17, height: 17, color: 'white', opacity: 0.6 }} />, label: 'Giriş', route: '/' },
        { icon: <SearchIcon sx={{ width: 17, height: 17, color: 'white', opacity: 0.6 }} />, label: 'Gözat', route: '/browse' },
        { icon: <LibraryBooksIcon sx={{ width: 17, height: 17, color: 'white', opacity: 0.6 }} />, label: 'Kitaplık', route: '/library' },
    ];

    return (
        <Box display={"flex"} flexDirection={"column"} width='224px' height='calc(100% - 96px)' position='fixed' left={0} top={0} sx={{ backgroundColor: '#030303', paddingLeft: '16px' }} >

            {/* <div className="sidebar"> */}

            <Box mt='41px' mb='40px'>

                <SpotifyLogo1 width={100} height={50} />

            </Box>
            {/* <img src="../assets/spotify-logo.jpg" alt="Spotify Logo" /> */}
            <Box display={"flex"} flexDirection='column' width='200px' height='120px'>
                <List sx={{ width: '200px', height: '100%', fontSize: '14px', fontWeight: 500 }}>
                    {menuItems.map((item, index) => (
                        <ListItem disablePadding key={index} sx={{ mb: '11px' }}>
                            <ListItemButton
                                sx={{
                                    padding: 0,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                    '&:hover .MuiTypography-root': {
                                        color: 'white',
                                        opacity: 1,
                                    },
                                    '&:hover svg': {
                                        color: 'white',
                                        opacity: 1,
                                    },
                                }}
                                onClick={() => (
                                    navigate(item.route)
                                )}
                            >
                                {item.icon}
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        marginLeft: '16px',
                                        '& .MuiTypography-root': {
                                            color: 'white',
                                            opacity: '0.6'
                                        }
                                    }}

                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* <ul className="ul-nav">
                    <li className="li-container" ><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('/')} > <AiFillHome className="icons" /> Giriş</button></li>
                    <li className="li-container"><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('browse')} > <CiSearch className="icons" />Gözat</button></li>
                    <li className="li-container"><button style={{ fontSize: 14, fontWeight: 500 }} onClick={() => navigate('/library')} ><BiLibrary className="icons" /> Kitaplık</button></li>
                </ul> */}
            </Box>
            {/* <p className="letter-spacing">Çalma Listelerin</p> */}
            <Box mt='80px'>
                <Typography sx={{ opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.15, lineHeight: 1, fontSize: '12px', fontWeight: 400 }} variant='body2'>Çalma Listelerin</Typography>
                <TextField size="small" variant="outlined" placeholder="Ara"
                    value={searchText} onChange={(e) => setSearchText(e.target.value)}
                    sx={{
                        marginTop: '14px',
                        height: 35,
                        width: 177,
                        backgroundColor: "rgba(128, 128, 128, 0.195)",
                        borderRadius: 18,

                        '& .MuiInputBase-root': {
                            color: 'white',
                            opacity: 0.5

                        },

                        '& .MuiOutlinedInput-root.Mui-focused': {
                            '& fieldset': {
                                borderColor: 'transparent',
                                color: 'white'

                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><SearchIcon sx={{ color: 'white', opacity: 0.3, width: '20px', height: '20px' }} /></InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end"> <FilterAltIcon sx={{ color: 'white', opacity: 0.3, width: '20px', height: '20px' }} /></InputAdornment>
                        )
                    }}


                />
            </Box>
            {/* <div className="search-box-container">
                <CiSearch className="search-icon" />
                <input type="text" placeholder="Ara" className="search-input" />
                <CiFilter className="search-filter" />
            </div> */}
            <Box overflow='auto' >
                <List sx={{ overflow: 'auto' }} >
                    {newFilteredPlaylists.map((list, index) => (
                        <ListItem key={index} sx={{ width: '220px', height: '18px', marginBottom: '16px', padding: 0 }}>
                            <ListItemButton sx={{
                                fontSize: 12, fontWeight: 500, padding: 0,
                                '&:hover .MuiTypography-root': {
                                    color: 'white',
                                    opacity: 1

                                },
                                '&:hover': {
                                    backgroundColor: 'transparent'
                                },

                            }} >
                                <ListItemText primary={list.title} sx={{

                                    "& .MuiTypography-root": {
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: 'white',
                                        opacity: 0.6
                                    },

                                }} />
                                <IconButton onClick={(e) => handleMenuClick(e, list)}
                                    sx={{
                                        color: 'grey',
                                        '&:hover .MuiSvgIcon-root': {
                                            color: 'white',
                                            opacity: 1
                                        }
                                    }}>

                                    <MoreHorizIcon
                                    // sx={{
                                    //     color: 'white',
                                    //     opacity: 0.5,
                                    // }}
                                    // onClick={() =>
                                    //     console.log('click')
                                    // }

                                    />
                                </IconButton>

                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Menu

                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                        backgroundColor: 'transparent', opacity: 1, color: 'red',
                        '& .MuiPaper-root': {
                            backgroundColor: 'white',
                            opacity: '0.5'
                        },
                    }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // konum belirtiyor. ikona gore(bottom demesi popoverin ikona gore altinda olacagini belirtir.)
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}

                >
                    <MenuItem sx={{ opacity: 0.5, color: 'black' }} onClick={handleEdit}>Düzenle</MenuItem>
                    <MenuItem sx={{ opacity: 0.5, color: 'black' }} onClick={handleDelete}>Sil</MenuItem>


                </Menu>
                {/* <ul className="ul-nav">
                    {newFilteredPlaylists.map((list, index) => (
                        <li style={{ width: 172, height: 18, marginTop: 16 }} key={index}>
                            <button style={{ fontSize: 14, fontWeight: 500 }}> {list.title} </button>
                        </li>
                    ))}
                </ul> */}
            </Box>

            {/* Dinamik tasarim olmadan onceki hali (alttaki) */}

            {/* <ul className="ul-nav">
                <li><button>Calma listesi 1</button></li>
                <li><button>Calma listesi 2</button></li>
                <li><button>Calma listesi 3</button></li>
            </ul> */}

            {/* </div> */}

        </Box >
    )
}

export default Sidebar;