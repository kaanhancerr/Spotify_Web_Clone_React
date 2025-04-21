import { Box, duration, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getAllMusicDetails, setCurrentTrack } from "../redux/slices/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import BoxCard from "./BoxCard";

const CardGrid = () => {
    const dispatch = useDispatch();
    const { recently_played, recommended } = useSelector((store) => store.music) //useSelector storedaki veriyi ceker!!!!

    useEffect(() => {
        // console.log('recently:', recently_played)
        // console.log('recommended:', recommended)
        dispatch(getAllMusicDetails());
        // return () => {
        //     MusicActions.setRecommended(null)
        // }
    }, [])

    return (
        <Box maxWidth='1080px' marginTop='120px' marginLeft='32px' sx={{}}>
            {/* Yakinda Calinanlarin gorunumu */}
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 0, fontFamily: "sans-serif" }}>
                Yakında Çalınanlar
            </Typography>
            <Box >

                <Grid container spacing={2} marginTop='25px' >
                    {recently_played.map((card, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <BoxCard
                                title={card.title}
                                subtitle={card.subtitle}
                                image={card.image}
                                description={card.description}
                                onClick={() => dispatch(setCurrentTrack({ ...card, cover_image: card.image, artist: card.title }))}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Tavsiye edilenler  */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 6, fontFamily: "sans-serif" }}>
                Tavsiye Edilenler
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 11, fontFamily: 'inherit' }}>
                Sevdiğin her şeyden biraz dinle.
            </Typography>
            <Grid container spacing={2} marginTop={3}>
                {recommended.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={`uniq-${index}`}>
                        <BoxCard
                            title={card.title}
                            description={card.description}
                            image={card.image}
                            onClick={() => dispatch(setCurrentTrack({ ...card, cover_image: card.image, artist: card.title }))}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default CardGrid