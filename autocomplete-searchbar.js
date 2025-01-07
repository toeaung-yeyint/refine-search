import { faker } from "https://esm.sh/@faker-js/faker";

const generateRandomCat = () => {
  return faker.animal.cat();
};

let randomCats = Array(20).fill(0).map(generateRandomCat);

const result = document.querySelector(".result");

const cats = randomCats.map((cat) => {
  const para = document.createElement("p");
  para.textContent = cat;
  result.appendChild(para);
  return { name: cat, element: para };
});

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  cats.forEach((cat) => {
    const isVisible = cat.name.toLowerCase().includes(searchTerm);
    cat.element.classList.toggle("hidden", !isVisible);
  });
});
