import './css/styles.css';
import Notiflix from 'notiflix';
import countryListTpl from './templates/country-list.hbs';
import countryCardTpl from './templates/country.hbs';
import fetchCountries from './fetchCountries';
// import debounce from 'lodash.debounce';

export default alert;

var debounce = require('lodash.debounce');

const countrySearch = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

const lengthCountry = e => {
  if (e.target.value.trim() === '') {
    clearMarkup();
    return;
  }
};
// function lengthCountry(e) {
//   const query = e.target.value.trim();
//   clearMarkup();

const onCountrySearch = e => {
  lengthCountry(e);

  fetchCountries(e.target.value.trim())
    .then(countries => {
      clearMarkup();
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (countries.length > 1) {
        countryList.insertAdjacentHTML('beforeend', generateCountryListMarkup(countries));
        return;
      }

      countryInfo.insertAdjacentHTML('beforeend', generateCountryMarkup(countries));
      return;
    })
    .catch(error => {
      Notify.failure(error);
    });
};

const generateCountryMarkup = country => countryCardTpl(country);

const generateCountryListMarkup = countries => countryListTpl(countries);

countrySearch.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));
