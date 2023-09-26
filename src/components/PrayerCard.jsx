import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function PrayerCard({ name, time, image }) {
    // Use a media query hook to detect screen size
    const isLargeScreen = useMediaQuery('(min-width: 1000px)'); // Adjust the breakpoint as needed
    const isMidScreen = useMediaQuery('(min-width: 700px)'); // Adjust the breakpoint as needed

    // Define the card width based on screen size
    const cardWidth = isLargeScreen ? '19%' : isMidScreen ? '48%' : '80%';
    return (
        <Card sx={{ width: cardWidth }} >
            <CardMedia
                component="img"
                height="180"
                image={image}
                alt="salatImg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="h2" color="text.secondary">
                    {time}
                </Typography>
            </CardContent>
        </Card>
    )
}
