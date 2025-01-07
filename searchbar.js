import { faker } from "https://esm.sh/@faker-js/faker";

const searchForm = document.querySelector("form");

searchForm.addEventListener("submit", (e) => e.preventDefault());

const generateRandomCat = () => {
	return {
		name: faker.animal.cat(),
		country: faker.location.country(),
	};
};

let randomCats = Array(20).fill(0).map(generateRandomCat);

randomCats.sort((a, b) => {
	return a.name.localeCompare(b.name);
});

const result = document.querySelector(".result");

const countrySelection = document.querySelector("#country");

const cats = randomCats.map((cat) => {
	const para = document.createElement("p");
	para.textContent = `${cat.name} | Country of origin: ${cat.country}`;
	para.classList.add("cat");
	para.dataset.breed = cat.name.toLowerCase();
	para.dataset.country = cat.country.toLowerCase();
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

let sortedBy = "Cat Breeds";

const sortByCatBreeds = document.querySelector(".sort-cat-breeds");
const sortByCountries = document.querySelector(".sort-countries");
const asc = document.querySelector(".asc");
const desc = document.querySelector(".desc");

sortByCatBreeds.addEventListener("click", () => {
	sortedBy = "Cat Breeds";
	console.log(sortedBy);
});

sortByCountries.addEventListener("click", () => {
	sortedBy = "Countries";
	console.log(sortedBy);
});

let catElements = Array.from(document.querySelectorAll(".cat"));

asc.addEventListener("click", () => {
	if (sortedBy === "Cat Breeds") {
		catElements.sort((a, b) => {
			return a.dataset.breed.localeCompare(b.dataset.breed);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
	if (sortedBy === "Countries") {
		catElements.sort((a, b) => {
			return a.dataset.country.localeCompare(b.dataset.country);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
});

desc.addEventListener("click", () => {
	if (sortedBy === "Cat Breeds") {
		catElements.sort((a, b) => {
			return b.dataset.breed.localeCompare(a.dataset.breed);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
	if (sortedBy === "Countries") {
		catElements.sort((a, b) => {
			return b.dataset.country.localeCompare(a.dataset.country);
		});
		result.textContent = "";
		catElements.forEach((catElement) => {
			result.appendChild(catElement);
		});
	}
});
