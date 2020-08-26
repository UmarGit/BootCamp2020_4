import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LineChart from '../LineChart/LineChart'
import BarChart from '../BarChart/BarChart'
import Loading from '../Loading/Loading'
import './Info.css'
import Table from '../Table/Table'


const Info = ({ data: { confirmed, recovered, deaths, lastUpdate }, dailydata, seletedCountry, rows }) => {

    if (!confirmed) {
        return <Loading open={true}/>
    }
    let confirmedData = dailydata.map(({ confirmed }) => confirmed)
    let recoveredData = dailydata.map(({ recovered }) => recovered)
    let deathsData = dailydata.map(({ deaths }) => deaths.total)
    let dateUpdateData = dailydata.map(({ lastUpdate }) => lastUpdate)

    const globalDataChart = {
        labels: dateUpdateData,
        datasets: [
            {
                label: 'ACTIVE CASES',
                fill: false,
                backgroundColor: 'rgba(100, 100, 255, 1)',
                borderColor: 'rgba(100, 100, 255, 1)',
                pointBorderColor: 'rgba(100, 100, 255, 1)',
                pointHoverBackgroundColor: 'rgba(100, 100, 255, 1)',
                pointHoverBorderColor: 'rgba(100, 100, 255, 1)',
                data: confirmedData
            },
            {
                label: 'RECOVERED',
                fill: false,
                backgroundColor: 'rgba(100, 255, 100, 1)',
                borderColor: 'rgba(100, 255, 100, 1)',
                pointBorderColor: 'rgba(100, 255, 100, 1)',
                pointHoverBackgroundColor: 'rgba(100, 255, 100, 1)',
                pointHoverBorderColor: 'rgba(100, 255, 100, 1)',
                data: recoveredData
            },
            {
                label: 'DEATHS',
                fill: false,
                backgroundColor: 'rgba(255, 100, 100, 1)',
                borderColor: 'rgba(255, 100, 100, 1)',
                pointBorderColor: 'rgba(255, 100, 100, 1)',
                pointHoverBackgroundColor: 'rgba(255, 100, 100, 1)',
                pointHoverBorderColor: 'rgba(255, 100, 100, 1)',
                data: deathsData
            }
        ]
    };

    const countryDataChart = {
        labels: ["CASES"],
        datasets: [
            {
                label: 'ACTIVE CASES',
                fill: false,
                backgroundColor: 'rgba(100, 100, 255, 1)',
                borderColor: 'rgba(100, 100, 255, 1)',
                pointBorderColor: 'rgba(100, 100, 255, 1)',
                pointHoverBackgroundColor: 'rgba(100, 100, 255, 1)',
                pointHoverBorderColor: 'rgba(100, 100, 255, 1)',
                data: [confirmed.value]
            },
            {
                label: 'RECOVERED',
                fill: false,
                backgroundColor: 'rgba(100, 255, 100, 1)',
                borderColor: 'rgba(100, 255, 100, 1)',
                pointBorderColor: 'rgba(100, 255, 100, 1)',
                pointHoverBackgroundColor: 'rgba(100, 255, 100, 1)',
                pointHoverBorderColor: 'rgba(100, 255, 100, 1)',
                data: [recovered.value]
            },
            {
                label: 'DEATHS',
                fill: false,
                backgroundColor: 'rgba(255, 100, 100, 1)',
                borderColor: 'rgba(255, 100, 100, 1)',
                pointBorderColor: 'rgba(255, 100, 100, 1)',
                pointHoverBackgroundColor: 'rgba(255, 100, 100, 1)',
                pointHoverBorderColor: 'rgba(255, 100, 100, 1)',
                data: [deaths.value]
            }
        ]
    };

    return (
        <div>
            <Paper elevation={4} className="root">
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}>
                        <Paper elevation={0} className="paper">
                            <div className="infoNumber">
                                <Typography variant="caption" display="block" gutterBottom>
                                    <b>TOTAL CASES (<small>{new Date(lastUpdate).toDateString()}</small>)</b>
                                </Typography>
                                <Typography className="active" variant="h5" gutterBottom>
                                    <b>{confirmed.value}</b>
                                </Typography>
                            </div>
                        </Paper>
                        <Paper elevation={0} className="paper">
                            <div className="infoNumber">
                                <Typography variant="caption" display="block" gutterBottom>
                                    <b>RECOVERED (<small>{new Date(lastUpdate).toDateString()}</small>)</b>
                                </Typography>
                                <Typography className="recovered" variant="h5" gutterBottom>
                                    <b>{recovered.value}</b>
                                </Typography>
                            </div>
                        </Paper>
                        <Paper elevation={0} className="paper">
                            <div className="infoNumber">
                                <Typography variant="caption" display="block" gutterBottom>
                                    <b>DEATHS (<small>{new Date(lastUpdate).toDateString()}</small>)</b>
                                </Typography>
                                <Typography className="deaths" variant="h5" gutterBottom>
                                    <b>{deaths.value}</b>
                                </Typography>
                            </div>
                        </Paper>
                        <Paper elevation={0} className="paper">
                            <div className="infoNumber">
                                <Typography variant="caption" display="block" gutterBottom>
                                    <b>INFECTED COUNTRIES  (<small>{new Date(lastUpdate).toDateString()}</small>)</b>
                                </Typography>
                                <Typography className="infected-countries" variant="h5" gutterBottom>
                                    <b>{confirmedData.length}</b>
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper elevation={0} className="chart">
                            <Typography variant="h5" gutterBottom>
                                <b>LIVE GLOBAL DATA</b> (<small className="foot" >Designed By <a href="https://github.com/UmarGit" target="_blank" rel="noopener noreferrer">UmarGit</a></small>)
                            </Typography>
                            <LineChart globalDataChart={globalDataChart} />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={6} className="root">
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={5}>
                        <Paper elevation={0} className="chart">
                            <Typography variant="h5" gutterBottom>
                                <b>{!seletedCountry ? 'LIVE COUNTRY DATA' : 'LIVE ' + seletedCountry.toUpperCase() + ' DATA'}</b>
                            </Typography>
                            <BarChart globalDataChart={countryDataChart} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={0} className="chart">
                            <Typography variant="h5" gutterBottom>
                                <b>LIVE DATA HISTORY</b>
                            </Typography>
                            <Table rows={rows} />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Info