// import './css/styles.css';
// import Notiflix from 'notiflix';
// import countryListTpl from './templates/country-list.hbs';
// import countryCardTpl from './templates/country.hbs';
// import fetchCountries from './fetchCountries';
// // import debounce from 'lodash.debounce';

// export default alert;

// var debounce = require('lodash.debounce');

// // const refs = {
// //   countryCard: document.querySelector('.country-data'),
// //   cardContainer: document.querySelector('.country-list'),
// //   searchInput: document.querySelector('input#search-field'),
// // };

// // refs.searchInput.addEventListener('input', debounce(onInput, delay));

// const countrySearch = document.querySelector('input#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// const DEBOUNCE_DELAY = 300;

// function clearMarkup() {
//   countryInfo.innerHTML = '';
//   countryList.innerHTML = '';
// }

// const lengthCountry = e => {
//   if (e.target.value.trim() === '') {
//     clearMarkup();
//     return;
//   }
// };
// // function lengthCountry(e) {
// //   const query = e.target.value.trim();
// //   clearMarkup();

// const onCountrySearch = e => {
//   lengthCountry(e);

//   fetchCountries(e.target.value.trim())
//     .then(countries => {
//       clearMarkup();
//       if (countries.length > 10) {
//         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//         return;
//       } else if (countries.length > 1) {
//         countryList.insertAdjacentHTML('beforeend', generateCountryListMarkup(countries));
//         return;
//       }

//       countryInfo.insertAdjacentHTML('beforeend', generateCountryMarkup(countries));
//       return;
//     })
//     .catch(error => {
//       Notify.failure(error);
//     });
// };

// const generateCountryMarkup = country => countryCardTpl(country);

// const generateCountryListMarkup = countries => countryListTpl(countries);

// countrySearch.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const isFilled = input.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (isFilled) {
    fetchCountries(isFilled)
      .then(dataProcessing)
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error);
      });
  }

  function dataProcessing(data) {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');

      return;
    }

    markup(data);
  }

  function markup(data) {
    const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li><img src="${svg}" alt="${official}" width="100" height="50"/>${official}</li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages).join(', ');

      const markupInfo = `<ul>
      <li>Capital: ${data[0].capital}</li>
      <li>Population: ${data[0].population}</li>
      <li>Languages: ${languages}</li>
      </ul>`;

      countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
    }
    return countryList.insertAdjacentHTML('afterbegin', markupData);
  }
}
