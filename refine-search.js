const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const originSelectionElement = document.querySelector("#country-selection");
let sortBy = "breed";
let orderBy = "asc";
const sortSelectionElement = document.querySelector("#sort-by");
const ascBtn = document.querySelector(".asc");
const descBtn = document.querySelector(".desc");
const result = document.querySelector(".result");

/**
 * To Fetch cat data from the provided URL.
 * @param {string} url - The URL to fetch cat data from.
 * @returns {Promise<Object[]>} A promise that resolves to an array of cat objects.
 * @throws {Error} Throws an error if the HTTP response is not ok.
 */
const fetchCats = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const cats = await response.json();
		return cats;
	} catch (error) {
		result.textContent = "An error occurred while fetching the data.";
		console.log(error);
	}
};

/**
 * To populate a selection element with unique cat origins.
 * @param {Array} cats - An array of cat objects.
 */
const populateUniqueOrigins = (cats) => {
	const uniqueOrigins = [...new Set(cats.map((cat) => cat.origin))];
	uniqueOrigins.sort((a, b) => {
		return a.localeCompare(b);
	});
	uniqueOrigins.forEach((origin) => {
		const option = document.createElement("option");
		option.textContent = origin;
		option.value = origin.toLowerCase();
		originSelectionElement.appendChild(option);
	});
};

/**
 * To create cat cards and add them to the result section on the page.
 * @param {Array} cats - An array of cat objects.
 */
const renderCatCards = (cats) => {
	if (cats.length > 0) {
		cats.forEach((cat) => {
			const card = document.createElement("div");
			card.dataset.breed = cat.breed.toLowerCase();
			card.dataset.origin = cat.origin.toLowerCase();
			card.classList.add("card");
			result.appendChild(card);
			const catImage = document.createElement("img");
			catImage.classList.add("cat-image");
			catImage.alt = cat.breed;
			catImage.src = cat.image;
			const name = document.createElement("p");
			name.textContent = cat.breed;
			const origin = document.createElement("p");
			origin.textContent = `Origin: ${cat.origin}`;
			card.appendChild(catImage);
			card.appendChild(name);
			card.appendChild(origin);
		});
	} else {
		result.textContent = "No cats found. Please try again later.";
	}
};

/**
 * To handle search input from the search bar.
 * @param {Event} e - The event object triggered by input in the search bar.
 */
const handleSearchInput = (e) => {
	const catCards = document.querySelectorAll(".card");
	const searchTerm = e.target.value.toLowerCase();
	catCards.forEach((catCard) => {
		const isVisible = catCard.dataset.breed.toLowerCase().includes(searchTerm);
		catCard.classList.toggle("hidden", !isVisible);
	});
};

/**
 * To handle the selection of an origin from a selection element.
 * @param {Event} e - The event object triggered by input in the origin selection.
 */
const handleOriginSelection = (e) => {
	const catCards = document.querySelectorAll(".card");
	const selection = e.target.value;
	catCards.forEach((catCard) => {
		const isVisible = catCard.dataset.origin.toLowerCase().includes(selection);
		catCard.classList.toggle("hidden", !isVisible);
	});
};

/**
 * To sort the cat cards based on the specified order and criteria.
 */
const sortCatCards = () => {
	const catElements = Array.from(document.querySelectorAll(".card"));
	catElements.sort((a, b) => {
		return orderBy === "asc"
			? a.dataset[sortBy].localeCompare(b.dataset[sortBy])
			: -a.dataset[sortBy].localeCompare(b.dataset[sortBy]);
	});
	result.textContent = "";
	catElements.forEach((catElement) => result.appendChild(catElement));
};

const cats = await fetchCats("cats.json");
populateUniqueOrigins(cats);
renderCatCards(cats);
searchForm.addEventListener("submit", (e) => e.preventDefault());
searchInput.addEventListener("input", (e) => handleSearchInput(e));
originSelectionElement.addEventListener("change", (e) =>
	handleOriginSelection(e)
);
sortSelectionElement.addEventListener("change", (e) => {
	sortBy = e.target.value;
	sortCatCards();
});
ascBtn.addEventListener("click", (e) => {
	orderBy = "asc";
	descBtn.classList.remove("active");
	ascBtn.classList.add("active");
	sortCatCards();
});
descBtn.addEventListener("click", (e) => {
	orderBy = "desc";
	ascBtn.classList.remove("active");
	descBtn.classList.add("active");
	sortCatCards();
});
