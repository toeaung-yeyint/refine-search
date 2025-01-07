import { faker } from "https://esm.sh/@faker-js/faker";

const generateRandomCat = () => {
  return {
    name: faker.animal.cat(),
    country: faker.location.country(),
  };
};

let randomCats = Array(20).fill(0).map(generateRandomCat);

const result = document.querySelector(".result");

const countrySelection = document.querySelector("#country");

const cats = randomCats.map((cat) => {
  const para = document.createElement("p");
  para.textContent = `${cat.name} | ${cat.country}`;
  result.appendChild(para);

  const option = document.createElement("option");
  option.value = cat.country.toLowerCase();
  option.textContent = cat.country;
  countrySelection.appendChild(option);

  return { name: cat.name, country: cat.country, element: para };
});

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  cats.forEach((cat) => {
    const isVisible = cat.name.toLowerCase().includes(searchTerm);
    cat.element.classList.toggle("hidden", !isVisible);
  });
});

countrySelection.addEventListener("change", (e) => {
  const selection = e.target.value;
  cats.forEach((cat) => {
    const isVisible = cat.country.toLowerCase().includes(selection);
    cat.element.classList.toggle("hidden", !isVisible);
  });
});
