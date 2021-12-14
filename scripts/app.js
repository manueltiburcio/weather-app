const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const form = document.querySelector('form');

const updateUI = (data) => {

    console.log(data)

    // destructure properties
    const { cityDetails, weather } = data; 

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <h6 class="my-3">${cityDetails.Country.LocalizedName}</h6>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        <hr>
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>
    `;


    // update the night/dat & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;

    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
        body.style.backgroundImage = "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)";
        h1.classList.replace('text-light', 'text-muted');
        form.classList.replace('text-light', 'text-muted');
    } else {
        timeSrc = 'img/night.svg';
        body.style.backgroundImage = "linear-gradient(to top, #bac8e0 0%, #6a85b6 100%)";
        h1.classList.replace('text-muted', 'text-light');
        form.classList.replace('text-muted', 'text-light');
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));
});