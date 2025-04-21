import React from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import '../css/Topbar.css';
import { Box, Button } from '@mui/material'
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const Topbar = () => {

    const { user } = useSelector((store) => store.music);

    return (
        // <div className="search-profile-container">
        //     <div className="arrow-search-icon">
        <Box display='flex' alignItems='center' justifyContent='flex-start' position={"fixed"} left={0} top={32} ml='224px'>

            <Box width='72px' height='32px' display={"flex"} gap='8px' alignItems='center' justifyContent='center' ml='32px' >

                <Box display='flex' width='32px' height='32px' backgroundColor='#030303' borderRadius='50%' alignItems='center' justifyContent='center'  >
                    <ArrowBackIosIcon sx={{ fontSize: '18px', marginLeft: '6px', color: 'white', opacity: 0.47 }} />
                </Box>

                <Box display='flex' width='32px' height='32px' backgroundColor='#030303' borderRadius='50%' alignItems='center' justifyContent='center'  >
                    <ArrowForwardIosIcon sx={{ fontSize: '18px', color: '#FFFFFF', opacity: 0.47 }} />
                </Box>

            </Box>
            <Box marginLeft='32px' flexGrow={1}>
                <TextField size="small" variant="outlined" placeholder="Ara"
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: 18,
                        ml: 2,

                        '& .MuiOutlinedInput-root.Mui-focused': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        height: 35,
                        width: 265
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
            </Box>

            {/* <div className="search-box-container1">
                    <CiSearch className="search-icon-topbar" />
                    <input type="text" name="" id="" placeholder="Ara" className="search-input-topbar" />
                </div> */}

            <Box maxWidth='203px' maxHeight='40px' marginLeft='500px'>
                <Button variant="contained" disableElevation
                    sx={{
                        display: 'flex',
                        // inline olursa ... gozukmez ya inline-block ya da block element olmasi gerek.
                        borderRadius: '27px',
                        maxWidth: '100%',
                        "&.MuiButtonBase-root": {
                            backgroundColor: " rgba(128, 128, 128, 0.195);",
                            color: "rgb(250, 247, 247);",
                            textTransform: "none",
                            justifyContent: "flex-start",
                        }
                    }}
                    startIcon={
                        user.profile_picture ? <img src={user.profile_picture} style={{ height: 30, width: 30, borderRadius: 30 }} /> : null
                    }
                >
                    <Box display='block' sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.name}
                    </Box>

                    {/* <span style={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {user.name}
                    </span> */}

                </Button>
            </Box>
        </Box>
    )
}

export default Topbar