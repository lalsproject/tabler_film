
// const countryParams = new URLSearchParams(window.location.search);

// function fetchCountry() {
//   return fetch(
//     "https://api.themoviedb.org/3/watch/providers/regions?language=en-US",
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       let countryView = ``;
//       countryView += ``;
//       data.results.forEach((country) => {
//         if (country.iso_3166_1 == countryParams.get("country")) {
//           countryView += `<option value="${country.iso_3166_1}" selected><span class="flag flag-country-${country.iso_3166_1.toLowerCase()}"></span>${country.english_name}</option>`;
//           $("#genTitle").html(`Streaming Film | ${country.english_name}`);
//           $("#pageTitle").html(`Streaming Film | ${country.english_name}`);
//         } else {
//           // countryView += `
//           //   <a class="dropdown-item" href="javascript:void(0)" onclick="window.location='/country.html?country=${country.iso_3166_1}'">
//           //     ${country.english_name}
//           //   </a>`;
//           countryView += `<option value="${country.iso_3166_1}" ><span class="flag flag-country-${country.iso_3166_1.toLowerCase()}"></span>${country.english_name}</option>`;
//         }
//       });
//       countryView += `</select>`;
//       // $("#countryList").html(countryView);
//     })
//     .catch((err) => console.error("Error fetching genres:", err));
// }

// fetchCountry();
