import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Info from '../Info/Info'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchTotalData, fetchDailyData, fetchCountries } from '../../api'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '14ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [flag, setflag] = useState(false);
    const [globaldata, setglobalData] = useState({});
    const [dailydata, setdailyData] = useState([]);
    const [countriesdata, setcountriesData] = useState([]);
    const [rows, setrows] = useState([createData('COUNTRY', 'CONFIRMED', "RECOVERED", "DEATHS")]);
    const [seletedCountry, setseletedCountry] = useState('Global');

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function createData(countryName, activeCases, recoveredCases, deathsCases) {
        return { countryName, activeCases, recoveredCases, deathsCases };
    }

    useEffect(() => {

        const apiData = async () => {
            const global = await fetchTotalData('')
            const daily = await fetchDailyData()
            const countries = await fetchCountries()

            setglobalData(global)
            setdailyData(daily)
            setcountriesData(countries)
        }
        apiData()

    }, [])

    async function handleSearch(event) {
        let value = event.target.value
        let check = false

        for (let index = 0; index < countriesdata.length; index++) {
            const element = countriesdata[index];
            if (element.name === value) {
                check = true
                break
            }
            else{
                check = false
            }
        }

        if (check) {
            const country = await fetchTotalData(value.toString())
            setflag(check)
            setseletedCountry(value.toString())
            setOpen(true)
            setglobalData(country)

            setrows(rows => [...rows, createData(value.toString(), country.confirmed.value, country.recovered.value, country.deaths.value)])
        }
        else{
            setflag(check)
            setseletedCountry(value.toString())
            setOpen(true)
        }

    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Coronavirus Tracker
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Country"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onBlur={event => {
                                handleSearch(event)
                            }}
                        />
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={flag ? 'success': 'error'}>
                            {flag ? 'Country found named ' + seletedCountry : 'No Country found named ' + seletedCountry}
                        </Alert>
                    </Snackbar>
                </Toolbar>
            </AppBar>
            <Info data={globaldata} dailydata={dailydata} rows={rows} seletedCountry={seletedCountry}/>
        </div>
    );
}

export default NavBar