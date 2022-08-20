// import Notiflix from 'notiflix';

// export default function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
//   ).then(response => {
//     if (!response.ok) {
//       Notiflix.Notify.failure('Oops, there is no country with that name.');
//       return;
//     }
//     return response.json();
//   });
// }
// if (response.ok) {
//   return response.json();
// }
// throw new Error(response.status);

export default function fetchCountries(name) {
  const address = 'https://restcountries.com/v3.1/name/';
  const options = `?fields=name,capital,population,flags,languages`;

  return fetch(`${address}${name}${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
