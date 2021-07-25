//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: 'your_key',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather?'
}


let input = document.getElementById('floatingInput');
input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        //console.log(input.value)
        getWeatherDetails(input.value);
        document.querySelector('#card').style.display = 'block';
    }
})

function getWeatherDetails(city) {

    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherDetails)

}

function showWeatherDetails(weather) {

    const myNode = document.getElementById('weather-img');
    myNode.innerHTML = '';
    document.getElementById('sky').style.color = '';
    //console.log(weather)
    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg<span>  C</span>`;

    let city = document.getElementById('city')
    city.innerText = `${weather.name}  ${weather.sys.country}`


    let min = document.getElementById('min')
    min.innerText = `${Math.floor(weather.main.temp_min)}°C (min) / ${Math.ceil(weather.main.temp_max)}°C (max)`

    let sky = document.getElementById('sky')
    sky.innerText = `Sky : ${weather.weather[0].main}`


    if (sky.textContent == 'Sky : Clear') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "fas fa-cloud-sun fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#87ceeb';
        document.body.style.backgroundImage = "url('/images/clear.gif')"
    } else if (sky.textContent == 'Sky : Clouds') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "fas fa-cloud fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#bcbcbc';
        document.body.style.backgroundImage = "url('images/cloudy.gif')"
    } else if (sky.textContent == 'Sky : Rain') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "fas fa-cloud-rain fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#7d7c7a';
        document.body.style.backgroundImage = "url('images/rain.gif')"
    } else if (sky.textContent == 'Sky : Snow') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "fas fa-snowflake fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#f2ecc9';
        document.body.style.backgroundImage = "url('images/snow.jpg')"
    } else if (sky.textContent == 'Sky : ThunderStorms') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "far fa-thunderstorm fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#171717';
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')"
    } else if (sky.textContent == 'Sky : Haze') {
        let icon = document.createElement('i')
        icon.setAttribute('class', "fas fa-smog fa-10x")
        document.getElementById('weather-img').appendChild(icon)
        document.getElementById('sky').style.color = '#d0b9c1';
        document.body.style.backgroundImage = "url('images/haze.jpg')"
    }


    let humidity = document.getElementById('humidity')
    humidity.innerText = `Humidity : ${weather.main.humidity}%`

    let date = document.getElementById('date');
    date.innerText = dateManage()


}





function dateManage() {
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    let fullDate = new Date();

    let date = fullDate.getDate()

    let day = days[fullDate.getDay() + 1]
    let month = months[fullDate.getMonth()]
    let year = fullDate.getFullYear()

    return `${date} ${month} (${day}) , ${year}`

}