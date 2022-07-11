const api = {
    baseUrl :'https://community-open-weather-map.p.rapidapi.com/',
    iconUrl: 'http://openweathermap.org/img/wn/'
}

const search = document.getElementById('city-name');
const btn = document.getElementById('search');
btn.addEventListener('click', setQuery); //set event if user presses key

function setQuery(event){
    //verify if user has pressed ENTER key
    if(event){
        getResults(search.value);
    }
}


function getResults(query)
{

    fetch(`${api.baseUrl}weather?q=${query}`,
        {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3eca11cc8fmsh1dc0cd244a37e7ep16a5fcjsn86dc7b5aac69',
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
            }
        }
    )
        .then(response => {return response.json();})
        .then(displayResults)
        .catch(err => {console.error(err)});

    function displayResults(weather){
        
        let descript = document.getElementById('description');
        let cit = document.getElementById('city');
        let temperature = document.getElementById('temp');
        let max_temperature = document.getElementById('max-temp');
        let min_temperature = document.getElementById('min-temp');
        let humidity = document.getElementById('humid');

        //convert to celcious
        let tem =weather.main.temp;
        let max_temp = weather.main.temp_max;
        let min_temp = weather.main.temp_min;

        tem = Math.round(tem - 273.15);
        max_temp = Math.round((max_temp - 273.15));
        min_temp = Math.round((min_temp - 273.15));

        let locationIcon = document.getElementById('weather-icon');
        let icon = weather.weather[0].icon;
        locationIcon.innerHTML = `<img src="${api.iconUrl}/${icon}.png"/>`;

        //associate values fetched to our specified parameters
        cit.innerText = `${weather.name}, ${weather.sys.country}`
        descript.innerText = `${weather.weather[0].description}`;
        temperature.innerText = `${tem}°C`;
        max_temperature.innerText = `${max_temp}°C`;
        min_temperature.innerText = `${min_temp}°C`;
        humidity.innerText = `${weather.main.humidity}%`;


    }

}

