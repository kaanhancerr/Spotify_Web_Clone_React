import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";


const BoxCard = ({ title, image, subtitle, description, onClick, duration }) => {
    return (
        <div>
            <Box
                onClick={onClick}
                sx={{
                    width: 203,
                    height: 273,
                    backgroundColor: "rgba(128, 128, 128, 0.195)",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: 'transform 0.2s ease-in-out', //geçis efekti
                    "&:hover": { transform: "scale(1.1)" }, // boxun uzerine gelince buyume efekt

                }}>
                <Box sx={{
                    width: 171,
                    height: 171,
                    margin: 2
                }}>
                    <img src={image} alt={title} style={{
                        width: "100%",
                        height: '100%',

                    }} />
                </Box>
                <Box sx={{ width: 171, height: 18 }}>
                    <Typography
                        variant="subtitle1" sx={{ fontWeight: 500, fontSize: 14, marginLeft: 2 }} >{title}
                    </Typography>
                </Box>
                {/* ml = marginLeft 
                mt = margin top
                mr = margin right
                mb = marginbottom
                material ui da ki 1 normalde 8px e esit.
                */}

                <Box sx={{ width: 171, height: 14, mt: "6px", ml: 2 }}>
                    <Typography
                        variant="body6" sx={{ fontSize: 12, fontWeight: 500, opacity: 0.6 }}>{description}
                    </Typography>
                </Box>

            </Box>
        </div>
    )
}

export default BoxCard