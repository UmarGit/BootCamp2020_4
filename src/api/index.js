import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

export const fetchTotalData = async (country) => {
    let modifiedurl = url;

    if (country !== '') {
        modifiedurl = `${url}/countries/${country}`
    }
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(modifiedurl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        let array = []
        data.forEach(value=>{
            array.push(
                {
                    confirmed: value.totalConfirmed,
                    recovered: value.totalRecovered,
                    deaths: value.deaths,
                    lastUpdate: value.reportDate.replace('2020-','')
                }
            )
        })
        return array;
    } catch (error) {
        
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`);
        let array = []
        countries.forEach(value=>{
            array.push(
                {
                    name: value.name,
                }
            )
        })
        return array;
    } catch (error) {
        
    }
}