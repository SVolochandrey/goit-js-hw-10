import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/countreisFetch';


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event){
const findCountry = event.target.value.trim();

if (!findCountry){
dataCleaning();
return;
}
else {
fetchCountries(findCountry)
.then(countries => {
if (countries.length > 10) {
Notiflix.Notify.info(
'Too many matches found. Please enter a more specific name.'
)}
else {onRenderCountryList(countries);
}})
.catch(onFetchError);
}
}

function onRenderCountryList(countries) {
dataCleaning();
const markup = countries
.map(
country => `<li class ="country-item">
<img src="${country.flags.svg}" alt="${country.name.oficial}" width = "40px" heignt = "40px">
</img> <span> ${country.name.official} </span>
</li>`
)
.join('')
countriesListEl.innerHTML = markup;

if (countries.length === 1){
countriesListEl.classList.add('country-list__deployed');
creatCountryInfo(countries)
}
}

function creatCountryInfo(countries){
const country = countries[0];
countryInfoEl.innerHTML = `<p>Capital: <span>${country.capital}</span></p> 
<p>Population: <span>${country.population}</span></p>
<p>Languages: <span>${Object.values(country.languages)}</span></p>`
}

function onFetchError(error){
dataCleaning();
Notiflix.Notify.failure('Oops, there is no country with that name');
}

function dataCleaning(){
countriesListEl.innerHTML = '';
countryInfoEl.innerHTML = '';
countriesListEl.classList.remove('country-list__deployed')
}

