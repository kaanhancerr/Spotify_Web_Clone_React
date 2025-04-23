import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import top50 from '../assets/top50.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useSelector } from "react-redux";
import PauseIcon from '@mui/icons-material/Pause';

const PlayerBox = () => {

    const { current_track } = useSelector((store) => store.music);

    const { cover_image, artist, album, duration, title } = current_track;
    //object destructuring yaptim

    const defaultDuration = '03:00';
    const durationTime = defaultDuration;


    // süreyi saniyeye ceviriyoruz.
    const parseDuration = (dur) => {
        if (!dur) return 0; //if (dur degeri yoksa 0 dondur)
        const [mins, secs] = dur.split(':').map(Number); //else
        return mins * 60 + secs;
    }

    const totalDuration = parseDuration(durationTime);

    const [currentTime, setCurrentTime] = useState(0); // 0 dan baslatiyoruz.
    // currenTime = kac saniye gectigini tutmak icin 
    const [isPlaying, setIsPlaying] = useState(true); // otomatik sarkiyi baslatiyoruz.
    // sarki basladi mi baslamadi mi onu tutmak icin de isPlaying kullandim.

    useEffect(() => {
        setCurrentTime(0); // Yeni şarkıya tıklandığında barı sıfırla
    }, [current_track]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    const next = prev + 1;
                    if (next >= totalDuration) {
                        setIsPlaying(false)
                        return 0;
                    }
                    return next;
                })
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [isPlaying, totalDuration])


    const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = (time % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
        //         String(mins) ile mins değişkenini string'e dönüştürüyoruz. Mesela mins 2 ise, bu işlem onu "2"'ye çevirir.
        // padStart(2, '0') fonksiyonu, eğer bu string'in uzunluğu 2'den küçükse, eksik olan basamağı '0' ile doldurur. Yani, "2"'yi "02"'ye çeviririz.
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    }


    return (
        <Box sx={{
            position: 'fixed',
            backgroundColor: "#282828",
            height: 96,
            bottom: 0,
            left: 0,
            right: 0,


        }}>
            <Box display={"flex"} alignItems={"center"} height={"100%"} paddingX={3} position={"relative"}>

                {/* 1.Box current_track.cover_image ? dogruysa burasi : degilse burasi.

                koşul ? doğruysa_bunu_yap : yanlışsa_bunu_yap;*/}

                <Box>
                    {/* Ternary operator kullanimi */}

                    {current_track.cover_image ? <img src={current_track.cover_image} alt="" style={{ height: 48, width: 48 }} /> : null}

                    {/* alternatifi -- short-circuit evaluation --kısa devre değerlendirmesi

                    {current_track.cover_image && (<img src={current_track.cover_image} alt="" style={{ height: 48, width: 48 }} />)}
                    
                    */}
                </Box>

                {/* 2. Box */}
                <Box sx={{ paddingLeft: 2 }}>
                    <Typography fontWeight={500} fontSize={14}>{current_track.album}</Typography>
                    <Typography sx={{ opacity: 0.7 }} fontWeight={400} fontSize={12}>{artist}</Typography>
                </Box>

                {/* 3. Box */}
                <Box>
                    <FavoriteBorderIcon sx={{ paddingLeft: 3, fontSize: 16, opacity: 0.5 }} />

                </Box>

                {/* 4.Box(2 box a bolunecek) */}
                <Box gap={'10px'} alignItems={"center"} sx={{ display: "flex", flexDirection: "column", position: 'absolute', left: '50%', transform: "translateX(-50%)" }}>
                    <Box gap={'20px'} display={"flex"} alignItems={"center"}>
                        <SkipPreviousIcon sx={{ fontSize: 30, opacity: 0.5 }} />
                        {isPlaying ? (<PauseIcon onClick={handlePlayPause} sx={{ fontSize: 39, opacity: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }} />) : (<PlayCircleIcon onClick={handlePlayPause} sx={{ fontSize: 39, opacity: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }} />)}

                        <SkipNextIcon sx={{ fontSize: 30, opacity: 0.5 }} />
                    </Box>
                    <Box gap={'10px'} display={"flex"} alignItems={"center"} >
                        <Typography sx={{ fontSize: 14, opacity: 0.7 }}>{formatTime(currentTime)}</Typography>
                        <Box height={6} width={496} sx={{ opacity: 0.8, backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
                            <Box height="100%" style={{ width: `${progressPercent}%`, backgroundColor: '#1db954', transition: 'width 0.3s ease' }} />

                        </Box>
                        <Typography sx={{ fontSize: 14, opacity: 0.7 }} >{durationTime}</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
export default PlayerBox