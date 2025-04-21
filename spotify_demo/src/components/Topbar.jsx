import React from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { CiSearch, CiFilter } from "react-icons/ci";
import { SpotifyLogo } from "../icons/icons";
import '../css/Topbar.css';
import { Button } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";


const Topbar = () => {

    const { user } = useSelector((store) => store.music);

    return (
        <div className="search-profile-container">
            <div className="arrow-search-icon">

                <MdOutlineArrowBackIos className="arrow-icon" />
                <MdOutlineArrowForwardIos className='arrow-icon' />
                <TextField size="small" variant="outlined" placeholder="Ara"
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: 18,

                        '& .MuiOutlinedInput-root.Mui-focused': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        height: 35,
                        width: 265
                    }}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ color: 'white', opacity: 0.6, fontSize: 22 }} />
                    }}
                    slotProps={{
                        inputAdornment: {
                            position: 'start',
                        }
                    }} />

                {/* <div className="search-box-container1">
                    <CiSearch className="search-icon-topbar" />
                    <input type="text" name="" id="" placeholder="Ara" className="search-input-topbar" />
                </div> */}

            </div>
            <div className="profile-container">
                <Button sx=
                    {{
                        textTransform: "uppercase",
                        borderRadius: '25px',
                        width: "220px",
                        "&.MuiButtonBase-root": {
                            backgroundColor: " rgba(128, 128, 128, 0.195);",
                            color: "rgba(255, 255, 255, 0.381);",
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }
                    }}
                    startIcon={
                        user.profile_picture ? <img src={user.profile_picture} style={{ height: 30, width: 30, borderRadius: 30 }} /> : null
                    }
                    variant="contained" disableElevation>
                    {user.name}
                </Button>

            </div>
        </div>
    )
}

export default Topbar