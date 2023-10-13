//captura do DOM
const thermal_sensation = document.querySelector('#sensacao-termica')
const temperature = document.querySelector('#temperatura')
const humidity = document.querySelector('#umidade')
const wind_speed = document.querySelector('#vel-vento')
const button_search = document.querySelector('#button_search')
const city_input = document.querySelector('#search_filter')
const flag_img = document.querySelector('#flag_img')

//criação do DOM


//funções
const country_flags_path = 'countrys.json'
const api_key = 'ead1a2bfa75047ac824184305231110'
const api_country = 'https://flagsapi.com/BE/shiny/'
const getWeatherData = async (city) => {
    const apiWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`)
    .then(response => response.json())
    .catch(e => console.log(e))
    return apiWeather
    
}


const showWeatherData = async(city) => {
    const data = await getWeatherData(city)
    const condition = data.current.condition.text.toLowerCase()

    thermal_sensation.textContent = data.current.feelslike_c
    wind_speed.textContent = data.current.wind_kph
    temperature.textContent = data.current.temp_c
    humidity.textContent = data.current.humidity
    showFlags(data.location.country)


    if (condition.includes('rain')) {
        console.log('Clima de chuva')
    }    

    else if (condition.includes('sunny')) {
        console.log('Clima ensolarado')
    }

    else if (condition.includes('cloudy') || condition === 'overcast') {
        console.log('Clima nublado')
    }
    
    else if (condition.includes('snowy')) {
        console.log('Clima Nevado')
    }

    else if(condition.includes('clear')) {
        console.log('Clima limpo')
    }
    console.log(data)
    

    
}

const showFlags = async(country) => {
    try {
        const country_data = await fetch('assets/json/dados.json')
        if (!country_data.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
          }
        const flag_data = await country_data.json()
        const find_country = flag_data.find(state => state.nome_pais_int === country)
        flag_img.setAttribute('src', `https://flagsapi.com/${find_country.sigla}/shiny/64.png`)

    }
    catch(e) {
        console.log(`Error: ${e}`)
    }
}

//eventos

button_search.addEventListener('click', function(e) {
    e.preventDefault()
    const city = city_input.value
    showWeatherData(city)
}

)

