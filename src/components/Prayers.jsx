import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import PrayerCard from './PrayerCard';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import moment from 'moment';

import fajrImg from '../assets/images/fajr.png'
import dhuhrImg from '../assets/images/dhuhr.png'
import asrImg from '../assets/images/asr.png'
import maghribImg from '../assets/images/maghrib.png'
import ishaImg from '../assets/images/isha.png'

import 'moment/dist/locale/ar-ma';

moment.locale('ar');

export default function Prayers() {
    const [time, setTime] = useState('');
    const [city, setcity] = useState({
        nameApi: 'Casablanca',
        nameArbic: 'الدارالبيضاء'
    });

    const [timings, setTimings] = useState({
        Fajr: "04:20",
        Dhuhr: "11:50",
        Asr: "15:18",
        Maghrib: "18:30",
        Isha: "20:55"
    })

    const cities = [{
        nameApi: 'Casablanca',
        nameArbic: 'الدارالبيضاء'
    }, {
        nameApi: 'Berrechid',
        nameArbic: 'برشيد'
    }, {
        nameApi: 'Rabat',
        nameArbic: 'الرباط'
    }, {
        nameApi: 'Oujda',
        nameArbic: 'وجدة'
    }, {
        nameApi: 'Laayoune',
        nameArbic: 'العيون'
    }]
    
    const [nextPrayerIndex, setNextPrayerIndex] = useState(0)
    const [displayRemainingTime, setDisplayRemainingTimg] = useState()

    const prayersArray = [
        { key: 'Fajr', displayName: 'الفجر' },
        { key: 'Dhuhr', displayName: 'الظهر' },
        { key: 'Asr', displayName: 'العصر' },
        { key: 'Maghrib', displayName: 'المغرب' },
        { key: 'Isha', displayName: 'العشاء' }]

    const getTimingsApi = async () => {
        await axios.get('https://api.aladhan.com/v1/timingsByCity?city=' + city.nameApi + '&country=Morocco&method=3').then(
            (res) => {
                setTimings(res.data.data.timings);
            }
        ).catch(
            (err) => { console.log(err) }
        )
    }

    const handleChange = (event) => {
        setcity(cities.find(({ nameApi }) => nameApi === event.target.value));
    }

    const handleCountdownTimer = () => {
        const momentNow = moment();

        let ParyerIndexConst = 0

        if (momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))) {
            ParyerIndexConst = 1
        } else if (momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Asr, "hh:mm"))) {
            ParyerIndexConst = 2
        } else if (momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))) {
            ParyerIndexConst = 3
        } else if (momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Isha, "hh:mm"))) {
            ParyerIndexConst = 4
        } else {
            ParyerIndexConst = 0
        }

        setNextPrayerIndex(ParyerIndexConst);
        
        const nextPrayerTime = timings[prayersArray[ParyerIndexConst].key];
        let remainingTime =  moment(nextPrayerTime, 'hh:mm').diff(momentNow);
        if(remainingTime <0){
            //in this case if the remaining time smaller then 0 that means the next prayer is Fajr in the next day
            //so i will calclaute the diff time between midnight and time now then i will add the result to 
            //the diff time between midnight of next day 00:00 and al fajr time 
            const nowToMidnightDiff = moment('23:59:59','hh:mm:ss').diff(momentNow);
            const midnightToFajrDiff = moment(nextPrayerTime, 'hh:mm').diff(
                moment('00:00:00','hh:mm:ss')
            )

            const totalDifference = nowToMidnightDiff+midnightToFajrDiff;
            remainingTime = totalDifference;
            
        }
        
        const durationRemainingTime = moment.duration(remainingTime);

        setDisplayRemainingTimg(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)
    }

    useEffect(() => {
        getTimingsApi();
    }, [city])

    useEffect(() => {
        handleCountdownTimer();
        const t = moment();
        let timerInterval = setInterval(() => {
            setTime(t.format('MMM Do YYYY | hh:mm:ss'));
        }, 1000);

        return () => {
            clearInterval(timerInterval)
        }
    }, [time,timings])

    return (
        <div style={{ marginTop: 10 }}>
            {/*====== CITY AND TIME ROW ======*/}
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <div style={{ textAlign: 'center' }}>
                        <h4>
                            {/* سبتمبر 2023 21 | 21:17 */}
                            {time}
                        </h4>

                        <h1>{city.nameArbic}</h1>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div style={{ textAlign: 'center' }}>
                        <h4>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h4>
                        <h1>{displayRemainingTime}</h1>
                    </div>
                </Grid>
            </Grid>
            {/*====== CITY AND TIME ROW ======*/}
            <Divider />
            {/*====== Prayers Cards ======*/}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1 }}
                justifyContent="space-around"
                alignItems="center"
                useFlexGap
                flexWrap="wrap"
                marginTop={5}
            >
                <PrayerCard name='الفجر' time={timings.Fajr} image={fajrImg} />
                <PrayerCard name='الظهر' time={timings.Dhuhr} image={dhuhrImg} />
                <PrayerCard name='العصر' time={timings.Asr} image={asrImg} />
                <PrayerCard name='المغرب' time={timings.Maghrib} image={maghribImg} />
                <PrayerCard name='العشاء' time={timings.Isha} image={ishaImg} />
            </Stack>
            {/*====== Prayers Cards ======*/}

            {/*====== Select cites ======*/}
            <Stack
                direction='row'
                justifyContent="center"
                alignItems="center"
                useFlexGap
                flexWrap="wrap"
                marginTop={3}
                marginBottom={3}
            >
                <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city.nameApi}
                        label="المدينة"
                        fullWidth
                        onChange={handleChange}
                    >{
                            cities.map((city, index) => (
                                <MenuItem value={city.nameApi} key={index}>{city.nameArbic}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Stack>
            {/*====== Select cites ======*/}
        </div>
    )
}
